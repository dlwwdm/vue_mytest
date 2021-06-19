<template>
  <div>
    <!-- 面包屑导航区域 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>测试项目</el-breadcrumb-item>
      <el-breadcrumb-item>项目管理</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 卡片区域 -->
    <el-card class="box-card">
      <el-row :gutter="20">
        <el-col :span="8">
          <!-- 搜素框 -->
          <div>
            <el-input placeholder="请输入内容">
              <el-button slot="append" icon="el-icon-search"></el-button>
            </el-input>
          </div>
        </el-col>
        <el-col :span="4">
          <el-button type="primary" @click="addDialogVisible = true">
            添加项目
          </el-button>
        </el-col>
      </el-row>
      <el-table :data="projectList" border stripe>
        <el-table-column
          label="序号"
          type="index"
          width="100px"
        ></el-table-column>
        <el-table-column label="项目名称" prop="projectName"></el-table-column>
        <el-table-column label="模块名称" prop="moduleName"></el-table-column>
        <el-table-column label="IP地址" prop="ipAddress"></el-table-column>
        <el-table-column label="描述" prop="description"></el-table-column>
        <el-table-column label="操作" width="200px">
          <!-- 作用域插槽 -->
          <template slot-scope="scope">
            <el-tooltip
              class="item"
              effect="dark"
              content="编辑"
              placement="top"
              :enterable="false"
            >
              <el-button
                type="primary"
                icon="el-icon-edit"
                @click="showEditDialog(scope.row.id)"
              ></el-button>
            </el-tooltip>
            <el-tooltip
              class="item"
              effect="dark"
              content="删除"
              placement="top"
              :enterable="false"
            >
              <el-button type="danger" icon="el-icon-delete" @click="deleteProject(scope.row.id)"></el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <!-- 添加用户对话框 -->
    <el-dialog
      title="添加项目"
      :visible.sync="addDialogVisible"
      width="50%"
       @close="addDialogClose"
    >
      <!-- 内容主题区域 -->
      <span>
        <el-form
          :model="addForm"
          :rules="rules"
          ref="addFormRef"
          label-width="100px"
          class="demo-ruleForm"
        >
          <el-form-item label="项目名称" prop="projectName">
            <el-input v-model="addForm.projectName"></el-input>
          </el-form-item>
          <el-form-item label="模块名称" prop="moduleName">
            <el-input v-model="addForm.moduleName"></el-input>
          </el-form-item>
          <el-form-item label="IP地址" prop="ipAddress">
            <el-input v-model="addForm.ipAddress"></el-input>
          </el-form-item>
          <el-form-item label="描述" prop="description">
            <el-input v-model="addForm.description"></el-input>
          </el-form-item>
        </el-form>
      </span>

      <!-- 底部区域 -->
      <span slot="footer" class="dialogButton">
        <el-button @click="addDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addProject">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 修改用户对话框 -->
    <el-dialog
      title="修改用户"
      :visible.sync="editDialogVisible"
      width="50%"
       @close="editDialogClose"
    >
      <span>
        <el-form
          :model="editForm"
          :rules="rules"
          ref="editFormRef"
          label-width="100px"
        >
          <el-form-item label="项目名称" prop="projectName">
            <el-input v-model="editForm.projectName"></el-input>
          </el-form-item>
          <el-form-item label="模块名称" prop="moduleName">
            <el-input v-model="editForm.moduleName"></el-input>
          </el-form-item>
          <el-form-item label="IP地址" prop="ipAddress">
            <el-input v-model="editForm.ipAddress"></el-input>
          </el-form-item>
          <el-form-item label="描述" prop="description">
            <el-input v-model="editForm.description"></el-input>
          </el-form-item>
        </el-form>
      </span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="editProject"
          >确 定</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      projectList: {},
      editForm: {},
      // 控制添加用户对话框的显示和隐藏
      addDialogVisible: false,
      // 控制修改用户对话框的显示和隐藏
      editDialogVisible: false,
      addForm: {
        projectName: '',
        moduleName: '',
        ipAddress: '',
        description: ''
      },
      rules: {
        projectName: [
          { required: true, message: '请输入项目名称', trigger: 'blur' }
        ],
        moduleName: [
          { required: true, message: '请输入模块名称', trigger: 'blur' }
        ],
        ipAddress: [{ required: true, message: '请输入Url', trigger: 'blur' }
        ],
        description: [{ required: false, message: '请输入Url', trigger: 'blur' }]
      }
    }
  },
  created() {
    this.getProjectList()
  },
  methods: {
    async getProjectList() {
      const { data: res } = await this.$http.get('/listproject')
      if (res.code !== '0') return this.$message.error('获取项目列表失败')
      this.projectList = res.data
      console.log(this.projectList)
    },
    // 清除弹窗内容
    addDialogClose() {
      this.$refs.addFormRef.resetFields()
    },
    editDialogClose() {
      this.$refs.editFormRef.resetFields()
    },
    // 点击确定新增项目
    addProject() {
      this.$refs.addFormRef.validate(async (valid) => {
        if (!valid) return
        // 发送请求添加项目
        const { data: res } = await this.$http.post(
          '/addproject',
          this.addForm
        )
        if (res.code !== '0') return this.$message.error('添加项目失败')
        this.$message.success('添加项目成功')
        this.addDialogVisible = false
        this.getProjectList()
      })
    },
    async showEditDialog(id) {
      this.editDialogVisible = true
      const { data: res } = await this.$http.get('/selectprojectbyid?id=' + id)
      if (res.code !== '0') return this.$message.error('获取项目信息失败')
      this.editForm = res.data
    },
    editProject() {
      this.$refs.editFormRef.validate(async (valid) => {
        if (!valid) return
        const { data: res } = await this.$http.post('/editproject', this.editForm)
        if (res.code !== '0') return this.$message.error('更新项目失败')
        this.editDialogVisible = false
        this.getProjectList()
      })
    },
    deleteProject(id) {
      this.$confirm('确定删除该项目?', '删除项目', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        await this.$http.get('/deleteproject?id=' + id)
        this.getProjectList()
        this.$message({
          type: 'success',
          message: '删除成功!'
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    }
  }
}
</script>

<style lang="less" scoped>
.el-table {
  margin-top: 15px;
}
.dialogButton {
  text-align: center;
}
</style>

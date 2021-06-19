<template>
  <div>
    <!-- 面包屑导航区域 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>测试用例</el-breadcrumb-item>
      <el-breadcrumb-item>用例管理</el-breadcrumb-item>
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
            添加用例
          </el-button>
        </el-col>
      </el-row>
      <el-table :data="caseList" border stripe>
        <el-table-column
          label="序号"
          type="index"
          width="100px"
        ></el-table-column>
        <el-table-column label="项目名称" prop="projectName"></el-table-column>
        <el-table-column label="模块名称" prop="moduleName"></el-table-column>
        <el-table-column label="接口名称" prop="interfaceName"></el-table-column>
        <el-table-column label="用例说明" prop="description"></el-table-column>
        <el-table-column label="用例类型" prop="caseType"></el-table-column>
        <el-table-column label="操作" width="180px">
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
              <el-button type="danger" icon="el-icon-delete" @click="deleteCase(scope.row.id)"></el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <!-- 添加用户对话框 -->
    <el-dialog
      title="添加用例"
      :visible.sync="addDialogVisible"
      width="50%"
      @close="addDialogClose"
    >
      <!-- 内容主题区域 -->
      <span>
          <el-collapse >
              <el-collapse-item title="基本信息" name="1">
              </el-collapse-item>
              <el-collapse-item title="请求参数" name="2">
              </el-collapse-item>
          </el-collapse>
        <!-- <el-form
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
          <el-form-item label="接口名称" prop="interfaceName">
            <el-input v-model="addForm.interfaceName"></el-input>
          </el-form-item>
          <el-form-item label="接口路径" prop="path">
            <el-input v-model="addForm.path"></el-input>
          </el-form-item>
          <el-form-item label="请求方式" prop="requestMethod">
            <el-input v-model="addForm.requestMethod"></el-input>
          </el-form-item>
          <el-form-item label="参数类型" prop="parameterType">
            <el-input v-model="addForm.parameterType"></el-input>
          </el-form-item>
          <el-form-item label="用例说明" prop="description">
            <el-input v-model="addForm.description"></el-input>
          </el-form-item>
        </el-form> -->
      </span>

      <!-- 底部区域 -->
      <span slot="footer" class="dialogButton">
        <el-button @click="addDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addCase">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 修改用户对话框 -->
    <el-dialog
      title="修改用例"
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
          <el-form-item label="接口名称" >
            <el-input v-model="editForm.interfaceName"></el-input>
          </el-form-item>
          <el-form-item label="接口路径" >
            <el-input v-model="editForm.path"></el-input>
          </el-form-item>
          <el-form-item label="请求方式" >
            <el-input v-model="editForm.requestMethod"></el-input>
          </el-form-item>
          <el-form-item label="参数类型" >
            <el-input v-model="editForm.parameterType"></el-input>
          </el-form-item>
          <el-form-item label="用例说明" >
            <el-input v-model="editForm.description"></el-input>
          </el-form-item>
        </el-form>
      </span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="editCase"
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
      caseList: {},
      editForm: {},
      // 控制添加用户对话框的显示和隐藏
      addDialogVisible: false,
      // 控制修改用户对话框的显示和隐藏
      editDialogVisible: false,
      addForm: {
        projectName: '',
        moduleName: '',
        interfaceName: '',
        requestMethod: '',
        parameterType: '',
        path: '',
        modifyDate: '',
        description: ''
      },
      rules: {
        projectName: [
          { required: true, message: '请输入项目名称', trigger: 'blur' }
        ],
        moduleName: [
          { required: true, message: '请输入模块名称', trigger: 'blur' }
        ],
        interfaceName: [{ required: false, message: '', trigger: 'blur' }
        ],
        requestMethod: [{ required: false, message: '', trigger: 'blur' }
        ],
        parameterType: [{ required: false, message: '', trigger: 'blur' }
        ],
        path: [{ required: false, message: '', trigger: 'blur' }
        ],
        modifyDate: [{ required: false, message: '', trigger: 'blur' }
        ],
        description: [{ required: false, message: '', trigger: 'blur' }]
      }
    }
  },
  created() {
    this.getCaseList()
  },
  methods: {
    async getCaseList() {
      const { data: res } = await this.$http.get('/listcase')
      if (res.code !== '0') return this.$message.error('获取用例列表失败')
      this.caseList = res.data
      console.log(this.caseList)
    },
    // 清除弹窗内容
    addDialogClose() {
      this.$refs.addFormRef.resetFields()
    },
    editDialogClose() {
      this.$refs.editFormRef.resetFields()
    },
    // 点击确定新增项目
    addCase() {
      this.$refs.addFormRef.validate(async (valid) => {
        if (!valid) return
        // 发送请求添加项目
        const { data: res } = await this.$http.post(
          '/addcase',
          this.addForm
        )
        if (res.code !== '0') return this.$message.error('添加接口失败')
        this.$message.success('添加用例成功')
        this.addDialogVisible = false
        this.getCaseList()
      })
    },
    async showEditDialog(id) {
      this.editDialogVisible = true
      const { data: res } = await this.$http.get('/selectcasebyid?id=' + id)
      if (res.code !== '0') return this.$message.error('获取用例信息失败')
      this.editForm = res.data
    },
    editCase() {
      this.$refs.editFormRef.validate(async (valid) => {
        if (!valid) return
        const { data: res } = await this.$http.post('/editcase', this.editForm)
        if (res.code !== '0') return this.$message.error('更新用例失败')
        this.editDialogVisible = false
        this.getCaseList()
      })
    },
    deleteCase(id) {
      this.$confirm('确定删除该用例?', '删除用例', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        await this.$http.get('/deletecasebyid?id=' + id)
        this.getCaseList()
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

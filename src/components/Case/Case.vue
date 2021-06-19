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
        <el-table-column
          label="接口名称"
          prop="interfaceName"
        ></el-table-column>
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
              <el-button
                type="danger"
                icon="el-icon-delete"
                @click="deleteCase(scope.row.id)"
              ></el-button>
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
        <el-collapse :model="baseInformation" ref="baseInformationRef">
          <el-collapse-item title="基本信息" name="1">
            <el-select
              v-model="baseInformation.projectName"
              filterable
              placeholder="请选择项目"
              @change="changeProject"
            >
              <el-option
                v-for="item in projectList"
                :key="item.id"
                :label="item.projectName"
                :value="item.projectName"
              >
              </el-option>
            </el-select>
            <el-select
              v-model="baseInformation.moduleName"
              filterable
              placeholder="请选择模块"
              @change="changeModule"
            >
              <el-option
                v-for="item in moduleList"
                :key="item.moduleName"
                :label="item.moduleName"
                :value="item.moduleName"
              >
              </el-option>
            </el-select>
            <el-input
              v-model="baseInformation.IpAddress"
              :disabled="true"
              placeholder="IpAddress"
            >
            </el-input>
            <el-select
              v-model="baseInformation.interfaceName"
              filterable
              placeholder="请选择接口"
              @change="changeInterface"
            >
              <el-option
                v-for="item in interfaceList"
                :key="item.interfaceName"
                :label="item.interfaceName"
                :value="item.interfaceName"
              >
              </el-option>
            </el-select>
            <el-input
              v-model="baseInformation.path"
              :disabled="true"
              placeholder="接口路径"
            >
            </el-input>
            <el-input
              v-model="baseInformation.requestMethod"
              :disabled="true"
              placeholder="请求方式"
            >
            </el-input>
            <el-input
              v-model="baseInformation.parameterType"
              :disabled="true"
              placeholder="参数类型"
            >
            </el-input>
            <el-input
              v-model="baseInformation.description"
              :disabled="true"
              placeholder="接口描述"
            >
            </el-input>
          </el-collapse-item>
          <el-collapse-item title="请求参数" name="2">
            <div class="tableDate">
              <div>
                <h1>Headers</h1>
                <div>
                  <el-button
                    type="primary"
                    @click.prevent="addRow()"
                    size="mini"
                    >添加头信息</el-button
                  >
                  <el-button
                    type="primary"
                    @click.prevent="delData()"
                    size="mini"
                    >删除头信息</el-button
                  >
                </div>
              </div>
              <div class="table">
                <el-table
                  :data="baseInformation.headerValue"
                  ref="table"
                  tooltip-effect="dark"
                  border
                  stripe
                  style="width: 93%"
                  @selection-change="selectRow"
                >
                  <el-table-column
                    type="selection"
                    width="45"
                    align="center"
                  ></el-table-column>
                  <el-table-column
                    label="序号"
                    type="index"
                    width="60"
                    align="center"
                  ></el-table-column>
                  <el-table-column label="参数名称" align="center">
                    <template slot-scope="scope">
                      <!-- <el-cascader
                        prop="post_id"
                        class="post_name"
                        v-model="scope.row.post_id"
                        :options="post_options"
                        :show-all-levels="false"
                        @change="test"
                      ></el-cascader> -->
                      <el-input
                        class="require_des"
                        v-model="scope.row.post_id"
                      ></el-input>
                      <!--<el-input v-model="scope.row.post_id"></el-input>-->
                    </template>
                  </el-table-column>
                  <el-table-column label="参数值" align="center">
                    <template slot-scope="scope">
                      <el-input
                        class="require_des"
                        v-model="scope.row.require_des"
                      ></el-input>
                    </template>
                  </el-table-column>
                  <el-table-column label="备注" align="center">
                    <template slot-scope="scope">
                      <el-input
                        class="remark"
                        v-model="scope.row.remark"
                      ></el-input>
                    </template>
                  </el-table-column>
                </el-table>
              </div>
            </div>
            <div class="tableDate">
              <div>
                <h1>Bodys</h1>
                <div>
                  <el-button
                    type="primary"
                    @click.prevent="addRow()"
                    size="mini"
                    >添加头信息</el-button
                  >
                  <el-button
                    type="primary"
                    @click.prevent="delData()"
                    size="mini"
                    >删除头信息</el-button
                  >
                </div>
              </div>
              <div class="table">
                <el-table
                  :data="baseInformation.bodyValue"
                  ref="table"
                  tooltip-effect="dark"
                  border
                  stripe
                  style="width: 93%"
                  @selection-change="selectRow"
                >
                  <el-table-column
                    type="selection"
                    width="45"
                    align="center"
                  ></el-table-column>
                  <el-table-column
                    label="序号"
                    type="index"
                    width="60"
                    align="center"
                  ></el-table-column>
                  <el-table-column label="参数名称" align="center">
                    <template slot-scope="scope">
                      <!-- <el-cascader
                        prop="post_id"
                        class="post_name"
                        v-model="scope.row.post_id"
                        :options="post_options"
                        :show-all-levels="false"
                        @change="test"
                      ></el-cascader> -->
                      <el-input
                        class="require_des"
                        v-model="scope.row.post_id"
                      ></el-input>
                      <!--<el-input v-model="scope.row.post_id"></el-input>-->
                    </template>
                  </el-table-column>
                  <el-table-column label="参数值" align="center">
                    <template slot-scope="scope">
                      <el-input
                        class="require_des"
                        v-model="scope.row.require_des"
                      ></el-input>
                    </template>
                  </el-table-column>
                  <el-table-column label="备注" align="center">
                    <template slot-scope="scope">
                      <el-input
                        class="remark"
                        v-model="scope.row.remark"
                      ></el-input>
                    </template>
                  </el-table-column>
                </el-table>
              </div>
            </div>
          </el-collapse-item>
        </el-collapse>
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
          <el-form-item label="接口名称">
            <el-input v-model="editForm.interfaceName"></el-input>
          </el-form-item>
          <el-form-item label="接口路径">
            <el-input v-model="editForm.path"></el-input>
          </el-form-item>
          <el-form-item label="请求方式">
            <el-input v-model="editForm.requestMethod"></el-input>
          </el-form-item>
          <el-form-item label="参数类型">
            <el-input v-model="editForm.parameterType"></el-input>
          </el-form-item>
          <el-form-item label="用例说明">
            <el-input v-model="editForm.description"></el-input>
          </el-form-item>
        </el-form>
      </span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="editCase">确 定</el-button>
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
      projectList: {},
      moduleList: {},
      interfaceList: {},
      selectlistRow: [],
      rowNum: 1,
      baseInformation: {
        projectName: '',
        moduleName: '',
        IpAddress: '',
        interfaceName: '',
        path: '',
        requestMethod: '',
        parameterType: '',
        description: '',
        headerValue: [],
        bodyValue: [],
        variableList: [],
        expectList: []
      },
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
        interfaceName: [{ required: false, message: '', trigger: 'blur' }],
        requestMethod: [{ required: false, message: '', trigger: 'blur' }],
        parameterType: [{ required: false, message: '', trigger: 'blur' }],
        path: [{ required: false, message: '', trigger: 'blur' }],
        modifyDate: [{ required: false, message: '', trigger: 'blur' }],
        description: [{ required: false, message: '', trigger: 'blur' }]
      }
    }
  },
  created() {
    this.getCaseList()
    this.getProjectList()
  },
  methods: {
    async getCaseList() {
      const { data: res } = await this.$http.get('/listcase')
      if (res.code !== '0') return this.$message.error('获取用例列表失败')
      this.caseList = res.data
      console.log(this.caseList)
    },
    async getProjectList() {
      const { data: res } = await this.$http.get('/listproject')
      if (res.code !== '0') return this.$message.error('获取项目列表失败')
      this.projectList = res.data
      console.log(this.projectList)
    },
    async changeModule() {
      const { data: res } = await this.$http.get(
        '/selectbyprojectandmodule?projectName=' +
          this.baseInformation.projectName +
          '&moduleName=' +
          this.baseInformation.moduleName
      )
      if (res.code !== '0') return this.$message.error('获取接口地址失败')
      this.baseInformation.IpAddress = res.data.ipAddress
      const { data: res1 } = await this.$http.get(
        '/selectinterfacebyprojectandmodule?projectName=' +
          this.baseInformation.projectName +
          '&moduleName=' +
          this.baseInformation.moduleName
      )
      if (res1.code !== '0') return this.$message.error('获取接口名称失败')
      this.interfaceList = res1.data
    },
    async changeProject() {
      const { data: res } = await this.$http.get(
        '/selectbyprojectname?projectName=' + this.baseInformation.projectName
      )
      if (res.code !== '0') return this.$message.error('获取模块列表失败')
      this.moduleList = res.data
      console.log(this.moduleList)
    },
    async changeInterface() {
      const { data: res } = await this.$http.get(
        '/selectbaseinformation?projectName=' +
          this.baseInformation.projectName +
          '&moduleName=' +
          this.baseInformation.moduleName +
          '&interfaceName=' +
          this.baseInformation.interfaceName
      )
      if (res.code !== '0') return this.$message.error('获取接口信息失败')
      this.baseInformation.path = res.data.path
      this.baseInformation.requestMethod = res.data.requestMethod
      this.baseInformation.parameterType = res.data.parameterType
      this.baseInformation.description = res.data.description
      console.log(this.baseInformation)
    },
    // 清除弹窗内容
    addDialogClose() {
      this.$refs.baseInformation.resetFields()
    },
    editDialogClose() {
      this.$refs.editFormRef.resetFields()
    },
    // 点击确定新增用例
    async addCase() {
      const { data: res } = await this.$http.post('/addcase', this.baseInformation)
      if (res.code !== '0') return this.$message.error('添加用例失败')
      this.$message.success('添加用例成功')
      this.addDialogVisible = false
      this.getCaseList()
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
      })
        .then(async () => {
          await this.$http.get('/deletecase?id=' + id)
          this.getCaseList()
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
    },
    addRow() {
      var list = {
        rowNum: this.rowNum,
        post_id: [],
        require_des: '',
        remark: ''
      }
      this.baseInformation.headerValue.unshift(list)
      this.rowNum += 1
    },
    selectRow(val) {
      this.selectlistRow = val
    },
    delData() {
      for (let i = 0; i < this.selectlistRow.length; i++) {
        const val = this.selectlistRow
        // 获取选中行的索引的方法
        // 遍历表格中tableData数据和选中的val数据，比较它们的rowNum,相等则输出选中行的索引
        // rowNum的作用主要是为了让每一行有一个唯一的数据，方便比较，可以根据个人的开发需求从后台传入特定的数据
        val.forEach((val, index) => {
          this.baseInformation.headerValue.forEach((v, i) => {
            if (val.rowNum === v.rowNum) {
              // i 为选中的索引
              this.baseInformation.headerValue.splice(i, 1)
            }
          })
        })
      }
      // 删除完数据之后清除勾选框
      this.$refs.table.clearSelection()
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

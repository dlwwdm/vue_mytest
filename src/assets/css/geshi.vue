<template>
  <div class="tableDate">
    <div class="button" style="width: 6%; float: right">
      <P
        ><el-button class="el-icon-plus" @click.prevent="addRow()"></el-button
      ></P>
      <p>
        <el-button class="el-icon-minus" @click.prevent="delData()"></el-button>
      </p>
    </div>
    <div class="table">
      <el-table
        :data="tableData"
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
        <el-table-column label="岗位" align="center">
          <template slot-scope="scope">
            <el-cascader
              prop="post_id"
              class="post_name"
              v-model="scope.row.post_id"
              :options="post_options"
              :show-all-levels="false"
              @change="test"
            ></el-cascader>
            <!--<el-input v-model="scope.row.post_id"></el-input>-->
          </template>
        </el-table-column>
        <el-table-column label="需求">
          <template slot-scope="scope">
            <el-input
              class="require_des"
              v-model="scope.row.require_des"
            ></el-input>
          </template>
        </el-table-column>
        <el-table-column label="备注">
          <template slot-scope="scope">
            <el-input
              type="textarea"
              class="remark"
              v-model="scope.row.remark"
            ></el-input>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 登录表单数据绑定对象
      loginForm: {
        name: '',
        encrptPassword: ''
      }
    }
  },
  methods: {
    async login() {
      const { data: res } = await this.$http.post('login', this.loginForm)
      if (res.code !== '0') return this.$message.error('登录失败')
      this.$message.success('登录成功')
      this.$router.push('/home')
    },
    register() {
      this.$router.push('/register')
    }
  }
}
</script>

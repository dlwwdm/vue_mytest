<template>
  <div class="register_container">
    <div class="register_box">
    <div class="title">欢迎注册</div>
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="register_form">
      <el-form-item label="用户名" prop="name">
        <el-input v-model="ruleForm.name"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="encrptPassword">
        <el-input v-model="ruleForm.encrptPassword"></el-input>
      </el-form-item>
      <el-form-item label="手机号码" >
        <el-input v-model="ruleForm.telphone"></el-input>
      </el-form-item>
      <el-form-item label="邮箱" >
        <el-input v-model="ruleForm.email"></el-input>
      </el-form-item>
      <el-form-item label="性别" >
        <el-input v-model="ruleForm.gender"></el-input>
      </el-form-item>
      <el-form-item class="register_button">
          <el-button type="danger" @click="register">提交注册</el-button>
      </el-form-item>
    </el-form>
  </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      ruleForm: {
        name: '',
        encrptPassword: '',
        telphone: '',
        email: '',
        gender: ''
      },
      rules: {
        name: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 5, max: 8, message: '长度在 5 到 8 个字符', trigger: 'blur' }
        ],
        encrptPassword: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 5, max: 8, message: '长度在 5 到 8 个字符', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    async register() {
      const { data: res } = await this.$http.post('register', this.ruleForm)
      if (res.code !== '0') return this.$message.error('注册失败')
      this.$message.success('注册成功，请登录')
      this.$router.push('/login')
    }
  }
}
</script>

<style lang="less" scoped>
.register_container{
  background-color: #2b4b6b;;
  height: 100%;
}
.register_box{
  width: 480px;
  height: 540px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%,-50%);
  background-color: white;
}
.register_form{
    text-align: center;
    padding: 10px;
    width: 400px;
}
.title{
    font-size: 20px;
    text-align: center;
    padding: 40px;
}
.register_button{
    margin:0 auto;
}
</style>

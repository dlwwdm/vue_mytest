<template>
  <div class="login_container">
    <div class="login_box">
      <div class="picture_box">
        <!-- 头像区域 -->
        <img src="../assets/logo.jpeg" alt="">
        <!-- 表单区域 -->
      </div>
        <el-form ref="loginRef" :model="loginForm" class="login_form">
          <!-- 用户名区域 -->
         <el-form-item>
          <el-input prefix-icon="el-icon-user-solid" placeholder="用户名" v-model="loginForm.name"></el-input>
         </el-form-item>
         <!-- 密码区域 -->
         <el-form-item>
          <el-input prefix-icon="el-icon-lock" placeholder="密码" v-model="loginForm.encrptPassword" type="password"></el-input>
         </el-form-item>
          <!-- 按钮区域 -->
         <el-form-item class="login_button">
          <el-button type="danger" @click="register">注册</el-button>
          <el-button type="primary" @click="login">登录</el-button>
         </el-form-item>
        </el-form>
    </div>
  </div>
</template>

<script>
export default {
  data(){
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

<style lang="less" scoped>
.login_container{
  background-color: #2b4b6b;
  height: 100%;
}
.login_box{
  width: 450px;
  height: 300px;
  background: white;
  border-radius: 3px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%,-50%);

  .picture_box{
    height: 130px;
    width: 130px;
    border: 1px solid #eee;
    padding: 10px;
    border-radius: 50%;
    box-shadow: 0 0 10px #ddd;
    position: absolute;
    left: 50%;
    transform: translate(-50%,-50%);
    background-color: white;
  img{
    border-radius: 50%;
    width: 100%;
    height: 100%;
    background-color: #eee;
    }
}
.login_button{
  text-align:center;
}
.login_form{
  position: absolute;
  bottom: 0%;
  width: 100%;
  padding: 20px;
  box-sizing: border-box;
}
}
</style>

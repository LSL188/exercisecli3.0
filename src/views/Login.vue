<template>
  <div class="login-container">
    <div class="avatar">
      <img src="../assets/logo.png" alt>
    </div>
    <el-form :model="loginForm" :rules="loginFormRules" ref="loginFormRef">
      <el-form-item prop="username">
        <el-input v-model="loginForm.username">
          <i slot="prefix" class="iconfont icon-user"></i>
        </el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input v-model="loginForm.password" type="password" @keyup.enter.native="login">
          <i slot="prefix" class="iconfont icon-3702mima"></i>
        </el-input>
      </el-form-item>
      <el-form-item class="btns">
        <!-- <el-button type="success" size="middle" @click="register">注册</el-button> -->
        <el-button type="primary" size="middle" @click="login">登录</el-button>
        <el-button type="info" size="middle" @click="resetLogin">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    const checkusername = (rule, value, callback) => {
      if (/^[a-zA-Z0-9_-]{4,16}$/.test(value)) {
        callback();
      } else {
        callback(new Error("用户名应是4到16位（字母，数字，下划线，减号）"));
      }
    };

    const checkUsername2 = (rule, value2, callback) => {
      if (value2 !== value) {
        callback();
      } else {
        callback(new Error("用户名已存在！"));
      }
    };

    const checkpassword = (rule, value, callback) => {
      // if (
      //   /^.*(?=.{6,})(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*? ]).*$/.test(
      //     value
      //   )
      // ) {
      //   callback();
      // } else {
      //   callback(
      //     new Error(
      //       "密码应是最少6位，包括至少1个大写字母，1个小写字母，1个数字，1个特殊字符"
      //     )
      //   );
      // }
      if (/^[0-9]*$/.test(value)) {
        callback();
      } else {
        callback(new Error("密码应是纯数字"));
      }
    };

    return {
      loginForm: {
        username: "admin",
        password: "123456"
      },
      loginFormRules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          { validator: checkusername, trigger: "blur" }
        ],
        password: [{ required: true, message: "请输入密码", trigger: "blur" },
          { validator: checkpassword, trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    resetLogin() {
      this.$refs.loginFormRef.resetFields();
    },
    login() {
      this.$refs.loginFormRef.validate(async valid => {
        if (!valid) return;
        const { data: res } = await this.$http.post("/login", this.loginForm);
        console.log(res);
        if (res.meta.status !== 200) return this.$message.error("登录失败！");
        this.$message.success("登陆成功！");
        window.sessionStorage.setItem("token", res.data.token);
        this.$router.push("/home");
      });
    },
    // register() {
    //   this.$refs.loginFormRef.validate(async valid => {
    //     if (!valid) return;
    //     // 需调用调用注册的接口
    //     const { data: res } = await this.$http.post("/register", this.loginForm);
    //     console.log(res);
    //     // 判断注册的用户名的状态值
    //     if (res. === 2) return this.$message.error("用户名已存在，注册失败！");
    //     this.$message.success("注册成功！");
    //     window.sessionStorage.setItem("token", res.data.token);
    //     this.$router.push("/home");
    //   });
    }
  }
</script>

<style lang="less" scoped>
.login-container {
  width: 450px;
  height: 304px;
  background-color: #fff;
  border-radius: 4px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  .avatar {
    width: 130px;
    height: 130px;

    border-radius: 50%;
    border: 1px solid #ccc;
    position: absolute;
    left: 50%;
    transform: translate(-50%, -50%);
    box-shadow: 0 0 10px #eee;
    padding: 10px;
    background-color: #fff;
    img {
      width: 100%;
      height: 100%;
      border-radius: 50%;
      background-color: #eee;
    }
  }
  .el-form {
    padding: 0 20px;
    width: 100%;
    box-sizing: border-box;
    position: absolute;
    bottom: 0;
    .btns {
      display: flex;
      justify-content: flex-end;
    }
  }
}
</style>

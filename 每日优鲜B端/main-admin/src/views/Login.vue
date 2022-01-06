<template>
  <div class="form-container">
    <a-form-model
      ref="loginFrom"
      :model="loginFrom"
      :rules="rules"
      v-bind="layout"
    >
      <a-form-model-item has-feedback label="邮箱" prop="email">
        <a-input v-model="loginFrom.email" />
      </a-form-model-item>
      <a-form-model-item has-feedback label="密码" prop="password">
        <a-input
          v-model="loginFrom.password"
          type="password"
          autocomplete="off"
        />
      </a-form-model-item>

      <a-form-model-item :wrapper-col="{ span: 14, offset: 4 }">
        <a-button type="primary" @click="submitForm('loginFrom')">
          登录
        </a-button>
        <a-button style="margin-left: 10px" @click="logonForm('loginFrom')">
          注册
        </a-button>
      </a-form-model-item>
    </a-form-model>
  </div>
</template>
<script>
import api from "@/api/login";
export default {
  data() {
    let regEmail = /^[\w-]+@[\w.-]+.com$/;
    let checkEmail = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("请输入邮箱"));
      }
      if (regEmail.test(value)) {
        return callback();
      } else {
        return callback(new Error("邮箱格式不正确"));
      }
    };
    let validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        callback();
      }
    };
    return {
      loginFrom: {
        password: "",
        email: "",
      },
      rules: {
        password: [{ validator: validatePass, trigger: "change" }],
        email: [{ validator: checkEmail, trigger: "change" }],
      },
      layout: {
        labelCol: { span: 4 },
        wrapperCol: { span: 14 },
      },
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          api
            .login(this.loginFrom)
            .then((res) => {
              this.$store.dispatch("setUserInfo", res).then(() => {
                this.$router.push({
                  name: "Home",
                  params: res,
                });
              });

              this.$message.success("登录成功");
            })
            .catch((err) => {
              this.$message.error(err);
            });
          return true;
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    logonForm(formName) {
      this.$router.push({
        name: "Logon",
      });
    },
  },
};
</script>
<style lang="less">
.form-container {
  width: 400px;
  height: 300px;
  padding: 50px 0 0 30px;
  margin: 50px auto;
  border: 1px solid #ccc;
}
</style>

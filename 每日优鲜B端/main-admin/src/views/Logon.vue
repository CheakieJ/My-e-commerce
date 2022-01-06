<template>
  <div class="logon-container">
    <a-form-model
      ref="logonForm"
      :model="logonForm"
      :rules="rules"
      v-bind="layout"
    >
      <a-form-model-item has-feedback label="用户名" prop="username">
        <a-input
          v-model="logonForm.username"
          type="username"
          autocomplete="off"
        />
      </a-form-model-item>
      <a-form-model-item has-feedback label="邮箱" prop="email">
        <a-input v-model="logonForm.email" />
      </a-form-model-item>
      <a-form-model-item has-feedback label="密码" prop="password">
        <a-input
          v-model="logonForm.password"
          type="password"
          autocomplete="off"
        />
      </a-form-model-item>

      <a-form-model-item has-feedback label="验证码" prop="code">
        <a-input v-model="logonForm.code" type="code" autocomplete="off" />
      </a-form-model-item>

      <a-form-model-item :wrapper-col="{ span: 14, offset: 4 }">
        <a-button
          style="margin-right: 0px"
          :loading="loading"
          :disabled="logonForm.email == ``"
          @click="codeForm"
        >
          获取验证码
        </a-button>
        <a-button type="primary" block @click="submitForm('logonForm')">
          注册
        </a-button>
      </a-form-model-item>
    </a-form-model>
  </div>
</template>
<script>
import api from "@/api/logon";
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
    let checkUsername = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入用户名"));
      } else {
        callback();
      }
    };
    let checkCode = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入验证码"));
      } else {
        callback();
      }
    };
    return {
      logonForm: {
        password: "",
        email: "",
        username: "",
        code: "",
      },
      rules: {
        password: [{ validator: validatePass, trigger: "change" }],
        email: [{ validator: checkEmail, trigger: "change" }],
        username: [{ validator: checkUsername, trigger: "change" }],
        code: [{ validator: checkCode, trigger: "change" }],
      },
      layout: {
        labelCol: { span: 4 },
        wrapperCol: { span: 14 },
      },
      loading: false,
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          api
            .logon(this.logonFrom)
            .then((res) => {
              this.$message.success("注册成功");
              this.router.push({
                name: "Login",
              });
            })
            .catch((err) => {
              this.$message.success(err);
            });
          return true;
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    async codeForm() {
      this.loading = true;
      const res = await api.code(this.logonForm);
      this.loading = false;
    },
  },
};
</script>
<style lang="less">
.logon-container {
  width: 500px;
  height: 400px;
  padding: 30px 0 0 30px;
  margin: 50px auto;
  border: 1px solid #ccc;
}
</style>

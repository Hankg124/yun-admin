<template>
  <div class="login-logo">
    <div class="login-wrap">
      <img class="login-img" src="http://vue3.mengxuegu.com/assets/login-logo-6c42311e.png" alt="">
      <div class="login-title">账号登录</div>
      <el-form ref="ruleFormRef" :model="states.loginForm" :rules="rules">
        <el-form-item prop="username">
          <el-input prefix-icon="User" v-model="states.loginForm.username" type="text" placeholder="请输入帐号/手机号
" />
        </el-form-item>
        <el-form-item prop="password">
          <el-input prefix-icon="Unlock" placeholder="请输入密码" show-password v-model="states.loginForm.password"
            type="password" />
        </el-form-item>
        <el-form-item>
          <el-checkbox v-model="states.isRemember">记住密码</el-checkbox>
          <el-button type="primary" @click="handleSubmit">登录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script setup lang='ts'>
import { reactive, ref } from 'vue';
import type { StateType } from "@/types/login"
import { ElMessage, type FormInstance, type FormRules } from 'element-plus';
import { useRouter } from "vue-router"
const router = useRouter();
import { Local } from "@/utils/storage"
import { useAuthStore } from "@/stores/auth"
const state = useAuthStore();
import { loginApi } from "@/api/auth"

// 表单实例
const ruleFormRef = ref<FormInstance>();

// 表单数据
const states = reactive<StateType>({
  isRemember: Local.get('isRemember') || false,
  loginForm: {
    username: Local.get('username') || '17802901987',
    password: Local.get('password') || ''
  }
})

// 校验用户名方法
const validateUsername = (rule: any, value: string, callback: Function) => {
  const phoneRegex = /^1[34578]\d{9}$/;
  if (!phoneRegex.test(value)) {
    callback(new Error("请输入正确的手机号码"));
  } else {
    callback();
  }
};

// 校验密码
const validatePassword = (rule: any, value: string, callback: Function) => {
  var patrn = /^(\w){6,20}$/;
  if (!patrn.test(value)) {
    callback(new Error("密码格式错误,请重新输入"));
  } else {
    callback();
  }
};

//表单校验
const rules = reactive<FormRules<typeof states.loginForm>>({
  username: [
    { required: true, message: "请输入有效帐号/手机号", trigger: "blur" },
    { validator: validateUsername, trigger: "blur" },
  ],
  password: [
    { required: true, message: '请输入有效密码', trigger: 'blur' },
    { validator: validatePassword, trigger: 'blur' }
  ]
})

//登录
// const login = (formEl: FormInstance | undefined) => {
//   if (!formEl) return
//   formEl.validate((valid:boolean) => {
//     if (valid) {
//     //   router.push('/');
//       ElMessage({
//         message: '登录成功',
//         type: 'success',
//       })
//       if(state.isRemember){
//         //存储账号与密码
//         Local.set("username",state.loginForm.username);
//         Local.set("password",state.loginForm.password);
//         Local.set("isRemember",state.isRemember);
//       }else{
//         Local.remove("username");
//         Local.remove("password");
//         Local.remove("isRemember");
//       }
//       loginApi(state.loginForm).then(res => {
//               console.log(res);
//       })
//     } else {
//         ElMessage({
//         message: '登录失败',
//         type: 'error',
//       })
//       return false
//     }
//   })
// }
// 登录方法
const handleSubmit = () => {
  ruleFormRef.value!.validate((valid: boolean) => {
    if (valid) {

      //存储账号与密码
      state.stRememberPwd(states);
      state.userLogin(states).then(res => {
        // 跳转到主页
        console.log("res",res);
        
        router.push("/");
      });
      // if (states.isRemember) {
      //       Local.set("username", states.loginForm.username);
      //       Local.set("password", states.loginForm.password);
      //       Local.set("isRemember", states.isRemember);
      //   } else {
      //       Local.remove("username");
      //       Local.remove("password");
      //       Local.remove("isRemember");
      //   }
      // const res = await loginApi(states.loginForm);
      // console.log(res);
      // // 存储token
      // state.setToken(res.data.data.access_token)


    }
  });
};

</script>
<style lang='scss' scoped>
.login-logo {
  width: 100%;
  height: 100%;
  background-image: url("http://vue3.mengxuegu.com/assets/login-bj-514aa045.png");
  background-size: cover;
  background-position: center;
  overflow: hidden;

  .login-wrap {
    width: 410px;
    height: 460px;
    background-color: #fff;
    margin: auto;
    margin-right: 130px;
    box-shadow: #cec6c6 0 2px 15px;
    border-radius: 10px;
    padding: 30px;
    box-sizing: border-box;
    margin-top: 120px;

    .login-img {
      display: block;
      margin: 0 auto;
      width: 120px;
    }

    .login-title {
      font-size: 20px;
      margin: 20px 0;
    }

    .el-button {
      width: 100%;
      margin: 10px 0;
    }
  }
}
</style>
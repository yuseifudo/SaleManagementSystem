<template>
  <el-form class="login-form" status-icon :rules="loginRules" ref="loginForm" :model="loginForm" label-width="0">
    <el-form-item prop="username">
      <el-input size="small" @keyup.enter.native="handleLogin" v-model="loginForm.username" auto-complete="off"
                placeholder="请输入登录名">
        <i slot="prefix" class="icon-yonghu"></i>
      </el-input>
    </el-form-item>
    <el-form-item prop="password">
      <el-input size="small" @keyup.enter.native="handleLogin" :type="passwordType" v-model="loginForm.password"
                auto-complete="off" placeholder="请输入密码">
        <i class="el-icon-view el-input__icon" slot="suffix" @click="showPassword"></i>
        <i slot="prefix" class="icon-mima"></i>
      </el-input>
    </el-form-item>
    <el-checkbox v-model="checked">记住账号</el-checkbox>
    <el-form-item>
      <el-button type="primary" size="small" @click.native.prevent="handleLogin" class="login-submit">登录</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
  import {isvalidUsername} from '@/utils/validate'
  import {login} from '@/api/login'

  export default {
    name: 'userlogin',
    data() {
      const validateUsername = (rule, value, callback) => {
        if (!isvalidUsername(value)) {
          callback(new Error('登录名或密码错误！'))
        } else {
          callback()
        }
      }
      const validatePassword = (rule, value, callback) => {
        if (!isvalidUsername(value)) {
          callback(new Error('登录名或密码错误！'))
        } else {
          callback()
        }
      }
      const validateCode = (rule, value, callback) => {
        if (this.code.value !== value) {
          this.loginForm.code = ''
          this.refreshCode()
          callback(new Error('请输入正确的验证码'))
        } else {
          callback()
        }
      }
      return {
        loginForm: {
          username: '',
          password: ''
        },
        checked: false,
        code: {
          src: '',
          value: '',
          len: 4,
          type: 'text'
        },
        loginRules: {
          username: [
            // {required: true, message: '登录名不能为空！', trigger: 'blur', validator: validateUsername}
            {required: true, message: '登录名不能为空！', trigger: 'blur'}
          ],
          password: [
            {required: true, message: '密码不能为空！', trigger: 'blur'},
            // { min: 6, message: '密码长度最少为6位', trigger: 'blur' }
          ],
          code: [
            {required: true, message: '请输入验证码', trigger: 'blur'},
            {min: 4, max: 4, message: '验证码长度为4位', trigger: 'blur'},
            {required: true, trigger: 'blur', validator: validateCode}
          ]
        },
        passwordType: 'password'
      }
    },
    created() {
    },
    mounted() {
    },
    computed: {},
    props: [],
    methods: {
      showPassword() {
        this.passwordType === ''
          ? (this.passwordType = 'password')
          : (this.passwordType = '')
      },
      handleLogin() {
        this.$refs.loginForm.validate(valid => {
          if (valid) {
            this.$store.dispatch('Login', this.loginForm).then(res => {
              console.log(res)
              this.$router.push({path: '/dashboard/dashboard'})
              // this.$router.push({ path: '/dashboard/dashboard'||  '/'})
            })
          }
          /*if (valid) {
            var loginParams = {loginName: this.loginForm.username, password: this.loginForm.password};

            //调用函数  传递参数 获取结果
            login(loginParams).then(data => {

              console.log(data);

              if (data.code == '200') {
                //登录成功
                // sessionStorage.setItem('access-token', data.token);
                //用vue路由跳转到后台主界面
                this.$router.push({path: '/dashboard/dashboard'});
              } else {
                this.$message({
                  message: data.msg,
                  type: 'error'
                });
              }
            })
          }else{
              console.log('登录失败！');
              return false;
            }*/

        })
      }
    }
  }
</script>
<style>
</style>

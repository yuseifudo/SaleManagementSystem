<!--修改密码-->

<template>
  <div class="change">
  <el-col :span="6">
    <div class="area">
        <p class="title"><i class="fa fa-edit"></i>修改密码</p>
        <el-form class="form"  :model="pwdForm" :rules="pwdRules" ref="pwdForm" label-width="100px">
          <el-form-item label="原密码" prop="password">
            <el-input type="password" v-model="pwdForm.password" auto-complete="off" size="mini" placeholder="请输入原密码"></el-input>
          </el-form-item>
          <el-form-item label="新密码" prop="newpassword">
            <el-input type="password" v-model="pwdForm.newpassword" auto-complete="off" size="mini" placeholder="请输入新密码"></el-input>
          </el-form-item>
          <el-form-item label="确认新密码" prop="surepassword">
            <el-input type="password" v-model="pwdForm.surepassword" auto-complete="off" size="mini" placeholder="请输入确认新密码"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm('pwdForm')">提交</el-button>
            <el-button @click="resetForm('pwdForm')">重置</el-button>
          </el-form-item>
        </el-form>
    </div>
  </el-col>
  </div>
</template>

<script>
  import {updatePassword} from '@/api/passwdChange.js'
  import {getToken} from  '@/utils/auth.js'

export default {
  data() {
//     validateField:对部分表单字段进行校验的方法
//    let validatePassword = (rule, value, callback) => {
//      if (value === '') {
//        callback(new Error('请输入新密码'));
//      } else if (value ===password) {
//          callback(new Error('密码正确'));
//        }else {
//            callback(new Error('密码错误'));
//        }
//        callback();
//      }
//    };

    let validateNewpassword = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入新密码'));
      } else {
        if (this.pwdForm.surepassword !== '') {
          this.$refs.pwdForm.validateField('surepassword');
        }
        callback();
      }
    };

    let validateSurepassword = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入确认密码'));
      } else if (value !== this.pwdForm.newpassword) {
        callback(new Error('两次输入密码不一致!'));
      } else {
        callback();
      }
    };

    return {
      pwdForm: {
        password: '',
        newpassword: '',
        surepassword: ''
      },
      pwdRules: {
        password: [
          {required: true, message: '请输入原密码', trigger: 'blur'},
        ],
        newpassword: [
          {required: true, validator: validateNewpassword, trigger: 'blur'},
        ],
        surepassword: [
          {required: true, validator: validateSurepassword, trigger: 'blur'},
        ],
      },
    };

  },


  methods: {
    getPassword() {
      const params={token:getToken()}
      getPassword(params).then(res => {
        this.password = res.data
        console.log(this.password)
      })
    },
    showMessage(type,message){
      this.$message({
        type: type,
        message: message
      });
    },

    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$confirm('是否修改用户密码?', '提示', {
            type: 'warning'
          })
            .then(()=>{
              const params={
                  token:getToken(),
                  oldPassword:this.pwdForm.password,
                  newPassword:this.pwdForm.newpassword,
                  confirmPassword:this.pwdForm.surepassword
              }
              updatePassword(params).then(res=>{
                if(res.code==0){
                  this.$message({
                    message: '密码更新成功',
                    type: 'success'
                  })
                  this.$refs[formName].resetFields();
                }else {
                  this.$message({
                    message: res.msg,
                    type: 'error'
                  })
                }
              })
            })
      }
      });
    },
//
//    updateData() {
//      this.$refs.pwdForm.validate(valid => {
//        if (valid) {
//          this.$confirm('确认提交吗？', '提示', {})
//            .then(() => {
//              const para = Object.assign({}, this.pwdForm)
//
//              updatepassWord(para).then(res => {
//                this.$message({
//                  message: '修改成功',
//                  type: 'success'
//                })
//                this.$refs['pwdForm'].resetFields()
//                this.dialogFormVisible = false
//                this.getAdmins()
//              })
//            })
//            .catch(e => {
//              // 打印一下错误
//              console.log(e)
//            })
//        }
//      })
//    },

    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
  }

}
</script>
<style>
  .change{
    padding: 0;
    margin: 0 auto;
    overflow: auto;
    /*border:1px solid red;*/
    width: 522px;
  }
  .area{
    /*border:1px solid #dfdfdf;*/
    width: 500px;
    height:100%;
    font-size:18px;
    padding:10px;
  }
  .form{
    width:85%;
    height: auto;
    margin-top:20px;
  }
  .title{
    text-align:center;
    letter-spacing:8px;
    font-weight:  bold;
    font-size: 30px;
    width:100%;
    height:50px;
    line-height:50px;
    cursor: pointer;
    background-color: #3bc5ff;
    border:1px solid #3bc5ff;
    color: white;
    display: block;
  }
  .fa{
    margin-right:5px;
  }
</style>

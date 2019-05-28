<!--个人信息修改-->

<template>


<!--  <div class="information">-->
<!--    <el-col :span="8">-->
<!--      <div class="area">-->
<!--        <p class="title"><i class="fa fa-edit"></i>个人信息</p>-->
<!--        <el-form class="form"  :model="infoForm" :rules="infoRules" ref="infoForm" label-width="100px">-->
<!--          <el-form-item label="姓名" prop="username">-->
<!--            <el-input v-model="infoForm.username"  size="mini" disabled placeholder="请输入姓名"></el-input>-->
<!--          </el-form-item>-->
<!--          <el-form-item label="性别" prop="usersex">-->
<!--            <el-select v-model="infoForm.usersex"  size="mini"  placeholder="请选择性别">-->
<!--              <el-option label="男" value="1"></el-option>-->
<!--              <el-option label="女" value="2"></el-option>-->
<!--            </el-select>-->
<!--          </el-form-item>-->
<!--          <el-form-item label="籍贯">-->
<!--            <el-input v-model="infoForm.native"  size="mini" disabled placeholder="请输入籍贯"></el-input>-->
<!--          </el-form-item>-->
<!--          <el-form-item label="民族">-->
<!--            <el-input v-model="infoForm.nationnality"  size="mini" disabled placeholder="请输入民族"></el-input>-->
<!--          </el-form-item>-->
<!--          <el-form-item label="年龄" prop="nickage">-->
<!--            <el-input v-model="infoForm.nickage" size="mini"  placeholder="请输入年龄"></el-input>-->
<!--          </el-form-item>-->
<!--          <el-form-item label="出生日期">-->
<!--            <el-input v-model="infoForm.birth" size="mini" disabled placeholder="请输入出生日期" ></el-input>-->
<!--          </el-form-item>-->
<!--          <el-form-item label="学历" prop="education">-->
<!--            <el-select v-model="infoForm.education"  size="mini"  placeholder="请选择学历">-->
<!--              <el-option label="大学专科" value="1"></el-option>-->
<!--              <el-option label="大学本科" value="2"></el-option>-->
<!--              <el-option label="硕士研究生" value="3"></el-option>-->
<!--              <el-option label="博士研究生" value="4"></el-option>-->
<!--            </el-select>-->
<!--          </el-form-item>-->
<!--          <el-form-item label="绑定邮箱" prop="email">-->
<!--            <el-input v-model="infoForm.email" size="mini" placeholder="请输入绑定邮箱"></el-input>-->
<!--          </el-form-item>-->
<!--          <el-form-item label="绑定手机" prop="telphone">-->
<!--            <el-input v-model="infoForm.telphone" size="mini" placeholder="请输入绑定手机"></el-input>-->
<!--          </el-form-item>-->
<!--          <el-form-item>-->
<!--            <el-button type="primary" @click="submitForm('infoForm')">提交</el-button>-->
<!--            <el-button @click="resetForm('infoForm')">重置</el-button>-->
<!--          </el-form-item>-->
<!--        </el-form>-->
<!--      </div>-->
<!--    </el-col>-->
<!--  </div>-->


  <div class="information">
    <el-col :span="8">
      <div class="area">
        <p class="title"><i class="fa fa-edit"></i>个人信息</p>
        <el-form class="form"  :model="infoForm" :rules="infoRules" ref="infoForm" label-width="100px">
          <el-form-item label="姓名">
            <el-input v-model="infoForm.managerName"  size="mini" disabled placeholder="请输入姓名"></el-input>
          </el-form-item>
          <el-form-item label="登陆名">
          <el-input v-model="infoForm.loginName"  size="mini" disabled placeholder="请输入姓名全拼"></el-input>
          </el-form-item>
          <el-form-item label="性别" prop="managerSex" >
            <el-select v-model="infoForm.managerSex"  size="mini"  placeholder="请选择性别">
              <el-option label="男" value="1"></el-option>
              <el-option label="女" value="2"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="绑定邮箱" prop="managerEmail">
            <el-input v-model="infoForm.managerEmail" size="mini" placeholder="请输入绑定邮箱"></el-input>
          </el-form-item>
          <el-form-item label="绑定手机" prop="managerTel">
            <el-input v-model="infoForm.managerTel" size="mini" placeholder="请输入绑定手机"></el-input>
          </el-form-item>
<!--          <el-form-item label="token" prop="token">-->
<!--            <el-input v-model="infoForm.token" size="mini" placeholder="token"></el-input>-->
<!--          </el-form-item>-->
          <el-form-item>
            <el-button type="primary" @click="submitForm('infoForm')">提交</el-button>
            <el-button @click="resetForm('infoForm')">重置</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-col>
  </div>


</template>
<script>
import {getUser} from '@/api/userinfoForm'
import {submitForm} from '@/api/userinfoForm'
import  {getToken}from '@/utils/auth'
export default {
  data(){
    // 附带callback(),是在明确通过验证的情况下去掉输入框上的loading
    let validateEmail = (rule, value, callback) => {
      if(value == ''){
        callback(new Error('请输入邮箱~'));
        return;
      }
      let emailRegex = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
      if (!emailRegex.test(value)) {
        callback(new Error('邮箱格式不正确！'))
      } else {
        callback();
      }
    };
    let validatePhone = (rule, value, callback) => {
      if(value == ''){
        callback(new Error('请输入手机号码~'));
      }{
        let phoneRegex = /^1[34578]\d{9}$/;
        if (!phoneRegex.test(value)) {
          callback(new Error('手机号码格式不正确！'))
        } else {
          callback();
        }
      }
    };

    return {

      infoForm:{
        managerName:'',
        loginName:'',
        managerSex:'',
        managerEmail:'',
        managerTel:''
      },

      phoneForm:{
        phone:'',
        baseType:[],
        changeType:[]
      },
      infoRules: {
        // sex: [
        //   { required: true, message: '请选择性别', trigger: 'change' }
        // ],
        managerSex: [
          { required: true, message: '请选择性别', trigger: 'change' }
        ],
//         native: [
//           { required: true, message: '请输入籍贯', trigger: 'blur' },
//           { min: 2, max: 20, message: '长度在 2 到 20 个字符', trigger: 'blur' }
//         ],
//         nationnality: [
//           { required: true, message: '请输入民族', trigger: 'blur' },
//           { min: 2, max: 8, message: '长度在 2 到 8 个字符', trigger: 'blur' }
//         ],
//         nickage: [
//           { required: true, message: '请输入年龄', trigger: 'blur' },
// //          { min: 2, max: 3, message: '长度在 2 到 3 个字符', trigger: 'blur' }
//         ],
//         birth: [
//           { required: true, message: '请输入出生日期', trigger: 'blur' },
//           { min: 2, max: 12, message: '长度在 2 到 12 个字符', trigger: 'blur' }
//         ],
//         education: [
//           { required: true, message: '请选择学历', trigger: 'change' }
//         ],
//         email: [
//           {required: true,validator: validateEmail,trigger: 'blur'}
//         ],
//         telphone: [
//           {required: true,validator: validatePhone, trigger: 'blur' },
//         ],
        managerEmail: [
          {required: true,validator: validateEmail,trigger: 'blur'}
        ],
        managerTel: [
          {required: true,validator: validatePhone, trigger: 'blur' },
        ],
      },
    };
  },
  mounted() {
    this.getUser();
    // this.submitForm();
  },
  methods: {
    // 性别显示转换
    formatSex: function(row, column) {
      return row.managerSex === 1 ? '男' : row.managerSex === 0 ? '女' : '未知'
    },

    showMessage(type,message){
      this.$message({
        type: type,
        message: message
      });
    },

    getUser() {
       const params={token:getToken()}
      getUser(params).then(res => {
        this.infoForm = res.data
        console.log(this.infoForm)
      })
    },
    submitForm() {
      this.$confirm('确认提交吗？', '提示', {});
      const params={token:getToken()}
      submitForm(params).then(res => {
        if (res.data!=null){
          this.infoForm = res.data
          return this.$message.success('提交成功！');
        }
        else this.showMessage('warning', '请您填写相关信息！');
        console.log(this.infoForm)
      })
    },



 // submitForm(formName) {
 //      this.$refs[formName].validate((valid) => {
 //        if (valid) {
 //          if (formName == 'infoForm') { // 判断手机服务是否为空
 //            this.phoneForm.phone = this.infoForm.managerTel;
 //            for (let abc in this.phoneForm) {
 //              if (this.phoneForm[abc] == '') {
 //                this.showMessage('warning', '请您填写手机号码！');
 //                return this.$message.success('提交成功！');
 //              }
 //            }
 //          } else if (formName == 'phoneForm') {// 判断修改信息是否为空
 //            this.infoForm.managerTel = this.phoneForm.phone;
 //            for (let abc in this.infoForm) {
 //              if (this.infoForm[abc] == '') {
 //                this.showMessage('warning', '请您修改相关信息！');
 //                return this.$message.success('提交成功！');
 //              }
 //            }
 //          }
 //          //保存修改的相关信息
 //          let userinfo = this.infoForm;
 //          let userData = Object.assign(userinfo);
 //          console.log(userData);
 //          axios({
 //            type:'get',
 //            path:'http://localhost:8080/personal/putInfo',
 //            data:userData,
 //            fn:data=>{
 //              console.log(data);
 //              if(data.status == 1){
 //                this.showMessage('success','修改个人信息成功！');
 //                this.$router.push('/getInfo');
 //
 //              }else{
 //                this.$message.error('修改失败请重试！')
 //              }
 //
 //            },
 //            errFn:(res)=>{
 //              this.showMessage('error',res.message);
 //            }
 //          })
 //
 //        } else {
 //          console.log('error submit!!');
 //          return false;
 //        }
 //      });
 //    },

    resetForm(formName) {
      this.$refs[formName].resetFields();
    }

}
}

</script>
<style>
 .information{
   padding: 0;
   margin: 0 auto;
   overflow: auto;
   width: 820px;
 }
 .area{
   width: 800px;
   height:100%;
   font-size:18px;
   padding:10px;
 }
 .form{
   width:85%;
   height: auto;
   margin-top:20px;
 }
  .title {
    text-align: center;
    letter-spacing: 8px;
    font-weight: bold;
    font-size: 30px;
    width: 100%;
    height: 50px;;
    line-height: 50px;
    cursor: pointer;
    background-color: #3bc5ff;
    border: 1px solid #3bc5ff;
    color: white;
    display: block;
  }
  .fa{
    margin-right:5px;
  }


</style>

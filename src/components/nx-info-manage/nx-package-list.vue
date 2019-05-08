<template>
<!--  author:shilongcheng date:2019-05-07 function：套餐管理页面套餐列表的显示与操作-->
  <div class="data-card">
    <div class="edit-area">
<!--      <el-button-group class="button-group">-->
        <el-button type="primary" icon="el-icon-plus" class="add–button" @click="handleAdd">添加</el-button>
<!--      </el-button-group>-->
    </div>

    <el-row :span="24">
      <el-col class="colItem" :span="item.span" v-for="(item,index) in packageLists" :key="item.id">
        <div class="item" v-if="item.isFirstPush" style="border:2px solid red">
          <img :src="item.img" class="item-img" />
          <div class="item-text" :style="{color:item.color,backgroundColor:item.bgText}">
            <h3>{{item.name}}</h3>
            <p>{{item.description}}</p>
          </div>
        </div>
        <div class="item" v-else>
          <img :src="item.img" class="item-img" />
          <div class="item-text" :style="{color:item.color,backgroundColor:item.bgText}">
            <h3>{{item.name}}</h3>
            <p>{{item.description}}</p>
          </div>

        </div>
        <div class="operate-button-group">
          <el-button-group >
            <el-tooltip  v-if="item.isFirstPush" effect="dark" content="该套餐为首推套餐" placement="bottom-start">

              <el-button size="medium"  disabled type="success" icon="el-icon-star-on"></el-button>
            </el-tooltip>

            <el-tooltip  v-else effect="dark" content="设置该套餐为首推套餐" placement="bottom-start">
              <el-button size="medium"  type="warning" @click="FirstPushSet(item.id)" icon="el-icon-star-off"></el-button>
            </el-tooltip>
            <el-tooltip  effect="dark"  content="查看详情" placement="bottom-start">
              <el-button size="medium" @click="handleShowItem(item.id)" type="info" icon="el-icon-view"></el-button>
            </el-tooltip>
            <el-tooltip  effect="dark" content="编辑套餐信息" placement="bottom-start">
              <el-button size="medium" type="info" @click="handleEdit(item.id)" icon="el-icon-edit"></el-button>
            </el-tooltip>
            <el-tooltip  effect="dark" content="删除该套餐" placement="bottom-start">
              <el-button size="medium" type="danger" @click="deleteItem(item.id)" icon="el-icon-delete"> </el-button>
            </el-tooltip>

          </el-button-group>
        </div>
      </el-col>
    </el-row>
<!--显示套餐详情dialog，默认隐藏-->
    <el-dialog :title="listItem.name+'套餐相关信息'" :visible.sync="detailDialog" :close-on-click-modal="false">
      <el-form :model="listItem"  ref="listItem">
        <el-form-item>
          <el-col :span="12">
            <el-form-item label="套餐编码:" label-width="120px">
              <el-input v-model="listItem.id"  readonly></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="套餐名:" label-width="120px">
              <el-input v-model="listItem.name" readonly></el-input>
            </el-form-item>
          </el-col>
        </el-form-item>
        <el-form-item>
          <el-col :span="12">
            <el-form-item label="套餐资费:" label-width="120px">
              <el-input v-model="listItem.fee"  readonly></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="是否首推套餐:" label-width="120px">
              <el-input v-model="listItem.isFirstPush" readonly></el-input>
            </el-form-item>
          </el-col>
        </el-form-item>
        <el-form-item>
          <el-col :span="12">
            <el-form-item label="套餐开始时间:" label-width="120px">
              <el-input v-model="listItem.startTime"  readonly></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="套餐结束时间:" label-width="120px">
              <el-input v-model="listItem.endTime" readonly></el-input>
            </el-form-item>
          </el-col>
        </el-form-item>
        <el-form-item>
          <el-col :span="12">
            <el-form-item label="操作人员:" label-width="120px">
              <el-input v-model="listItem.updateUser"  readonly></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="操作时间:" label-width="120px">
              <el-input v-model="listItem.updateTime" readonly></el-input>
            </el-form-item>
          </el-col>
        </el-form-item>
        <el-form-item>
          <el-col :span="12">
            <el-form-item label="套餐销售数量:" label-width="120px">
              <el-input v-model="listItem.number"  readonly></el-input>
            </el-form-item>
          </el-col>
        </el-form-item>
        <el-form-item>
          <el-col :span="24">
            <el-form-item label="套餐详细介绍:" label-width="120px">
              <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4}" v-model="listItem.description"  readonly></el-input>
            </el-form-item>
          </el-col>
        </el-form-item>
      </el-form>
    </el-dialog>
<!--    编辑新增套餐dialog-->
    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible" :close-on-click-modal="false">
      <el-form :model="addForm" label-width="80px" :rules="addFormRules" ref="addForm">
        <el-form-item label="套餐名:" prop="name">
          <el-input v-model="addForm.name" auto-complete="off" placeholder="请输入套餐名称" clearable></el-input>
        </el-form-item>
        <el-form-item label="套餐资费:" label-width="100px" prop="fee">
          <el-input-number v-model="addForm.fee" controls-position="right" :min="1" label="元/月"></el-input-number>&nbsp;&nbsp;元/月
        </el-form-item>
        <el-form-item label="套餐起止时间:" label-width="120px" required>
          <el-col :span="9">
            <el-form-item prop="startTime">
              <el-date-picker  type="date"  :picker-options="startTime" placeholder="选择套餐开始日期" v-model="addForm.startTime" value-format="yyyy-MM-dd" style="width: 100%;"></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="4" style="text-align: center">至</el-col>
          <el-col :span="9">
            <el-form-item prop="endTime">
              <el-date-picker type="date"  :picker-options="endTime" placeholder="选择套餐结束日期" v-model="addForm.endTime" value-format="yyyy-MM-dd" style="width: 100%;"></el-date-picker>
            </el-form-item>
          </el-col>
        </el-form-item>
        <el-form-item label="套餐描述:" label-width="100px" prop="description">
          <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4}" placeholder="请输入套餐的详细介绍" v-model="addForm.description"></el-input>
        </el-form-item>
        <el-form-item label="套餐图片:" label-width="100px">
          <el-col :span="9">
            <el-form-item>
              <el-upload
                class="upload-demo"
                drag
                action="https://jsonplaceholder.typicode.com/posts/"
                accept="image/jpeg,image/png"
                :on-exceed="handleExceed"
                :on-change="onUploadChange"
                :before-upload="onBeforeUpload"
                :auto-upload="false"
                :on-remove="handleRemove"
                :limit='2'
                :file-list="addForm.file"
                ref="upload">
                <i class="el-icon-upload"></i>
                <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
                <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过1Mb</div>
              </el-upload>
            </el-form-item>
          </el-col>
          <el-col :span="9">
            <el-form-item>
              <!--展示选中图片的区域-->
                <div style="width:100%;overflow: hidden;margin-left:150px;">
                  <img :src="src" alt="" style="width:100%;"/>
                </div>
            </el-form-item>
          </el-col>

        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button v-if="dialogStatus=='add'" type="primary" @click="onsubmit">添加</el-button>
        <el-button v-else type="primary" @click="updateItem(addForm.id)">修改</el-button>
        <el-button @click.native="dialogFormVisible=false">取消</el-button>

      </div>
    </el-dialog>

  </div>
</template>

<script>
  import util from '@/utils/table.js'
  import PubSub from 'pubsub-js'
  import {
    fetchList,
    fetchPackageDetail,
    createPackageInfo,
    deletePackageInfo,
    updatePackageInfo,
    setFirstPush
  } from '@/api/packageManage.js'
export default {

  name: 'nx-package-list',
  data() {
    return {
      listItem:{},
      packageLists:{},
      textMap: {
        update: '编辑套餐',
        add: '添加套餐'
      },
      dialogStatus:'',
      dialogFormVisible: false,
      detailDialog:false,
      param:"",//表单要提交的参数
      src:"", //展示图片的地址
      addForm:{
        id:0,
        name: '',
        fee: 1,
        description: '',
        startTime: '',
        endTime: '',
        file: [],
        img: ''
      },
      addFormRules: {
        name: [{ required: true, message: '请输入套餐名称', trigger: 'blur'}],
        fee: [{required:true,message: '套餐资费不能小于等于0',trigger: 'blur'}],
        description: [{ required: true, message: '请输入套餐详细描述', trigger: 'blur' }],
        startTime: [
          { type: 'string', required: true, message: '请选择套餐的开始时间', trigger: 'blur' }
        ],
        endTime: [{ type: 'string', required: true, message: '请选择套餐的结束时间', trigger: 'change' }],
      },
      startTime: {
        disabledDate: time => {
          if (this.addForm.endTime) {
            // return !(
            //   time.getTime() < new Date(this.addForm.endTime).getTime()&&time.getTime()>=Date.now())
            return (time.getTime()<Date.now()||time.getTime()>new Date(this.addForm.endTime).getTime());
          } else {
            // return !(time.getTime() > Date.now());
            return time.getTime()<Date.now();
          }
        }
      },
      endTime: {
        disabledDate: time => {
          if (this.addForm.startTime) {
            return time.getTime()<new Date(this.addForm.startTime).getTime()
          } else {
            return time.getTime()<Date.now();
          }
        }
      }
    }
  },
  props: {
    option: {
      type: Object,
      default: () => {}
    }
  },
  created() {},
  mounted() {
    this.getPackageList()
  },
  watch: {},
  computed: {},
  methods: {
    getPackageList(){
      fetchList().then((res)=>{
        if (res.code==0){
          this.packageLists=res.data;
        }
        else{
          this.$message({
            message: res.message,
            type: 'error'
          })
          return;
        }
      })
    },
    FirstPushSet(id){
      this.$confirm('是否将改套餐设为首推?', '提示', {
        type: 'warning'
      })
        .then(()=>{
        const para={id:id}
        setFirstPush(para).then((res)=>{
          if (res.code==0){
            this.packageLists=res.data;
          }
        })
      })
        .catch(() => {})
    },
    deleteItem(id){
      this.$confirm('是否删除该套餐?', '提示', {
        type: 'warning'
      })
        .then(()=>{
          const para={id:id}
          deletePackageInfo(para).then(res=>{
            if (res.code==0){
              this.packageLists=res.data.lists
              PubSub.publish("deleted","item has been deleted");
              this.$message({
                message: '套餐信息删除成功',
                type: 'success'
              })
            }
            else{
              message: res.data.message
              type: 'error'
            }
          })
        })
    },
    handleAdd(){
      this.dialogStatus = 'add'
      this.dialogFormVisible = true
      this.addForm={
          name: '',
          fee: 1,
          description: '',
          startTime: '',
          endTime: '',
          file: [],
          img: ''
      }
    },
    handleEdit(id){
      this.dialogStatus = 'update'
      this.dialogFormVisible = true
      for (let i=0;i<this.packageLists.length;i++){
        if (this.packageLists[i].id==id){
          this.addForm.id=id;
          this.addForm.name=this.packageLists[i].name;
          this.addForm.fee=this.packageLists[i].fee;
          this.addForm.description=this.packageLists[i].description;
          this.addForm.startTime=this.packageLists[i].startTime;
          this.addForm.endTime=this.packageLists[i].endTime;
          this.addForm.file=[];
          this.addForm.img='';
        }
      }
    },
    handleShowItem(id){
      const params={
        id:id
      }
      fetchPackageDetail(params)
        .then(res=>{
        if (res.code==0){
          this.listItem=res.data.item[0];
          if (this.listItem.isFirstPush){
            this.listItem.isFirstPush='是'
          } else{
            this.listItem.isFirstPush='否'
          }

          this.detailDialog=true

        } else{
          this.$message({
            message: res.data.message,
            type: 'error'
          })
          return;
        }
      })
        .catch(() => {
          this.$message({
            message: '套餐详情查询失败',
            type: 'error'
          })
          return;
        })

    },
    onsubmit(){// 添加套餐信息表单提交
      this.$refs.addForm.validate((valid) => {
        if (valid){
          this.$confirm('是否添加该套餐?', '提示', {
            type: 'warning'
          }).then(()=>{
            const params={
              name:this.addForm.name,
              fee:this.addForm.fee,
              startTime:this.addForm.startTime,
              endTime:this.addForm.endTime,
              description:this.addForm.description,
            }
            createPackageInfo(params)
              .then(res=>{
                if (res.code==0){
                  this.$message({
                    message: '添加套餐信息成功',
                    type: 'success'
                  })
                  this.packageLists=res.data
                  this.dialogFormVisible=false;
                  this.addForm.name='';
                  this.addForm.description='';
                  this.addForm.fee=1;
                  this.addForm.startTime='';
                  this.addForm.endTime='';
                  this.param='';
                  this.src='';
                  PubSub.publish("added","item has been added");
                  //this.$refs.upload.submit();//文件上传
                }
                else{
                  this.$message({
                    message: res.data.message,
                    type: 'error'
                  })
                  return;
                }
              })
              .catch(() => {
                this.$message({
                  message: '添加套餐信息失败',
                  type: 'error'
                })
                return;
              })
          })

        }else{
          this.$message({
            message: '套餐信息没有完全填写',
            type: 'error'
          })
        }
      })

    },
    updateItem(id){//更新套餐信息
      this.$refs.addForm.validate((valid) => {
        if (valid){
          this.$confirm('是否更新该套餐?', '提示', {
            type: 'warning'
          }).then(()=>{
            const params={
              id:id,
              name:this.addForm.name,
              fee:this.addForm.fee,
              startTime:this.addForm.startTime,
              endTime:this.addForm.endTime,
              description:this.addForm.description,
            }
            updatePackageInfo(params)
              .then((res)=>{
                if (res.code==0){
                  this.$message({
                    message: '修改套餐信息成功',
                    type: 'success'
                  })
                  this.packageLists=res.data.lists;
                  this.dialogFormVisible=false;
                  this.addForm.name='';
                  this.addForm.description='';
                  this.addForm.fee=1;
                  this.addForm.startTime='';
                  this.addForm.endTime='';
                  this.param='';
                  this.src='';
                  PubSub.publish("updated","item has been updated");
                  //this.$refs.upload.submit();//文件上传
                }
                else{
                  this.$message({
                    message: res.data.message,
                    type: 'error'
                  })
                  return;
                }
              })
              .catch(() => {
                this.$message({
                  message: '添加套餐信息失败',
                  type: 'error'
                })
                return;
              })
          })}
          else{
            this.$message({
              message: '套餐信息没有完全填写',
              type: 'error'
          })
        }
      })

    },
    onBeforeUpload(file) {
      const isIMAGE = file.type === 'image/jpeg'||'image/png';
      const isLt1M = file.size / 1024 / 1024 < 1;

      if (!isIMAGE) {
        this.$message.error('上传文件只能是图片格式!');
      }
      if (!isLt1M) {
        this.$message.error('上传文件大小不能超过 1MB!');
      }
      return isIMAGE && isLt1M;
    },
    onUploadChange(file,filesList){
      const isIMAGE = (file.raw.type === 'image/jpeg' || file.raw.type === 'image/png');
      const isLt1M = file.size / 1024 / 1024 < 1;

      if (!isIMAGE) {
        this.$message.error('只能上传jpg/png图片!');
        return false;
      }
      if (!isLt1M) {
        this.$message.error('上传文件大小不能超过 1MB!');
        return false;
      }

      console.log(file);;
      //创建临时的路径来展示图片
      var windowURL = window.URL || window.webkitURL;
      this.src=windowURL.createObjectURL(file.raw);
      //重新写一个表单上传的方法
      this.param = new FormData();
      this.param.append('file', file.raw, file.name);
      console.log(this.param);
      // return false;
    },
    handleRemove(file,filesList){
      this.param.delete('file')
    },
    handleExceed(){},



  }
}
</script>

<style lang="scss" scoped>
  @import '../../styles/data-card.scss';
  .edit-area{
    height: 70px;
  }
  .add–button{
      float: right;
      margin-right: 25px;
  }
  .operate-button-group{
    text-align: center;
  }
  .item{
    margin-bottom: 10px!important;
  }
  .colItem{
    margin-bottom: 50px;
  }
</style>

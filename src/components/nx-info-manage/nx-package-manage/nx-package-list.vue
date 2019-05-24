<template>
<!--  author:shilongcheng date:2019-05-07 function：套餐管理页面套餐列表的显示与操作-->
  <div class="data-card">
    <div class="edit-area">
<!--      添加按钮-->
        <el-button type="primary" icon="el-icon-plus" class="add–button" @click="handleAdd">添加</el-button>
    </div>

    <el-row :span="24">
      <el-col class="colItem" :span="cssStyle.span" v-for="(item,index) in packageLists" :key="item.productId">
<!--        如果是首推，则显示数据并且加上红色实线2像素的边框-->
<!--        border:2px inset red-->
        <div class="item" v-if="item.isFirstPush" style="box-shadow: 0 0 0 5px #05b5ed,0 0 0 7.5px lightBlue ,0 1px 2.5px 7.5px rgba(0,0,0,.6)">
          <img :src="item.imgUrl" class="item-img" />
          <div style="position:absolute;width:40px;height:40px;z-indent:2;right:  5px;top: 5px;">
            <i class="el-icon-star-on" style="color: red;width: 100%; font-size: 40px" ></i>
          </div>


          <div class="item-text" :style="{color:cssStyle.color,backgroundColor:cssStyle.bgText}">
            <h3>{{item.productName}}</h3>
            <p>{{item.description}}</p>
          </div>
        </div>
<!--        如果不是，则正常显示-->
        <div class="item" v-else>
          <img :src="item.imgUrl" class="item-img" />
          <div class="item-text" :style="{color:cssStyle.color,backgroundColor:cssStyle.bgText}">
            <h3>{{item.productName}}</h3>
            <p>{{item.description}}</p>
          </div>

        </div>
<!--        操作按钮 设置首推，查看详情，编辑套餐信息，删除套餐-->
        <div class="operate-button-group">
<!--          通过一个el-button-group实现一个按钮组-->
          <el-button-group >
<!--            如果是首推套餐则显示实心五心图标禁止点击 悬浮按钮提示首推套餐-->
            <el-tooltip  v-if="item.isFirstPush" effect="dark" content="首推套餐" placement="bottom-start">

              <el-button size="medium"  disabled type="success" icon="el-icon-star-on"></el-button>
            </el-tooltip>
<!--否则，显示空心五心按钮，悬浮按钮提示设置该套餐为首推套餐，可以点击，并且添加点击事件-->
            <el-tooltip  v-else effect="dark" content="设置该套餐为首推套餐" placement="bottom-start">
              <el-button size="medium"  type="warning" @click="FirstPushSet(item.productId)" icon="el-icon-star-off"></el-button>
            </el-tooltip>
<!--            显示详情，悬浮提示查看详情，添加点击事件-->
            <el-tooltip  effect="dark"  content="查看详情" placement="bottom-start">
              <el-button size="medium" @click="handleShowItem(item.productId)" type="info" icon="el-icon-view"></el-button>
            </el-tooltip>
<!--            编辑更新套餐，悬浮提示编辑套餐信息 添加点击事件-->
            <el-tooltip  effect="dark" content="编辑套餐信息" placement="bottom-start">
              <el-button size="medium" type="info" @click="handleEdit(item.productId)" icon="el-icon-edit"></el-button>
            </el-tooltip>
<!--            删除套餐，悬浮提示删除改套餐，添加点击事件-->
            <el-tooltip  effect="dark" content="删除该套餐" placement="bottom-start">
              <el-button size="medium" type="danger" @click="deleteItem(item.productId)" icon="el-icon-delete"> </el-button>
            </el-tooltip>

          </el-button-group>
        </div>
      </el-col>
    </el-row>
<!--显示套餐详情dialog，默认隐藏，通过查看套餐详情图标，唤醒该dialog,数据显示内容与listItem绑定-->
    <el-dialog :title="listItem.productName+'套餐相关信息'" :visible.sync="detailDialog" :close-on-click-modal="false" >
      <el-form :model="listItem"  ref="listItem">
<!--        每一行显示两个信息，设置为readonly-->
        <el-form-item>
          <el-col :span="12">
            <el-form-item label="套餐编码:" label-width="120px">
              <el-input v-model="listItem.productId"  readonly></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="套餐名:" label-width="120px">
              <el-input v-model="listItem.productName" readonly></el-input>
            </el-form-item>
          </el-col>
        </el-form-item>
        <el-form-item>
          <el-col :span="12">
            <el-form-item label="套餐资费:" label-width="120px">
              <el-input v-model="listItem.productFee"  readonly></el-input>
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
          <el-col :span="12">
            <el-form-item label="套餐简介:" label-width="120px">
              <el-input v-model="listItem.recommend" readonly></el-input>
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
<!--    编辑新增套餐dialog，默认隐藏，通过点击添加按钮或者编辑该套餐按钮，唤醒该dialog,title根据dialogStatus显示 编辑套餐 或者添加套餐-->
    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible" :close-on-click-modal="false"  @close="callOf('addForm')">
      <el-form :model="addForm" label-width="80px" :rules="addFormRules" ref="addForm">
        <el-form-item label="套餐名:" prop="productName">
          <el-input v-model="addForm.productName" auto-complete="off" placeholder="请输入套餐名称" clearable></el-input>
        </el-form-item>
        <el-form-item label="套餐资费:" label-width="100px" prop="productFee">
          <el-input-number v-model="addForm.productFee" controls-position="right" :min="1" label="元/月"></el-input-number>&nbsp;&nbsp;元/月
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
        <el-form-item label="套餐简介:" label-width="100px" prop="recommend">
          <el-input placeholder="请输入套餐简介" v-model="addForm.recommend"></el-input>
        </el-form-item>
        <el-form-item label="套餐描述:" label-width="100px" prop="description">
          <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4}" placeholder="请输入套餐的详细介绍" v-model="addForm.description"></el-input>
        </el-form-item>
        <el-form-item label="套餐图片:" label-width="100px">
          <el-upload
            ref="upload"
            action="http://localhost:8080/product/upload"
            name="picture"
            list-type="picture-card"
            :limit="1"
            :file-list="addForm.fileList"
            :on-change="handleChanged"
            :on-exceed="onExceed"
            :auto-upload="false"
            :before-upload="beforeUpload"
            :on-preview="handlePreview"
            :on-success="handleSuccess"
            :on-remove="handleRemove">
            <i class="el-icon-plus"></i>
          </el-upload>
          <el-dialog :visible.sync="dialogImgVisible">
            <img width="100%" :src="dialogImageUrl" alt="">
          </el-dialog>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
<!--        根据dialogStatus显示添加按钮或者修改按钮-->
        <el-button v-if="dialogStatus=='add'" type="primary" @click="onsubmit">添加</el-button>
        <el-button v-else type="primary" @click="onsubmitUpdate()">修改</el-button>
        <el-button @click.native="callOf('addForm')">取消</el-button>

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
  import { getToken, setToken, removeToken } from '@/utils/auth'
export default {

  name: 'nx-package-list',
  data: function () {
    return {
      listItem: {},// 存放显示详情对话框中存放的数据
      packageLists: [],// 存放从后台拿到的数据
      textMap: {//根据添加或者编辑显示相关的提示信息参数
        update: '编辑套餐',
        add: '添加套餐'
      },
      //文件上传的参数
      dialogImageUrl: '',
      dialogImgVisible: false,
      //图片列表（用于在上传组件中回显图片）

      cssStyle: {
        span: 6,// 页面布局span
        borderColor: '#fff', //页面布局边框颜色
        color: '#fff',//文字颜色
        bgText: '#2e323f'//背景颜色
      },
      dialogStatus: '',// 根据添加或者编辑显示相关的提示信息参数 显示相关信息的键值
      dialogFormVisible: false,// 控制添加或者编辑的对话框的隐藏与显示
      detailDialog: false,// 控制显示详情的对话框的隐藏与显示
      param: "",//表单要提交的参数
      src: "", //展示图片的地址
      addForm: {// 与添加或者编辑对话框显示的数据
        productId: 0,
        productName: '',
        productFee: 1,
        recommend: '',
        description: '',
        startTime: '',
        endTime: '',
        imgUrl: '',
        fileList: [{name: '', url: ''}],
        updateUser: getToken(),
      },
      addFormRules: {//添加或者编辑对话框的过滤规则
        productName: [{required: true, message: '请输入套餐名称', trigger: 'blur'}],
        productFee: [{required: true, message: '套餐资费不能小于等于0', trigger: 'blur'}],
        recommend: [{required: true, message: '请输入套餐简介', trigger: 'blur'}],
        description: [{required: true, message: '请输入套餐详细描述', trigger: 'blur'}],
        startTime: [
          {type: 'string', required: true, message: '请选择套餐的开始时间', trigger: 'blur'}
        ],
        endTime: [{type: 'string', required: true, message: '请选择套餐的结束时间', trigger: 'blur'}],
      },
      startTime: {// 设置套餐开始时间只能选择大于当前日期并且小于结束日期
        disabledDate: time => {
          if (this.addForm.endTime) {
            // return !(
            //   time.getTime() < new Date(this.addForm.endTime).getTime()&&time.getTime()>=Date.now())
            return (time.getTime() < Date.now() || time.getTime() > new Date(this.addForm.endTime).getTime());
          } else {
            // return !(time.getTime() > Date.now());
            return time.getTime() < Date.now();
          }
        }
      },
      endTime: {// 设置套餐结束时间只能选择大于当且日期并且大于套餐开始日期
        disabledDate: time => {
          if (this.addForm.startTime) {
            return time.getTime() < new Date(this.addForm.startTime).getTime()
          } else {
            return time.getTime() < Date.now();
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
    this.getPackageList()//当页面加载完毕从获取套餐列表
  },
  watch: {},
  computed: {},
  methods: {
    /**
     * 获取套餐列表，获取成功，存放数据，失败提示相关信息
     */
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

    /**
     * 设置某个套餐为首推
     * @param id {number} 套餐的id
     * @author shilongcheng
     * @date 2019-05-09
     * @constructor
     */
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
    /**
     * 删除某条套餐
     * @author shilongcheng
     * @date 2019-05-09
     * @param id {number} 套餐的id
     */
    deleteItem(id){
      this.$confirm('是否删除该套餐?', '提示', {
        type: 'warning'
      })
        .then(()=>{
          const para={id:id}
          deletePackageInfo(para).then(res=>{
            if (res.code==0){
              this.packageLists=res.data.lists
              PubSub.publish("deleted","item has been deleted");// 删除成功，使用Pubsub提示显示套餐销售数据图表更新数据
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
    /**
     * 点击添加按钮显示页面，预加载数据
     */
    handleAdd(){
      this.dialogStatus = 'add'
      this.dialogFormVisible = true
      this.addForm={
        productName: '',
        productFee: 1,
        description: '',
        startTime: '',
        endTime: '',
        fileList: [{name: '', url: ''}],
        imgUrl: '',
        recommend: '',
        updateUser:getToken()
      }
    },

    //模态框取消方法，关闭后清除提示
    callOf(form){
      this.dialogFormVisible = false;
      this.fileList=[{name: '', url: ''}],
      this.$refs[form].resetFields();
    },
    /**
     * 点击编辑按钮，显示页面，预加载数据
     * @param id {number} 套餐id
     */
    handleEdit(id){
      this.dialogStatus = 'update'
      this.dialogFormVisible = true
      for (let i=0;i<this.packageLists.length;i++){
        if (this.packageLists[i].productId==id){
          this.addForm.productId=id;
          this.addForm.productName=this.packageLists[i].productName;
          this.addForm.productFee=this.packageLists[i].productFee;
          this.addForm.description=this.packageLists[i].description;
          this.addForm.startTime=this.packageLists[i].startTime;
          this.addForm.endTime=this.packageLists[i].endTime;
          this.addForm.imgUrl=this.packageLists[i].imgUrl;
          this.addForm.recommend=this.packageLists[i].recommend;
          this.addForm.fileList=[{name: this.addForm.productName, url: this.addForm.imgUrl}];
          this.addForm.updateUser=getToken();
        }
      }
    },

    /**
     * 点击显示详情请求后台获得该条套餐信息显示数据
     * @param id {number} 套餐id
     */
    handleShowItem(id){
      const params={
        id:id
      }
      fetchPackageDetail(params)
        .then(res=>{
        if (res.code==0){
          this.listItem=res.data.item[0];
          if (this.listItem.isFirstPush==1){
            this.listItem.isFirstPush='是'//对是否首推进行数据转义
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
    /**
     * 添加套餐信息表单提交
     */

    addItem(){
      const params={
        productName:this.addForm.productName,
        productFee:this.addForm.productFee,
        startTime:this.addForm.startTime,
        endTime:this.addForm.endTime,
        description:this.addForm.description,
        imgUrl:this.addForm.imgUrl,
        updateUser:getToken(),
        recommend:this.addForm.recommend
      }
      createPackageInfo(params)
        .then(res=> {
          if (res.code == 0) {
            this.$message({
              message: '添加套餐信息成功',
              type: 'success'
            })
            this.packageLists.push(res.data);
            this.dialogFormVisible = false;
            this.addForm.productId=0
            this.addForm.productName = '';
            this.addForm.description = '';
            this.addForm.productFee = 1;
            this.addForm.startTime = '';
            this.addForm.endTime = '';
            this.addForm.recommend = '';
            this.addForm.fileList = [{name: '', url: ''}]
            this.addForm.updateUser=getToken();
            this.dialogStatus='';
            PubSub.publish("added", "item has been added");//发布信息提示表格显示进行数据刷新
            //this.$refs.upload.submit();//文件上传
          } else {
            this.$message({
              message: res.data.message,
              type: 'error'
            })
            return;
          }
        })
    },
    onsubmit() {
      this.$refs.addForm.validate((valid) => {
          if (valid) {
            this.$confirm('是否添加该套餐?', '提示', {
              type: 'warning'
            })
              .then(() => {
                if (this.addForm.fileList[0].url==''){
                  this.$message({
                    message: '套餐图片不能为空',
                    type: 'error'
                  })
                  return false;
                }
                this.$refs.upload.submit();
              })
              .catch(() => {
                this.$message({
                  message: '添加套餐信息失败',
                  type: 'error'
                })
                return;
              })
          } else {
            this.$message({
              message: '套餐信息没有完全填写',
              type: 'error'
            })
          }
        }
      )
    },
    updateItem(){
      const params={
        productId:this.addForm.productId,
        productName:this.addForm.productName,
        productFee:this.addForm.productFee,
        startTime:this.addForm.startTime,
        endTime:this.addForm.endTime,
        description:this.addForm.description,
        recommend:this.addForm.recommend,
        imgUrl:this.addForm.imgUrl,
        updateUser:getToken(),
      }
      updatePackageInfo(params)
        .then((res)=>{
          if (res.code==0){
            this.$message({
              message: '修改套餐信息成功',
              type: 'success'
            })
            console.log("---------------")
            console.log(res);
            for(let item of this.packageLists)
            {
              if (item.productId==this.addForm.productId){
                item.productName=this.addForm.productName
                item.productFee=this.addForm.productFee
                item.recommend=this.addForm.recommend
                item.description=this.addForm.description
                item.startTime=this.addForm.startTime
                item.endTime=this.addForm.endTime
                item.updateUser=getToken()
                item.updateTime=util.formatDate.format(new Date(), 'yyyy-MM-dd hh:mm:ss')
                item.imgUrl=res.data
                this.addForm.fileList = [{name: '', url: ''}]
              }
            }
            this.dialogFormVisible=false;
            this.addForm.productName='';
            this.addForm.description='';
            this.addForm.productFee=1;
            this.addForm.startTime='';
            this.addForm.endTime='';
            this.addForm.recommend='';
            this.dialogStatus='';
            PubSub.publish("updated","item has been updated");//publish服务，提示表格显示区进行数据刷新
            //this.$refs.upload.submit();//文件上传
          }
          else{
            this.$message({
              message: res.msg,
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
    },
    /**
     * 更新套餐信息
     * @param id {number} 套餐id
     */
    onsubmitUpdate(){
      this.$refs.addForm.validate((valid) => {
        if (valid){
          this.$confirm('是否更新该套餐?', '提示', {
            type: 'warning'
          }).then(()=>{
            if (this.addForm.fileList[0].url==''){
              this.$message({
                message: '套餐图片不能为空',
                type: 'error'
              })
              return false;
            }
            if (this.addForm.imgUrl==this.addForm.fileList[0].url){
              this.updateItem();

            } else{
              this.$refs.upload.submit();
            }

          })}
          else{
            this.$message({
              message: '套餐信息没有完全填写',
              type: 'error'
          })
        }
      })

    },


    //文件上传前的前的钩子函数
    //参数是上传的文件，若返回false，或返回Primary且被reject，则停止上传
    beforeUpload(file) {
      const isJPG = file.type === 'image/jpeg';
      const isGIF = file.type === 'image/gif';
      const isPNG = file.type === 'image/png';
      const isBMP = file.type === 'image/bmp';
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG && !isGIF && !isPNG && !isBMP) {
        this.$message.error('上传图片必须是JPG/GIF/PNG/BMP 格式!');
      }
      if (!isLt2M) {
        this.$message.error('上传图片大小不能超过 2MB!');
      }
      return (isJPG || isBMP || isGIF || isPNG) && isLt2M;
    },
    //上传的文件个数超出设定时触发的函数
    onExceed(files, fileList) {
      this.$message({
        type: 'info',
        message: '最多只能上传一个图片',
        duration: 6000
      });
    },
    //点击列表中已上传的文件事的钩子函数
    handlePreview(file) {
    },
    handleChanged(file,fileList){
      this.addForm.fileList[0].url="modified"
    },
    //删除文件之前的钩子函数
    handleRemove(file, fileList) {
      this.$message({
        type: 'info',
        message: '已删除原有图片',
        duration: 6000
      });
      this.addForm.fileList[0].url=''
    },
    //文件上传成功的钩子函数
    handleSuccess(res, file) {
      this.$message({
        type: 'info',
        message: '图片上传成功',
        duration: 6000
      });
      // if (res.code==0){
      //   this.addForm.img=file.response.message;
      // }
      this.addForm.imgUrl=res.data;
      if (this.dialogStatus=='add'){
        this.addItem();
      }
      else if (this.dialogStatus=='update'){
        this.updateItem();
      }
    },



  }
}
</script>

<style lang="scss" scoped>
  @import '../../../styles/data-card.scss';
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

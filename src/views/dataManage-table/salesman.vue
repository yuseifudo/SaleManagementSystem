<!--
  功能：销售人员列表增删改查，热度筛选
  作者：李娜容
  日期：2019/5/6

-->
<template>
  <section class="app-container">
    <!--工具条-->
    <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
      <el-form :inline="true" :model="filters" @submit.native.prevent>
        <el-form-item>
          <el-input v-model="filters.saleName" placeholder="请输入姓名"></el-input>
        </el-form-item>
        <el-form-item>
          <el-input v-model="filters.saleId" placeholder="请输入编号"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" v-on:click="getSalesman">查询</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleAdd">新增</el-button>
        </el-form-item>
        <el-button type="danger" @click="batchRemove" :disabled="this.sels.length===0">批量删除</el-button>
      </el-form>
    </el-col>

    <!--列表-->
    <el-table :data="salesmanList" highlight-current-row @selection-change="selsChange" style="width: 100%;">
      <el-table-column type="selection" width="55">
      <!--</el-table-column >-->
      <!--<el-table-column type="index" label="序号" width="60"  >-->
      </el-table-column>
      <el-table-column prop="saleId" label="编号" width="80" sortable >
      </el-table-column>
      <el-table-column prop="saleName" label="姓名" width="100" align="center">
      </el-table-column>
      <el-table-column prop="saleSex" label="性别" width="80" :formatter="formatSex" align="center">
      </el-table-column>
      <el-table-column prop="saleTelNum" label="联系号码" width="160" align="center">
      </el-table-column>
      <el-table-column prop="saleProductNum" label="销售套餐总数" width="200" sortable align="center"
                       :filters="[{ text: '销售高手', value: '100' }, { text: '销售精英', value: '200' }]"
                       :filter-method="filtercount">

        <template slot-scope="scope">
          <el-tag
            :type="scope.row.saleProductNum >=   50 ? 'danger' : scope.row.saleProductNum <=20 ? 'success':'warning'"
            disable-transitions>{{scope.row.saleProductNum}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="saleTotalPrice" label="销售总额" width="200" sortable align="center"
                       :filters="[{ text: '赚钱小能手', value: '7000' }, { text: '赚钱担当', value: '15000' }]"
                       :filter-method="filtertotals"
                       filter-placement="bottom-end">
          <template slot-scope="scope">
            <el-tag
              :type="scope.row.saleTotalPrice >= 2000 ? 'danger' : scope.row.saleTotalPrice <=1000 ? 'success':'warning'"
              disable-transitions>{{scope.row.saleTotalPrice}}</el-tag>
          </template>
      </el-table-column>
      <!--<el-table-column prop="commision" label="已获取佣金" width="100" align="center">-->
      <!--</el-table-column>-->
      <el-table-column label="操作" width="240" align="center">
        <template slot-scope="scope">
          <el-button type="primary" size="small" @click="handleDetail(scope.$index, scope.row)">查看</el-button>
          <el-button type="success" size="small" @click="handleEdit(scope.$index, scope.row)">更改</el-button>
          <el-button type="danger" size="small" @click="handleDel(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!--工具条-->
    <el-col :span="24" class="toolbar">
,
    <el-pagination layout="prev, pager, next" @current-change="handleCurrentChange" :page-size="20" :total="total" style="float:right;">
    </el-pagination>
    </el-col>


    <!--查看界面-->
    <el-dialog title="销售人员详情信息" :visible.sync="detailFormVisible" :close-on-click-modal="false" >
      <el-form :model="detailForm" label-width="130px" ref="detailForm" style="padding-left: 20px">
        <el-form-item label="姓名" prop="saleName" style="width:300px">
          <el-input v-model="detailForm.saleName" auto-complete="off"  readonly=”readonly”></el-input>
        </el-form-item>
      <el-row>
        <el-col :span="12">
          <el-form-item label="性别" >
            <el-radio-group v-model="detailForm.saleSex" >
              <el-radio class="radio" :label=0  :disabled="true" >男</el-radio>
              <el-radio class="radio" :label=1 :disabled="true">女</el-radio>
            </el-radio-group>
          </el-form-item>

        </el-col>
        <!--<el-col :span="12">-->
          <!--<el-form-item label="获得佣金" prop="commision" style="width: 300px">-->
            <!--<el-input v-model="detailForm.commision" readonly=”readonly”></el-input>-->
          <!--</el-form-item>-->

        <!--</el-col>-->
      </el-row>
        <el-row>
          <el-col :span="12">
        <el-form-item label="员工编号" prop="saleId" style="width:300px">
          <el-input v-model="detailForm.saleId" auto-complete="off" readonly=”readonly”></el-input>
        </el-form-item>
          </el-col>
          <el-col :span="12">
        <el-form-item label="联系电话" prop="saleTelNum" style="width:300px">
          <el-input v-model="detailForm.saleTelNum" readonly=”readonly”></el-input>
        </el-form-item>
          </el-col>

        </el-row>

        <el-row>
          <el-col :span="12">
        <el-form-item label="销售套餐总数" prop="saleProductNum" style="width:300px">
          <el-input v-model="detailForm.saleProductNum" readonly=”readonly”></el-input>
        </el-form-item>
          </el-col>
          <el-col :span="12">
        <el-form-item label="销售总金额" prop="saleTotalPrice" style="width:300px">
          <el-input v-model="detailForm.saleTotalPrice" readonly=”readonly”></el-input>
        </el-form-item>
          </el-col>
        </el-row>

        <!--<el-row>-->
          <!--<el-col :span="12">-->
            <!--<el-form-item label="个人天王卡销量" prop="count1" style="width: 180px">-->
              <!--<el-input v-model="detailForm.count1" readonly=”readonly”></el-input>-->
            <!--</el-form-item>-->
          <!--</el-col>-->
          <!--<el-col :span="12">-->
            <!--<el-form-item label="个人地王卡销量" prop="count2" style="width: 180px">-->
              <!--<el-input v-model="detailForm.count2" readonly=”readonly”></el-input>-->
            <!--</el-form-item>-->
          <!--</el-col>-->
        <!--</el-row>-->
        <!--<el-row>-->
          <!--<el-col :span="12">-->
            <!--<el-form-item label="个人大冰神卡销量" prop="count3" style="width: 180px">-->
              <!--<el-input v-model="detailForm.count3" readonly=”readonly”></el-input>-->
            <!--</el-form-item>-->
          <!--</el-col>-->
          <!--<el-col :span="12">-->
            <!--<el-form-item label="个人小冰神卡销量" prop="count4" style="width: 180px">-->
              <!--<el-input v-model="detailForm.count4" readonly=”readonly”></el-input>-->
            <!--</el-form-item>-->
          <!--</el-col>-->
        <!--</el-row>-->
      </el-form>
      <div class="saleschart">
        <chart height='70%' width="100%"></chart>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="detailFormVisible = false">关闭</el-button>
      </div>
    </el-dialog>
    <!--编辑界面和新增加界面-->
    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible" @close="callOf('editForm')">
    <el-form :model="editForm" label-width="100px" :rules="editFormRules" ref="editForm" style="padding-left: 50px">
    <el-form-item label="姓名" prop="saleName" style="width: 600px">
      <el-input v-model="editForm.saleName" auto-complete="off"></el-input>
    </el-form-item>
    <el-form-item label="性别" >
        <el-radio-group v-model="editForm.saleSex">
          <el-radio class="radio" :label=1>男</el-radio>
          <el-radio class="radio" :label=0>女</el-radio>
        </el-radio-group>
      </el-form-item>
    <el-form-item label="员工编号" prop="saleId" style="width: 600px">
       <el-input v-model="editForm.saleId" auto-complete="off"></el-input>
    </el-form-item>
    <el-form-item label="联系电话" prop="saleTelNum" style="width: 600px">
        <el-input v-model="editForm.saleTelNum"></el-input>
    </el-form-item>
    <el-form-item v-if="dialogStatus=='update'" label="销售套餐总数" prop="saleProductNum" style="width: 600px">
        <el-input v-model="editForm.saleProductNum"></el-input>
    </el-form-item>
    <el-form-item v-if="dialogStatus=='update'"label="销售总金额" prop="saleTotalPrice" style="width: 600px">
        <el-input v-model="editForm.saleTotalPrice"></el-input>
    </el-form-item>
    <!--<el-form-item label="获得佣金" prop="commision" style="width: 600px">-->
        <!--<el-input v-model="editForm.commision"></el-input>-->
    <!--</el-form-item>-->

    </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="callOf('editForm')">取消</el-button>
        <el-button v-if="dialogStatus=='create'" type="primary" @click="createData">添加</el-button>
        <el-button v-else type="primary" @click="updateData">修改</el-button>
      </div>
    </el-dialog>

  </section>
</template>

<script>

  import {
    getSalesmanListPage,
    removeSalesman,
    batchRemoveSalesman,
    editSalesman,
    addSalesman
  } from '@/api/salesmanT'
  //销售人员图表
  import Chart from '@/components/sales-chart/saleschart'


  export default {
    components:{Chart},
    data() {
      return {
        dialogStatus: '',
        textMap: {
          update: '编辑销售人员信息',
          create: '增添销售人员信息',
        },
        dialogFormVisible: false,
        detailFormVisible: false,//详情界面是否显示
        filters: {
          saleName: '',
          saleId:''
        },
        salesmanList: [],
        total: 0,
        page: 1,
        sels: [], // 列表选中列
        editFormRules: {
          saleName: [{ required: true, message: '请输入姓名', trigger: 'blur' }],
          saleTelNum: [{ required: true, message: '请输入联系电话', trigger: 'blur' }],
          saleId: [{ required: true, message: '请输入员工编号', trigger: 'blur' }],
        },

        // 编辑界面数据
        editForm: {
          id: '',
          saleId:'',
          saleName: '',
          saleTelNum:'',
          saleSex: 1,
          saleProductNum:"",
          saleTotalPrice:'',
          commision:''
        },
        //详情界面数据
        detailForm: {
          id: '0',
          saleId:'',
          saleName: '',
          saleTelNum:'',
          saleSex: 1,
          saleProductNum:'',
          saleTotalPrice:'',
          commision:'',
          count1:'',
          count2:'',
          count3:'',
          count4:''
        },

        addFormVisible: false, // 新增界面是否显示
        addFormRules: {
          saleName: [{ required: true, message: '请输入姓名', trigger: 'blur' }]
        }
      }
    },
    methods: {
      //模态框取消方法，关闭后清除提示
      callOf(editForm){
        this.dialogFormVisible = false;
        this.$refs[editForm].resetFields();
      },

      //销售总数筛选方法
      filtercount(value,row){
        if(value==100)
          return row.saleProductNum>100 && row.saleProductNum<=2000;
        if(value==200)
          return row.saleProductNum>=50;
      },
      //销售总额筛选方法
      filtertotals(value,row){
        if(value==7000)
          return row.saleTotalPrice>7000 && row.saleTotalPrice<=15000;
        if(value==15000)
          return row.saleTotalPrice>=15000;
      },
      // 性别显示转换
      formatSex: function(row, column) {
        return row.saleSex == 1 ? '女' : row.saleSex == 0 ? '男' : '未知'
      },
      handleCurrentChange(val) {
        this.page = val
        this.getSalesman()
      },
      // 获取用户列表
      getSalesman() {
        const para = {
          page: this.page,
          saleName: this.filters.saleName,
          saleId: this.filters.saleId,
        }
        getSalesmanListPage(para).then(res => {
          console.log(res)
          this.total = res.data.total;
          this.salesmanList = res.data.list
        })


      },
        // 删除
        handleDel(index, row) {
          this.$confirm('确认删除该记录吗?', '提示', {
            type: 'warning'
          })
            .then(() => {
              const para = { saleId: row.saleId }
              removeSalesman(para).then(res => {
                if (res.code==0){
                  this.$message({
                    message: '删除成功',
                    type: 'success'
                  })
                  this.getSalesman()
                }
              })
            })
            .catch(() => {})
        },

        // 显示详情界面
        handleDetail(index, row) {
          this.detailFormVisible = true
          this.detailForm = Object.assign({}, row)
        },

        // 显示编辑界面
        handleEdit(index, row) {
          this.dialogStatus = 'update'
          this.dialogFormVisible = true
          this.editForm = Object.assign({}, row)
        },
        // 显示新增界面
        handleAdd() {
          this.dialogStatus = 'create'
          this.dialogFormVisible = true
          this.editForm = {
            saleId: '0',
            saleName: '',
            saleSex: 1,

          }
        },
        // 编辑
        updateData() {
          this.$refs.editForm.validate(valid => {
            if (valid) {
              this.$confirm('确认提交吗？', '提示', {})
                .then(() => {
                  const para = Object.assign({}, this.editForm)
                  para.birth =
                    !para.birth || para.birth === ''
                      ? ''
                      : util.formatDate.format(new Date(para.birth), 'yyyy-MM-dd')
                  editSalesman(para).then(res => {
                    if (res.code==0){
                    this.$message({
                      message: '提交成功',
                      type: 'success'
                    })
                    }
                    this.$refs['editForm'].resetFields()
                    this.dialogFormVisible = false
                    this.getSalesman()
                  })
                })
                .catch(e => {
                  // 打印一下错误
                  console.log(e)
                })
            }
          })
        },
        // 新增
        createData: function() {
          this.$refs.editForm.validate(valid => {
            if (valid) {
              this.$confirm('确认提交吗？', '提示', {})
                .then(() => {
                  this.editForm.id = (parseInt(Math.random() * 100)).toString() // mock a id
                  const para = Object.assign({}, this.editForm)
                  console.log(para)

                  // para.birth =
                  //   !para.birth || para.birth === ''
                  //     ? ''
                  //     : util.formatDate.format(new Date(para.birth), 'yyyy-MM-dd')
                  addSalesman(para).then(res => {
                    if (res.code==0){
                    this.$message({
                      message: '提交成功',
                      type: 'success'
                    })
                    }
                    this.$refs['editForm'].resetFields()
                    this.dialogFormVisible = false
                    this.filters.saleId=''
                    this.filters.saleName=''
                    this.getSalesman()
                  })
                })
                .catch(e => {
                  // 打印一下错误
                  console.log(e)
                })
            }
          })
        },
        // 全选单选多选
      selsChange(sels) {
        this.sels = sels
      },
      //  批量删除
        batchRemove() {
          var list = this.sels.map(item => item.saleId).toString()
          this.$confirm('确认删除选中记录吗？', '提示', {
            type: 'warning'
          })
            .then(() => {
              const para = { list: list }
              batchRemoveSalesman(para).then(res => {
                if (res.code==0) {
                this.$message({
                  message: '删除成功',
                  type: 'success'
                })
                }
                if ((this.salesmanList.length-this.sels.length)==0){
                  if (this.page!=1) {
                  this.page=this.page-1
                  }
                }
                this.getSalesman()
              })
            })
            .catch(() => {})
        }
    },
    mounted() {
      this.getSalesman()
    }
  }
</script>

<style scoped>
  .saleschart{
    position: relative;
    padding-top: 20px;
    width: 100%;
    height:400px;
    /*border: 1px solid black;*/
  }
</style>

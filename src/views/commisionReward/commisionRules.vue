<!--
功能：完成套餐详情展示以及套餐列表正删改
日期：2019、05、05
作者：吴丽娟
-->

//设置表格样式
<style>
  .el-table .warning-row {
    background: oldlace;
  }

  .el-table .success-row {
    background: #f0f9eb;
  }
</style>
<template>
  <section class="app-container">
    <!--工具条-->
    <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
      <el-form :inline="true" :model="filters" @submit.native.prevent>
        <el-form-item>
          <el-input v-model="filters.name" placeholder="套餐名称"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" v-on:click="getTaocans">查询</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleAdd">新增</el-button>
        </el-form-item>
      </el-form>
    </el-col>

    <!--列表-->
    <el-table :data="list" highlight-current-row @selection-change="selsChange" style="width: 100%;
    margin-bottom: 10px;" :row-class-name="tableRowClassName">
      <el-table-column type="selection" width="55">
      </el-table-column>
      <el-table-column type="index" label='编号'  prop="id" width="55">
      </el-table-column>
      <el-table-column type="text" label="套餐名称"  prop="name" width="100">
      </el-table-column>
      <el-table-column type="text" label="套餐类型" prop="taocantype.typeName" width="120">
      </el-table-column>
      <el-table-column type="num"  label="套餐价格(元)"   prop="price" sortable width="140">
      </el-table-column>
      <el-table-column type="num"  label="佣金(元)"   prop="commision" sortable width="100">
      </el-table-column>
      <el-table-column type="text" label="月通话时长（分钟）" prop="time" sortable width="180">
      </el-table-column>
      <el-table-column type="text" label="月上网流量（MB）"  prop="flow" sortable>
      </el-table-column>
      </el-table-column>
      <el-table-column label="操作" >
        <template slot-scope="scope">
          <el-button size="small" @click="handleUpdate(scope.$index, scope.row)">编辑</el-button>
          <el-button type="danger" size="small" @click="handleDel(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!--工具条-->
    <el-col :span="24" class="toolbar">
      <el-button type="danger" @click="batchRemoveTaocan" :disabled="this.sels.length===0">批量删除</el-button>

      <el-pagination layout="total,sizes, prev, pager, next,jumper" @current-change="handleCurrentChange" :current-page.sync="currentPage" :page-size="pageSize"
        @size-change="handleSizeChange"  :page-sizes="[5,10, 20, 30]"  :total="total" style="float:right;" background>
      </el-pagination>
    </el-col>

    <!--编辑界面-->
    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible" :close-on-click-modal="false">
      <el-form :model="editForm" label-width="80px" :rules="rules" ref="editForm">
        <el-form-item label="套餐名称" prop="name">
          <el-input v-model="editForm.name" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="套餐类型" >
          <el-select v-model="editForm.taocantype"  placeholder="请选择" >
            <el-option v-for="type in taocans" :key="type.id" :label="type.typeName" :value="type.id"></el-option>
          </el-select>
        </el-form-item>
        </el-form-item>
        <el-form-item label="套餐价格" >
          <el-input v-model="editForm.price" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="套餐佣金" >
          <el-input v-model="editForm.commision" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="月通话时长" >
          <el-input v-model="editForm.time" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="月上网流量" >
          <el-input v-model="editForm.flow" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>

      <!--编辑界面按钮-->
      <div slot="footer" class="dialog-footer">
        <el-button @click.native="dialogFormVisible=false">取消</el-button>
        <el-button v-if="dialogStatus=='create'" type="primary" @click="createData">添加</el-button>
        <el-button v-else type="primary" @click="updateData">修改</el-button>
      </div>
    </el-dialog>
  </section>
</template>

<script>
  import {
    getTaocanList,
    removeTaocan,
    batchRemove,
    editTaocan,
    addTaocan
  } from '@/api/taocanTable'

  export default {
    data() {
      return {
        taocans:[
          {id:1,typeName:'全国套餐'},{id:2,typeName:'本地套餐'},{id:3,typeName:'校园套餐'},{id:4,typeName:'智慧沃家'}
        ],
        dialogStatus: '',
        textMap: {
          update: 'Edit',
          create: 'Create'
        },
        dialogFormVisible: false,
        filters: {
          name: ''
        },
        taocantype:[],
        list:[],
        pageSize:10,
        currentPage:1,
        total: 0,
        sels: [], // 列表选中列
        rules: {
          name: [{ required: true, message: '请输入套餐名称', trigger: 'blur' ,type: 'string'}]
        },

        // 编辑界面数据
        editForm: {
          id: '0',
          name: '',
          taocantype: '',
          commision:'',
          price: '',
          time: '',
          flow: '',
        },

        addFormVisible: false, // 新增界面是否显示
        addFormRules: {
          name: [{ required: true, message: '请输入套餐名称', trigger: 'blur',type: 'string' }]
        }
      }
    },

    methods: {

      // 获取套餐列表
      getTaocans() {
        const para = {
          currentPage: this.currentPage,
          name: this.filters.name,
          pageSize:this.pageSize
        }
        getTaocanList(para).then(res => {
          this.total = res.data.total
          this.list = res.data.taocanlist

        })
      },

      //设置表格样式
      tableRowClassName({row, rowIndex}) {
        if (rowIndex%2 === 1) {
          return 'warning-row';
        }
        return '';
      },

      //改变页面条目数量
      handleSizeChange(pageSize) {
        this.pageSize = pageSize
        this.handleCurrentChange(this.currentPage)
      },

      //跳转页面
      handleCurrentChange(currentPage) {
        this.currentPage = currentPage
        this.currentChangePage(this.list,currentPage)
        this.getTaocans()
      },


      //分页方法
      currentChangePage(list,currentPage){
        let from=(currentPage-1)*this.pageSize;
        let to=currentPage*this.pageSize;
        this.list=[];
        for(;from<to;from++){
          if(list[from]){
            this.list.push(list[from]);
          }
        }
        //this.currentChangePage(this.list,currentPage)
        //console.log(this.list)
      },

      // 显示编辑界面
      handleUpdate(index, row) {
        this.dialogStatus = 'update'
        this.dialogFormVisible = true
        this.editForm = Object.assign({}, row)
        this.editForm.taocantype=this.editForm.taocantype.id
      },

      // 显示新增界面
      handleAdd() {
        this.dialogStatus = 'create'
        this.dialogFormVisible = true
        this.editForm = {
          id: '0',
          name: '',
          taocantype: '',
          commision:'',
          price: '',
          time: '',
          flow: '',
        }
      },

      // 编辑
      updateData() {
        this.$refs.editForm.validate(valid => {
          if (valid) {
            this.$confirm('确认提交吗？', '提示', {})
              .then(() => {
                const para = Object.assign({}, this.editForm)
                editTaocan(para).then(res => {
                  this.$message({
                    message: '提交成功',
                    type: 'success'
                  })
                  this.$refs['editForm'].resetFields()
                  this.dialogFormVisible = false
                  this.getTaocans()
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
                console.log(para.toString()+"xinzen")
                //console.log(para)
                /*
                                para.birth =
                                  !para.birth || para.birth === ''
                                    ? ''
                                    : util.formatDate.format(new Date(para.birth), 'yyyy-MM-dd')*/
                addTaocan(para).then(res => {
                  this.$message({
                    message: '提交成功',
                    type: 'success'
                  })
                  this.$refs['editForm'].resetFields()
                  this.dialogFormVisible = false
                  this.getTaocans()
                  console.log(res + 'res')
                })
              })
              .catch(e => {
                // 打印一下错误
                console.log(e)
              })
          }
        })
        this.filters.name=''
      },

      // 全选单选多选
      selsChange(sels) {
        this.sels = sels
      },

      // 删除
      handleDel(index, row) {
        this.$confirm('确认删除该记录吗?', '提示', {
          type: 'warning'
        })
          .then(() => {
            const para = { id: row.id }
            removeTaocan(para).then(res => {
              this.$message({
                message: '删除成功',
                type: 'success'
              })
              this.getTaocans()
            })
          })
          .catch(() => {})
      },

      // 批量删除
      batchRemoveTaocan() {
        let ids = this.sels.map(item => item.id).toString()

        this.$confirm('确认删除选中记录吗？', '提示', {
          type: 'warning'
        })
          .then(() => {
            const para = { ids: ids }
            batchRemove(para).then(res => {
              this.$message({
                message: '删除成功',
                type: 'success'
              })
              this.getTaocans()
            })
          })
          .catch(() => {})
      }
    },
    mounted() {
      this.getTaocans()

    },
  }
</script>

<style scoped>

</style>


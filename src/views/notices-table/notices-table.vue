<!--
作者：杨昌海
时间：2019.05.06
功能：公告信息显示页面
-->
<template>
  <section class="app-container">
    <!--工具条-->
    <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
      <el-form :inline="true" :model="filters" @submit.native.prevent style="text-align: center">
        <el-form-item>
          <el-input v-model="filters.title" placeholder="请输入公告标题"></el-input>
        </el-form-item>
        <el-form-item>
          <el-input v-model="filters.createDate" placeholder="请输入公告日期"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" v-on:click="getNotice">查询公告</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleAdd">发布新公告</el-button>
        </el-form-item>
      </el-form>
    </el-col>

    <!--列表-->
    <el-table :data="notices" highlight-current-row @selection-change="selsChange"
              :default-sort="{prop: 'createDate', order: 'descending'}"
              style="width: 100%;" align="center">
      <el-table-column type="selection" width="55">
      </el-table-column>
      <el-table-column prop="num" label="编号" width="60" header-align="center">
      </el-table-column>
      <el-table-column prop="title" label="公告标题" width="150" header-align="center">
      </el-table-column>
      <el-table-column prop="content" label="公告内容" width="480" header-align="center">
      </el-table-column>
      <el-table-column prop="createDate" label="发布/更新时间" width="150" header-align="center" sortable>
      </el-table-column>
      <el-table-column label="操作" width="180" header-align="center">
        <template slot-scope="scope">
          <el-button size="small" @click="handleEdit(scope.$index, scope.row)">重新编辑</el-button>
          <el-button type="danger" size="small" @click="handleDel(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!--工具条-->
    <el-col :span="24" class="toolbar">
      <el-button type="danger" @click="batchRemove" :disabled="this.sels.length===0">删除所选</el-button>
      <el-pagination layout="prev, pager, next" @current-change="handleCurrentChange" :page-size="10" :total="total"
                     style="float:right;">
      </el-pagination>
    </el-col>

    <!--编辑界面-->
    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible"
               :close-on-click-modal="false" center>

      <el-form :model="editForm" label-width="80px" :rules="editFormRules" ref="editForm">
        <el-form-item label="公告标题" prop="title">
          <el-input v-model="editForm.title" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="公告内容" prop="content">
          <el-input type="textarea" v-model="editForm.content"></el-input>
        </el-form-item>
      </el-form>
      <!--<div style="height: 300px" v-if="dialogStatus=='update'">-->
        <!--<h4>图表展示</h4>-->
        <!--<bar style="height: 300px;width: 100%"></bar>-->
      <!--</div>-->
      <div slot="footer" class="dialog-footer">
        <el-button @click="callOf('editForm')">取消</el-button>
        <el-button v-if="dialogStatus=='create'" type="primary" @click="createData">确认发布</el-button>
        <el-button v-else type="primary" @click="updateData">确认修改</el-button>
      </div>
    </el-dialog>
  </section>
</template>

<script>
  import util from '@/utils/table.js'
  import {
    getNoticeListPage,
    removeNotice,
    batchRemoveNotice,
    editNotice,
    addNotice
  } from '@/api/noticesT'

  export default {
    data() {
      return {
        dialogStatus: '',
        textMap: {
          update: '编辑公告',
          create: '发布公告'
        },
        dialogFormVisible: false,
        filters: {
          title: '',
          createDate: '',
        },
        notices: [],
        total: 0,
        page: 1,
        sels: [], // 列表选中列
        editFormRules: {
          title: [
            { required: true, message: '请输入公告标题', trigger: 'blur'}
          ],
          content: [
            { required: true, message: '请输入公告内容', trigger: 'blur'}
          ]
        },
        // 编辑界面数据
        editForm: {
          id: '0',
          num: '',
          title: '',
          content: '',
          createDate: ''
        },

        addFormVisible: false, // 新增公告界面是否显示
        // addFormRules: {
        //   title: [{required: true, message: '请输入公告标题', trigger: 'blur'}],
        //   content: [{required: true, message: '请输入公告内容', trigger: 'blur'}]
        // }
      }
    },
    methods: {
      //模态框取消方法，关闭后清除提示
      callOf(editForm){
        this.dialogFormVisible = false;
        this.$refs[editForm].resetFields();
      },
      handleCurrentChange(val) {
        this.page = val
        this.getNotice()
      },
      // 获取公告列表
      getNotice() {
        const para = {
          page: this.page,
          title: this.filters.title,
          createDate: this.filters.createDate
        }


        getNoticeListPage(para).then(res => {
          this.total = res.data.total
          this.notices = res.data.notices
          console.log(this.notices)
        })
        if(this.filters.title==''&&this.filters.createDate==''){
          console.log("0000")
        }
      },
      // 删除
      handleDel(index, row) {
        this.$confirm('确认删除该记录吗?', '提示', {
          type: 'warning'
        })
          .then(() => {
            const para = {id: row.id}
            removeNotice(para).then(res => {
              this.$message({
                message: '删除成功',
                type: 'success'
              })
              this.getNotice()
            })
          })
          .catch(() => {
          })
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
          id: '0',
          num: '',
          title: '',
          content: ''

        }
      },
      // 编辑
      updateData() {
        this.$refs.editForm.validate(valid => {
          if (valid) {
            this.$confirm('确认提交吗？', '提示', {})
              .then(() => {
                this.editForm.createDate = util.formatDate.format(new Date(), 'yyyy-MM-dd-hh:mm')
                const para = Object.assign({}, this.editForm)
                //para是一个对象
                para.content = para.content.replace(/(\r\n|\n|\r|)/gm, "\\r")
                // para.content= para.content.replace(/' '/gm, "&nbsp;")
                console.log(para)
                editNotice(para).then(res => {
                  this.$message({
                    message: '编辑成功',
                    type: 'success'
                  })
                  this.$refs['editForm'].resetFields()
                  this.dialogFormVisible = false
                  this.getNotice()
                })
              })
              .catch(e => {
                // 打印一下错误
                console.log(e)
              })
          }
        })

      },
      // 新增公告
      createData: function () {
        this.$refs.editForm.validate(valid => {
          if (valid) {
            this.$confirm('确认提交吗？', '提示', {})
              .then(() => {
                this.editForm.id = (parseInt(Math.random() * 100)).toString() // mock a id
                this.editForm.createDate = util.formatDate.format(new Date(), 'yyyy-MM-dd-hh:mm')
                const para = Object.assign({}, this.editForm)
                para.content = para.content.replace(/(\r\n|\n|\r)/gm, "\\r")
                console.log(para)
                addNotice(para).then(res => {
                  this.$message({
                    message: '提交成功',
                    type: 'success'
                  })
                  this.$refs['editForm'].resetFields()
                  this.dialogFormVisible = false
                  this.getNotice()
                })
              })
              .catch(e => {
                // 打印一下错误
                console.log(e)
              })
          }
        })
        this.filters.title = ''
        // this.getNotice()
      },
      // 全选单选多选
      selsChange(sels) {
        this.sels = sels
      },
      // 批量删除
      batchRemove() {
        var ids = this.sels.map(item => item.id).toString()
        this.$confirm('确认删除选中记录吗？', '提示', {
          type: 'warning'
        })
          .then(() => {
            const para = {ids: ids}
            batchRemoveNotice(para).then(res => {
              this.$message({
                message: '删除成功',
                type: 'success'
              })
              this.getNotice()
            })
          })
          .catch(() => {
          })
      }
    },
    mounted() {
      this.getNotice()
    }
  }
</script>

<style scoped>

</style>

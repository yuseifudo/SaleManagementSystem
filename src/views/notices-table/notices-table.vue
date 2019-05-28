<template>
  <section class="app-container">
    <!--工具条-->
    <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
      <el-form :inline="true" :model="filters" @submit.native.prevent style="text-align: center">
        <el-form-item>
          <el-input v-model="filters.noticeTitle" placeholder="请输入公告标题" width="200px">

          </el-input>

        </el-form-item>
        <el-form-item>


          <el-input v-model="filters.updateTime" placeholder="请输入公告日期" width="200px"></el-input>

        </el-form-item>
        <el-form-item>
          <el-button type="primary" v-on:click="getNotice">查询公告</el-button>
        </el-form-item>
        <el-form-item>

          <el-button type="primary" @click="handleAdd">发布公告</el-button>
        </el-form-item>
      </el-form>
    </el-col>

    <!--列表-->
    <el-table :data="notices" highlight-current-row @selection-change="selsChange"
              :default-sort="{prop: 'updateTime', order: 'descending'}"
              style="width: 100%;" align="center">
      <el-table-column type="selection" width="55">
      </el-table-column>
      <el-table-column type="index" label="编号" width="60" header-align="center">
      </el-table-column>
      <el-table-column prop="noticeTitle" label="公告标题" width="150" align="center" :show-overflow-tooltip="true">
      </el-table-column>
      <el-table-column prop="noticeContent" label="公告内容" width="400"  height="100px" header-align="center" :show-overflow-tooltip="true">
      </el-table-column>
      <el-table-column prop="updateTime" label="发布/更新时间" width="150"  header-align="center" align="center" sortable>
      </el-table-column>
      <el-table-column prop="updateUser" label="发布人" width="150" header-align="center" align="center" sortable>
      </el-table-column>
      <el-table-column label="操作" width="180" header-align="center">
        <template slot-scope="scope">
          <el-button type="success" size="small" @click="handleEdit(scope.$index, scope.row)">重新编辑</el-button>
          <el-button type="danger" size="small" @click="handleDel(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination background layout="prev, pager, next" @current-change="handleCurrentChange" :page-size="10"
                   :total="total" style="float:right;">
    </el-pagination>
    <!--工具条-->
    <el-col :span="24" class="toolbar">
      <el-button type="danger" @click="batchRemove" :disabled="this.sels.length===0">删除所选</el-button>
    </el-col>

    <!--编辑界面-->
    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible"
               center @close="callOf('editForm')">

      <el-form :model="editForm" label-width="80px" :rules="editFormRules" ref="editForm">
        <el-form-item label="公告标题" prop="noticeTitle">
          <el-input v-model="editForm.noticeTitle" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="公告内容" prop="noticeContent">
          <el-input type="textarea" v-model="editForm.noticeContent" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>

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
  import {getToken, setToken, removeToken} from '@/utils/auth'
  import admin from "../../mock/admin";

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
          noticeTitle: '',
          updateTime: ''
        },
        notices: [],
        total: 0,
        page: 1,
        sels: [], // 列表选中列
        editFormRules: {
          noticeTitle: [{required: true, message: '请输入公告标题', trigger: 'blur'}],
          noticeContent: [{required: true, message: '请输入公告内容', trigger: 'blur'}]
        },
        // 编辑界面数据
        editForm: {
          noticeId: '',
          noticeTitle: '',
          noticeContent: '',
          // updateTime:util.formatDate.format(new Date(),'yyyy-MM-dd'),
          updateTime: '',
          updateUser: getToken()
        },

        addFormVisible: false// 新增公告界面是否显示

        // addFormRules: {
        //   name: [{ required: true, message: '请输入姓名', trigger: 'blur' }]
        // }

      }
    },
    methods: {
      //模态框取消方法，关闭后清除提示
      callOf(editForm) {
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
          noticeTitle: this.filters.noticeTitle,
          updateTime: this.filters.updateTime,
        }
        getNoticeListPage(para).then(res => {
          this.total = res.data.total
          this.notices = res.data.list
        })
      },
      // 删除
      handleDel(index, row) {
        this.$confirm('确认删除该记录吗?', '提示', {
          type: 'warning'
        })
          .then(() => {
            const para = {noticeId: row.noticeId}
            removeNotice(para).then(res => {
              this.$message({
                message: '删除成功',
                type: 'success'
              })
              if ((this.notices.length - 1) == 0) {
                this.page = this.page - 1
              }
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
          noticeTitle: '',
          noticeContent: '',
          updateTime: '',
          updateUser: getToken()

        }
      },
      // 编辑
      updateData() {
        this.$refs.editForm.validate(valid => {
          if (valid) {
            this.$confirm('确认提交吗？', '提示', {})
              .then(() => {
                this.editForm.updateTime = util.formatDate.format(new Date(), 'yyyy-MM-dd')
                this.editForm.updateUser = getToken()
                // console.log(this.editForm.updateTime)
                const para = Object.assign({}, this.editForm)
                //para是一个对象
                para.noticeContent = para.noticeContent.replace(/(\r\n|\n|\r)/gm, "\\r")

                const params = {
                  noticeId: this.editForm.noticeId,
                  updateTime: this.editForm.updateTime,
                  noticeTitle: this.editForm.noticeTitle,
                  noticeContent: this.editForm.noticeContent,
                  updateUser: getToken()

                }
                editNotice(params).then(res => {
                  if (res.code == 0) {
                    this.$message({
                      message: '编辑成功',
                      type: 'success'
                    })
                    this.$refs['editForm'].resetFields()
                    this.dialogFormVisible = false
                  }
                  this.getNotice()
                  console.log("res===" + res.code)
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
                // this.editForm.id = (parseInt(Math.random() * 100)).toString() // mock a id
                this.editForm.updateTime = util.formatDate.format(new Date(), 'yyyy-MM-dd')
                // this.editForm.updateUser=getToken()
                const para = Object.assign({}, this.editForm)
                para.noticeContent = para.noticeContent.replace(/(\r\n|\n|\r)/gm, "\\r")


                const params = {
                  updateTime: this.editForm.updateTime,
                  noticeTitle: this.editForm.noticeTitle,
                  noticeContent: this.editForm.noticeContent,
                  updateUser: getToken()

                }

                addNotice(params).then(res => {
                  if (res.code == 0) {
                    this.$message({
                      message: '发布成功',
                      type: 'success'
                    })
                    this.$refs['editForm'].resetFields()
                    this.dialogFormVisible = false
                  }else {
                    this.$message({
                      message: '发布失败',
                      type: 'error'
                    })
                    this.$refs['editForm'].resetFields()
                    this.dialogFormVisible = false
                  }
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
      // 全选单选多选
      selsChange(sels) {
        this.sels = sels
      },
      // 批量删除
      batchRemove() {
        var ids = this.sels.map(item => item.noticeId).toString()
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

              if ((this.notices.length - this.sels.length) == 0 && this.page != 1) {
                this.page = this.page - 1
              }
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
<style lang="css">
  .el-tooltip__popper{
    font-size: 15px; max-width:50%;
    color: grey;

  } /*设置显示隐藏部分内容，按50%显示*/
  .el-tooltip__popper.is-dark{
    background-color: #f3f3f3;
    color: grey;
  }
</style>

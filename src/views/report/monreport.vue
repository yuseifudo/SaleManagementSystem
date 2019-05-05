<template>
<!--  <el-table :data="tableData" border show-summary style="width: 100%">
    <el-table-column prop="id" label="ID" width="180"></el-table-column>
    <el-table-column prop="name" label="姓名"></el-table-column>
    <el-table-column prop="amount1" sortable label="数值 1"></el-table-column>
    <el-table-column prop="amount2" sortable label="数值 2"></el-table-column>
    <el-table-column prop="amount3" sortable label="数值 3"></el-table-column>
  </el-table>-->

  <el-table :data="users" border  :summary-method="getSummaries" show-summary style="width: 100%; margin-top: 20px">
    <el-table-column prop="id" label="ID" width="180"></el-table-column>
    <el-table-column prop="name" label="姓名"></el-table-column>
    <el-table-column prop="amount1" sortable label="套餐1"></el-table-column>
    <el-table-column prop="amount2" sortable label="套餐2"></el-table-column>
    <el-table-column prop="amount3" sortable label="套餐3"></el-table-column>
    <el-table-column prop="amount4" sortable label="套餐4"></el-table-column>
  </el-table>
</template>

<script>
  import util from '@/utils/table.js'
  import {
    getUserListPage,
    removeUser,
    batchRemoveUser,
    editUser,
    addUser
  } from '@/api/monreportTable'
  export default {
    data() {
      return {
        filters: {
          name: ''
        },
        users: [],
        total: 0,
        page: 1,
        sels: [], // 列表选中列
        editFormRules: {
          name: [{ required: true, message: '请输入姓名', trigger: 'blur' }]
        },
      }
    },
    methods: {
      // handleCurrentChange(val) {
      //   this.page = val
      //   this.getUsers()
      // },    handleDel(index, row) {
      //   this.$confirm('确认删除该记录吗?', '提示', {
      //     type: 'warning'
      //   })
      //     .then(() => {
      //       const para = { id: row.id }
      //       removeUser(para).then(res => {
      //         this.$message({
      //           message: '删除成功',
      //           type: 'success'
      //         })
      //         this.getUsers()
      //       })
      //     })
      //     .catch(() => {})
      // },
      getUsers() {
        const para = {
          page: this.page,
          name: this.filters.name
        }
        getUserListPage(para).then(res => {
          this.total = res.data.total
          this.users = res.data.users
        })
      },
      // 显示编辑界面
      // handleEdit(index, row) {
      //   this.dialogStatus = 'update'
      //   this.dialogFormVisible = true
      //   this.editForm = Object.assign({}, row)
      // },
      // 显示新增界面
      // handleAdd() {
      //   this.dialogStatus = 'create'
      //   this.dialogFormVisible = true
      //   this.editForm = {
      //     id: '0',
      //     name: '',
      //     sex: 1,
      //     age: 0,
      //     birth: '',
      //     addr: ''
      //   }
      // },
      // // 编辑
      // updateData() {
      //   this.$refs.editForm.validate(valid => {
      //     if (valid) {
      //       this.$confirm('确认提交吗？', '提示', {})
      //         .then(() => {
      //           const para = Object.assign({}, this.editForm)
      //           para.birth =
      //             !para.birth || para.birth === ''
      //               ? ''
      //               : util.formatDate.format(new Date(para.birth), 'yyyy-MM-dd')
      //           editUser(para).then(res => {
      //             this.$message({
      //               message: '提交成功',
      //               type: 'success'
      //             })
      //             this.$refs['editForm'].resetFields()
      //             this.dialogFormVisible = false
      //             this.getUsers()
      //           })
      //         })
      //         .catch(e => {
      //           // 打印一下错误
      //           console.log(e)
      //         })
      //     }
      //   })
      // },
      // // 新增
      // createData: function() {
      //   this.$refs.editForm.validate(valid => {
      //     if (valid) {
      //       this.$confirm('确认提交吗？', '提示', {})
      //         .then(() => {
      //           this.editForm.id = (parseInt(Math.random() * 100)).toString() // mock a id
      //           const para = Object.assign({}, this.editForm)
      //           console.log(para)
      //
      //           para.birth =
      //             !para.birth || para.birth === ''
      //               ? ''
      //               : util.formatDate.format(new Date(para.birth), 'yyyy-MM-dd')
      //           addUser(para).then(res => {
      //             this.$message({
      //               message: '提交成功',
      //               type: 'success'
      //             })
      //             this.$refs['editForm'].resetFields()
      //             this.dialogFormVisible = false
      //             this.getUsers()
      //           })
      //         })
      //         .catch(e => {
      //           // 打印一下错误
      //           console.log(e)
      //         })
      //     }
      //   })
      // },
      // // 全选单选多选
      // selsChange(sels) {
      //   this.sels = sels
      // },
      // // 批量删除
      // batchRemove() {
      //   var ids = this.sels.map(item => item.id).toString()
      //   this.$confirm('确认删除选中记录吗？', '提示', {
      //     type: 'warning'
      //   })
      //     .then(() => {
      //       const para = { ids: ids }
      //       batchRemoveUser(para).then(res => {
      //         this.$message({
      //           message: '删除成功',
      //           type: 'success'
      //         })
      //         this.getUsers()
      //       })
      //     })
      //     .catch(() => {})
      // }





      getSummaries(param) {
        const { columns, data } = param
        const sums = []
        columns.forEach((column, index) => {
          if (index === 0) {
            sums[index] = '总价'
            return
          }
          const values = data.map(item => Number(item[column.property]))
          if (!values.every(value => isNaN(value))) {
            sums[index] = values.reduce((prev, curr) => {
              const value = Number(curr)
              if (!isNaN(value)) {
                return prev + curr
              } else {
                return prev
              }
            }, 0)
            sums[index] += ' 元'
          } else {
            sums[index] = 'N/A'
          }
        })
        return sums
      }
    },
    mounted() {
      this.getUsers()
    }
  }
</script>

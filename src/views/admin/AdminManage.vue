<!--
    功能：
    作者：
    日期：
-->
<template>
	<section class="app-container">
		<!--工具条-->
		<el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
			<el-form :inline="true" :model="filters" @submit.native.prevent>
				<el-form-item>
					<el-input v-model="filters.name" placeholder="姓名"></el-input>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" v-on:click="getAdmins">查询</el-button>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" @click="handleAdd">新增</el-button>
				</el-form-item>
				<el-form-item>
          <el-button type="danger" @click="batchRemove" :disabled="this.sels.length===0">批量删除</el-button>
				</el-form-item>
			</el-form>
		</el-col>

		<!--列表-->
		<el-table :data="admins" highlight-current-row @selection-change="selsChange" style="width: 100%;" align="center">
			<el-table-column type="selection" width="55" >
			</el-table-column>
			<!--<el-table-column type="index" width="60">
			</el-table-column>-->
			<el-table-column prop="adminId" label="编号" width="80" align="center" sortable>
			</el-table-column>
      <el-table-column prop="name" label="姓名" width="120" align="center">
			</el-table-column>
      <el-table-column prop="loginName" label="登录名" width="120" align="center">
      </el-table-column>
			<el-table-column prop="sex" label="性别" width="120" :formatter="formatSex" align="center">
			</el-table-column>
			<el-table-column prop="age" label="年龄" width="120" align="center" sortable>
			</el-table-column>
			<el-table-column prop="tel" label="联系电话" width="120" align="center">
			</el-table-column>
			<el-table-column prop="email" label="邮箱" min-width="160" align="center">
			</el-table-column>
			<el-table-column label="操作" width="150" align="center">
				<template slot-scope="scope">
					<el-button type="success" size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
					<el-button type="danger" size="small" @click="handleDel(scope.$index, scope.row)">删除</el-button>
				</template>
			</el-table-column>
		</el-table>

		<!--工具条-->
		<el-col :span="24" class="toolbar">
			<!--<el-button type="danger" @click="batchRemove" :disabled="this.sels.length===0">批量删除</el-button>-->
			<el-pagination layout="prev, pager, next" @current-change="handleCurrentChange" :page-size="20" :total="total" style="float:right;">
			</el-pagination>
		</el-col>

		<!--编辑界面-->
		<el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible" :close-on-click-modal="false">
			<el-form :model="editForm" label-width="80px" :rules="editFormRules" ref="editForm">
				<el-form-item label="姓名" prop="name" >
					<el-input v-model="editForm.name" auto-complete="off" ></el-input>
				</el-form-item>
        <el-form-item label="登录名" prop="loginName">
          <el-input v-model="editForm.loginName" auto-complete="off" ></el-input>
        </el-form-item>
				<el-form-item label="性别">
					<el-radio-group v-model="editForm.sex">
						<el-radio class="radio" :label=1>男</el-radio>
						<el-radio class="radio" :label=0>女</el-radio>
					</el-radio-group>
				</el-form-item>
				<el-form-item label="年龄">
					<el-input-number v-model="editForm.age" :min="0" :max="150"></el-input-number>
				</el-form-item>
        <el-form-item label="联系方式" >
          <el-input v-model="editForm.tel"></el-input>
        </el-form-item>
				<el-form-item label="邮箱" >
					<el-input type="textarea" v-model="editForm.email"></el-input>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
			 <el-button @click.native="dialogFormVisible=false">取消</el-button>
			  <el-button v-if="dialogStatus=='create'" type="primary" @click="createData">添加</el-button>
        <el-button v-else type="primary" @click="updateData">修改</el-button>
			</div>
		</el-dialog>
	</section>
</template>

<script>
// import util from '@/utils/table.js'
import {
  getAdminListPage,
  removeAdmin,
  batchRemoveAdmin,
  editAdmin,
  addAdmin
} from '@/api/adminTable'

export default {
  data() {
    return {
      dialogStatus: '',
      textMap: {
        update: '编辑',
        create: '添加'
      },
      dialogFormVisible: false,
      filters: {
        name: ''
      },
      admins: [],
      total: 0,
      page: 1,
      sels: [], // 列表选中列
      editFormRules: {
        name: [{ required: true, message: '请输入姓名', trigger: 'blur' }],
        loginName: [{ required: true, message: '请输入登录名', trigger: 'blur' }]
      },
      // 编辑界面数据
      editForm: {
        id: '0',
        adminId:'',
        name: '',
        loginName: '',
        sex: 1,
        age: 0,
        tel: '',
        email: ''
      },

      addFormVisible: false, // 新增界面是否显示
      addFormRules: {
        name: [{ required: true, message: '请输入姓名', trigger: 'blur' }],
        loginName: [{ required: true, message: '请输入登录名', trigger: 'blur' }]
      }
    }
  },
  methods: {
    // 性别显示转换
    formatSex: function(row, column) {
      return row.sex == 1 ? '男' : row.sex == 0 ? '女' : '未知'
    },
    handleCurrentChange(val) {
      this.page = val
      this.getAdmins()
    },
    // 获取用户列表
    getAdmins() {
      const para = {
        page: this.page,
        name: this.filters.name
      }
      getAdminListPage(para).then(res => {
        this.total = res.data.total
        this.admins = res.data.admins
      })
    },
    // 删除
    handleDel(index, row) {
      this.$confirm('确认删除该记录吗?', '提示', {
        type: 'warning'
      })
        .then(() => {
          const para = { id: row.id }
          removeAdmin(para).then(res => {
            this.$message({
              message: '删除成功',
              type: 'success'
            })
            this.getAdmins()
          })
        })
        .catch(() => {})
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
        adminId:'',
        name: '',
        loginName: '',
        sex: 1,
        age: 0,
        tel: '',
        email: ''
      }
    },
    // 编辑
    updateData() {
      this.$refs.editForm.validate(valid => {
        if (valid) {
          this.$confirm('确认提交吗？', '提示', {})
            .then(() => {
              const para = Object.assign({}, this.editForm)
              /*
              para.birth =
                !para.birth || para.birth === ''
                  ? ''
                  : util.formatDate.format(new Date(para.birth), 'yyyy-MM-dd')
                  */
              editAdmin(para).then(res => {
                this.$message({
                  message: '提交成功',
                  type: 'success'
                })
                this.$refs['editForm'].resetFields()
                this.dialogFormVisible = false
                this.getAdmins()
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
              this.editForm.adminId = (parseInt(Math.random() * 100)).toString() // mock a adminId
              const para = Object.assign({}, this.editForm)
              console.log(para)

              /*
              para.birth =
                !para.birth || para.birth === ''
                  ? ''
                  : util.formatDate.format(new Date(para.birth), 'yyyy-MM-dd')
                  */
              addAdmin(para).then(res => {
                this.$message({
                  message: '提交成功',
                  type: 'success'
                })
                this.$refs['editForm'].resetFields()
                this.dialogFormVisible = false
                this.getAdmins()
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
      var ids = this.sels.map(item => item.id).toString()
      this.$confirm('确认删除选中记录吗？', '提示', {
        type: 'warning'
      })
        .then(() => {
          const para = { ids: ids }
          batchRemoveAdmin(para).then(res => {
            this.$message({
              message: '删除成功',
              type: 'success'
            })
            this.getAdmins()
          })
        })
        .catch(() => {})
    }
  },
  mounted() {
    this.getAdmins()
  }
}
</script>

<style scoped>

</style>

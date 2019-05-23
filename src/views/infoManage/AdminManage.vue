<!--
    功能：管理员模块
    作者：陈年友
    日期：2019/04/30
-->
<template>
	<section class="app-container">
		<!--工具条-->
		<el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
			<el-form :inline="true" :model="filters" @submit.native.prevent>
        <el-form-item>
          <el-input v-model="filters.managerId" placeholder="编号"></el-input>
        </el-form-item>
        <el-form-item>
          <el-input v-model="filters.managerName" placeholder="姓名"></el-input>
        </el-form-item>
        <el-form-item>
          <el-input v-model="filters.loginName" placeholder="登录名"></el-input>
        </el-form-item>
        <el-form-item>
          <el-input v-model="filters.tel" placeholder="联系电话"></el-input>
        </el-form-item>
        <!--<el-form-item>
          <el-select @change="selectGet" v-model="editForm.role" placeholder="请选择">
            <el-option
              v-for="role in roles"
              :key="role.id"
              :label="role.roleName"
              :value="role.id">
            </el-option>
          </el-select>
        </el-form-item>-->
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
			<el-table-column prop="managerId" label="编号" width="100" align="center" sortable>
			</el-table-column>
      <el-table-column prop="managerName" label="姓名" width="120" align="center">
			</el-table-column>
      <el-table-column prop="loginName" label="登录名" width="120" align="center">
      </el-table-column>
			<el-table-column prop="managerSex" label="性别" width="100" :formatter="formatmanagerSex" align="center">
			</el-table-column>
			<!--<el-table-column prop="age" label="年龄" width="100" align="center" sortable>
			</el-table-column>-->
			<el-table-column prop="managerTel" label="联系电话" width="130" align="center">
			</el-table-column>
			<el-table-column prop="managerEmail" label="邮箱" min-width="160" align="center">
			</el-table-column>
      <!--<el-table-column prop="role" label="角色" width="130" :formatter="formatRole" align="center">
      </el-table-column>-->
      <!--<el-table-column prop="role" label="角色" min-width="130" align="center" :formatter="formatRole">
        <template slot-scope="scope">
          <el-tag
            :type="scope.row.role === 0 ? 'danger' : scope.row.role === 1 ? 'success' : scope.row.role === 2 ? 'info' : scope.row.role === 3 ? '':'warning'"
            disable-transitions >{{scope.row.role}}</el-tag>
        </template>-->
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
			<el-pagination background layout="prev, pager, next" @current-change="handleCurrentChange" :page-size="5" :total="total" style="float:right;">
			</el-pagination>
		</el-col>

		<!--编辑界面-->
		<el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible" @close="callOf('editForm')">
			<el-form :model="editForm" label-width="80px" :rules="editFormRules" ref="editForm">
				<el-form-item label="姓名" prop="managerName" >
					<el-input v-model="editForm.managerName" auto-complete="off" ></el-input>
				</el-form-item>
        <el-form-item label="登录名" prop="loginName">
          <el-input v-model="editForm.loginName" auto-complete="off" ></el-input>
        </el-form-item>
				<el-form-item label="性别">
					<el-radio-group v-model="editForm.managerSex">
						<el-radio class="radio" :label=0>男</el-radio>
						<el-radio class="radio" :label=1>女</el-radio>
					</el-radio-group>
				</el-form-item>
				<!--<el-form-item label="年龄">
					<el-input-number v-model="editForm.age" :min="0" :max="150"></el-input-number>
				</el-form-item>-->
        <el-form-item label="联系方式" >
          <el-input v-model="editForm.managerTel"></el-input>
        </el-form-item>
				<el-form-item label="邮箱" >
					<el-input type="textarea" v-model="editForm.managerEmail"></el-input>
				</el-form-item>
        <!--<el-form-item label="角色" >-->
          <!--<el-select v-model="editForm.role"  placeholder="请选择" >-->
            <!--<el-option v-for="role in roles" :key="role.id" :label="role.roleName" :value="role.id"></el-option>-->
          <!--</el-select>-->
        <!--</el-form-item>-->
			</el-form>
			<div slot="footer" class="dialog-footer">
			 <el-button @click="callof('editForm')">取消</el-button>
			  <el-button v-if="dialogStatus=='create'" type="primary" @click="createData">添加</el-button>
        <el-button v-else type="primary" @click="updateData">修改</el-button>
			</div>
		</el-dialog>
	</section>
</template>

<script>
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
      roleId:'',
      roles:[{id:1,roleName:'普通管理员'},{id:2,roleName:'超级管理员'},{id:3,roleName:'网格管理员'},{id:4,roleName:'市分管理员'},{id:5,roleName:'省分管理员'},{id:6,roleName:'集团管理员'}],
      dialogStatus: '',
      textMap: {
        update: '编辑',
        create: '添加'
      },
      dialogFormVisible: false,
      filters: {
        managerId:'',
        managerName: '',
        loginName: '',
        managerTel:''
      },
      admins: [],
      total: 0,
      page: 1,
      sels: [], // 列表选中列
      editFormRules: {
        managerName: [{ required: true, message: '请输入姓名', trigger: 'blur' }],
        loginName: [{ required: true, message: '请输入登录名', trigger: 'blur' }]
      },
      // 编辑界面数据
      editForm: {
        id: '0',
        managerId:'',
        managerName: '',
        loginName: '',
        age: 0,
        managerTel: '',
        managerEmail: '',
        managerSex: 1
      },

      addFormVisible: false, // 新增界面是否显示
      addFormRules: {
        managerName: [{ required: true, message: '请输入姓名', trigger: 'blur' }],
        loginName: [{ required: true, message: '请输入登录名', trigger: 'blur' }]
      }
    }
  },
  methods: {
    //模态框取消方法，关闭后清除提示
    callOf(editForm){
      this.dialogFormVisible = false;
      this.$refs[editForm].resetFields();
    },
    // 性别显示转换
    formatmanagerSex: function(row, column) {
      return row.managerSex == 0 ? '男' : row.managerSex == 1 ? '女' : '未知'
    },
    // 角色显示转换
    formatRole: function(row, column) {
      return row.role == 0 ? '超级管理员' : row.role == 1 ? '省级管理员' : row.role == 2 ? '市级管理员' : '网格管理员'
    },
    handleCurrentChange(val) {
      this.page = val
      this.getAdmins()
    },
    // 获取用户列表
    getAdmins() {
      const para = {
        page: this.page,
        managerId: this.filters.managerId,
        managerName: this.filters.managerName,
        loginName: this.filters.loginName,
        managerTel: this.filters.managerTel,
      }
      getAdminListPage(para).then(res => {
        console.log(res);
        this.total = res.data.total
        this.admins = res.data.list
      })
    },
    // 删除
    handleDel(index, row) {
      this.$confirm('确认删除该记录吗?', '提示', {
        type: 'warning'
      })
        .then(() => {
          const para = { managerId: row.managerId}
          removeAdmin(para).then(res => {
            this.$message({
              message: '删除成功',
              type: 'success'
            })
            if((this.admins.length-1)==0){
              this.page = this.page - 1
            }
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
        managerId:'',
        managerName: '',
        loginName: '',
        managerSex: 0,
        // age: 0,
        managerTel: '',
        managerEmail: '',
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
                  message: '修改成功',
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
              this.editForm.managerId = (parseInt(Math.random() * 100)).toString() // mock a managerId
              const para = Object.assign({}, this.editForm)
              // console.log(para)

              /*
              para.birth =
                !para.birth || para.birth === ''
                  ? ''
                  : util.formatDate.format(new Date(para.birth), 'yyyy-MM-dd')
                  */
              addAdmin(para).then(res => {
                this.$message({
                  message: '添加成功',
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
      this.filters.managerName=''
    },
    // 全选单选多选
    selsChange(sels) {
      this.sels = sels
    },
    // 批量删除
    batchRemove() {
      var list = this.sels.map(list => list.managerId).toString()
      this.$confirm('确认删除选中记录吗？', '提示', {
        type: 'warning'
      })
        .then(() => {
          const para = { list: list }
          batchRemoveAdmin(para).then(res => {
            this.$message({
              message: '删除成功',
              type: 'success'
            })
            if((this.admins.length-this.sels.length)==0 && this.page!=1){
              this.page = this.page-1
            }
            this.getAdmins()
          })
        })
        .catch(() => {})
    },
    selectGet(vId){
      let obj = {};
      obj = this.roles.find((role)=>{//roles
        return role.id === vId;//筛选出匹配数据
      });
      this.roleId=obj.id
      console.log(obj.roleName);//roleName就是对应label的值
      console.log(obj.id);
    },
    filterTag(value, row) {
      return row.role === value;
    }
  },
  mounted() {
    this.getAdmins()
  }
}
</script>

<style scoped>

</style>

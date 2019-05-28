<!--列表查询-->

<!--作者：王从竹-->
<!--时间：2019/5/9-->
<!--功能：个人信息修改-->



<template>
	<section class="app-container">
		<!--工具条-->
		<el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
			<el-form :inline="true" :model="filters" @submit.native.prevent>
				<el-form-item>
					<el-input v-model="filters.userName" placeholder="姓名"></el-input>
				</el-form-item>
        <el-form-item>
          <el-input v-model="filters.productName" placeholder="产品"></el-input>
        </el-form-item>
        <el-form-item>
          <el-input v-model="filters.tel" placeholder="手机号码"></el-input>
        </el-form-item>
        <el-form-item>
          <el-input v-model="filters.fee" placeholder="消费金额"></el-input>
        </el-form-item>
        <el-form-item>
          <el-input v-model="filters.onlineTime" placeholder="在网时长"></el-input>
        </el-form-item>
				<el-form-item>
					<el-button type="primary" v-on:click="getUserList">查询</el-button>
				</el-form-item>
			</el-form>
		</el-col>

		<!--列表-->
		<el-table :data="users" style="width: 100%;">
			<el-table-column prop="userId" label="编号" width="70"  align="center">
			</el-table-column>
			<el-table-column prop="userName" label="姓名" width="100"  align="center">
			</el-table-column>
			<el-table-column prop="userSex" label="性别" width="70" :formatter="formatSex"  align="center">
			</el-table-column>
			<el-table-column prop="userAge" label="年龄" sortable width="80"  align="center">
			</el-table-column>
			<el-table-column prop="birth" label="出生日期" sortable width="120"  align="center">
			</el-table-column>
      <el-table-column prop="productName" label="使用产品" width="130" align="center">
      </el-table-column>
      <el-table-column prop="tel" label="手机号码" width="130" align="center">
      </el-table-column>
			<el-table-column prop="fee" label="消费金额" sortable width="100" align="center">
			</el-table-column>
			<el-table-column prop="status" label="用户状态" :formatter="formatstatus" width="100" align="center">
			</el-table-column>
      <el-table-column prop="activeDate" label="入网时间" sortable min-width="120" align="center">
      </el-table-column>
      <el-table-column prop="iscbss" label="是否CB用户" width="120" :formatter="formatisCbss"  align="center">
      </el-table-column>
      <el-table-column prop="cardType" label="身份类型"  min-width="80" align="center">
      </el-table-column>
      <el-table-column prop="idcard" label="身份证号码"  min-width="180" align="center">
      </el-table-column>
      <el-table-column prop="onlineTime" label="在网时长(月)" sortable min-width="130" align="center">
      </el-table-column>
		</el-table>

    <el-col :span="24" class="toolbar">
      <el-pagination layout="prev, pager, next" @current-change="handleCurrentChange" :page-size="10" :total="total" style="float:right;">
      </el-pagination>
    </el-col>

	</section>
</template>

<script>
import {
  getUserList
} from '@/api/userTable'

export default {
  data() {
    return {
      value: '',
      dialogStatus: '',
      dialogFormVisible: false,
      filters: {
        userName: '',
        productName: '',
        tel:'',
        fee:'',
        onlineTime:''
      },
      users: [],
      total: 0,
      page: 1
    }
  },
  methods: {
    // 性别显示转换
    formatSex: function(row, column) {
      return row.userSex === 1 ? '男' : row.userSex === 0 ? '女' : '未知'
    },
    formatisCbss: function(row, column) {
      return row.isCbss === 1 ? '是' : row.isCbss === 0 ? '否' : '未知'
    },
    formatstatus: function(row, column) {
      return row.status == '01' ? '开机' : row.status == '02' ? '双停' : row.status == '03' ? '单停' : row.status == '04' ? '销户' : '其它'
    },

    handleCurrentChange(val) {
      this.page = val
      this.getUserList()
    },
    // 获取用户列表
    getUserList() {
      const para = {
        page: this.page,
        userName: this.filters.userName,
        productName: this.filters.productName,
        tel: this.filters.tel,
        fee: this.filters.fee,
        onlineTime: this.filters.onlineTime
      }
      getUserList(para).then(res => {
        console.log(res);
        this.total = res.data.total
        this.users = res.data.list
      })
    },


     /* const para = {
        page: this.page,
        userName: this.filters.userName,
//        grade: this.filters.grade
      }
      getUsers(para).then(res => {
        this.total = res.data.total
        this.users = res.data.users
      })
    }*/

  },
  mounted() {
    this.getUserList()
  }
}
</script>

<style scoped>

</style>

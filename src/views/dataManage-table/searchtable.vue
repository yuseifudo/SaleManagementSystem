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
					<el-input v-model="filters.name" placeholder="姓名"></el-input>
				</el-form-item>
        <!--<el-form-item>-->
        <!--<el-input v-model="filters.grade" placeholder="销售级别"></el-input>-->
        <!--</el-form-item>-->
				<el-form-item>
					<el-button type="primary" v-on:click="getUser">查询</el-button>
				</el-form-item>
			</el-form>
		</el-col>

		<!--列表-->
		<el-table :data="users" style="width: 100%;">
			<el-table-column type="index" label="编号" width="75">
			</el-table-column>
			<el-table-column prop="name" label="姓名" width="110">
			</el-table-column>
			<el-table-column prop="sex" label="性别" width="110" :formatter="formatSex">
			</el-table-column>
			<el-table-column prop="age" label="年龄" width="110">
			</el-table-column>
			<el-table-column prop="birth" label="出生日期" width="150">
			</el-table-column>
			<el-table-column prop="addr" label="地址" min-width="190">
			</el-table-column>
      <el-table-column prop="grade" label="销售级别" sortable min-width="150">
      </el-table-column>
		</el-table>

	</section>
</template>

<script>
import {
  getUsers
} from '@/api/searchTable'

export default {
  data() {
    return {
      dialogStatus: '',
      dialogFormVisible: false,
      filters: {
        name: '',
//        grade:  ''
      },
      users: [],
      total: 0,
      page: 1
    }
  },
  methods: {
    // 性别显示转换
    formatSex: function(row, column) {
      return row.sex === 1 ? '男' : row.sex === 0 ? '女' : '未知'
    },
    // 获取用户列表
    getUsers() {
      const para = {
        page: this.page,
        name: this.filters.name,
//        grade: this.filters.grade
      }
      getUsers(para).then(res => {
        this.total = res.data.total
        this.users = res.data.users
      })
    }

  },
  mounted() {
    this.getUsers()
  }
}
</script>

<style scoped>

</style>

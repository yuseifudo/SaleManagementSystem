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
        <el-form-item>
          <el-input v-model="filters.name" placeholder="产品"></el-input>
        </el-form-item>
        <el-form-item>
          <el-input v-model="filters.name" placeholder="本月消费金额"></el-input>
        </el-form-item>
        <el-form-item>
          <el-input v-model="filters.name" placeholder="在网时长"></el-input>
        </el-form-item>
        <el-form-item>
          <el-select v-model="value" placeholder="用户状态">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <!--<el-form-item>-->
        <!--<el-input v-model="filters.grade" placeholder="销售级别"></el-input>-->
        <!--</el-form-item>-->
				<el-form-item>
					<el-button type="primary" v-on:click="getUsers">查询</el-button>
				</el-form-item>
			</el-form>
		</el-col>

		<!--列表-->
		<el-table :data="users" style="width: 100%;">
			<el-table-column type="index" label="编号" width="80"  align="center">
			</el-table-column>
			<el-table-column prop="name" label="姓名" width="100"  align="center">
			</el-table-column>
			<el-table-column prop="sex" label="性别" width="100" :formatter="formatSex"  align="center">
			</el-table-column>
			<el-table-column prop="age" label="年龄" width="100"  align="center">
			</el-table-column>
			<el-table-column prop="birth" label="出生日期" width="130"  align="center">
			</el-table-column>
      <el-table-column prop="taocan" label="使用产品" sortable width="130" align="center">
      </el-table-column>
			<el-table-column prop="addr" label="消费金额" sortable width="100" align="center">
			</el-table-column>
			<el-table-column prop="status" label="用户状态" sortable width="100" align="center">
			</el-table-column>
      <el-table-column prop="grade" label="入网时间" sortable min-width="150" align="center">
      </el-table-column>
      <el-table-column prop="time" label="在网时长(月)" sortable min-width="100" align="center">
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
      options: [{
        value: '1',
        label: '单停'
      }, {
        value: '2',
        label: '双停'
      }, {
        value: '3',
        label: '欠费'
      }, {
        value: '4',
        label: '正常'
      }, {
        value: '5',
        label: '在网'
      }],
      value: '',
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

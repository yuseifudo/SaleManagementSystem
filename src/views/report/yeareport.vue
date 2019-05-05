<template>
  <div class="block">
  <el-table :data="tempList" border :summary-method="getSummaries"  show-summary style="width: 100%">
    <el-table-column prop="id" label="ID" width="180"></el-table-column>
    <el-table-column prop="name" label="姓名"></el-table-column>
    <el-table-column prop="amount1" sortable label="数值 1"></el-table-column>
    <el-table-column prop="amount2" sortable label="数值 2"></el-table-column>
    <el-table-column prop="amount3" sortable label="数值 3"></el-table-column>
  </el-table>

<!--  <el-table :data="tableData6" border height="200" :summary-method="getSummaries" show-summary style="width: 100%; margin-top: 20px">
    <el-table-column prop="id" label="ID" width="180"></el-table-column>
    <el-table-column prop="name" label="姓名"></el-table-column>
    <el-table-column prop="amount1" label="数值 1（元）"></el-table-column>
    <el-table-column prop="amount2" label="数值 2（元）"></el-table-column>
    <el-table-column prop="amount3" label="数值 3（元）"></el-table-column>
  </el-table>-->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage1"
        :page-sizes="[2, 10, 20, 50]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="users.length">
      </el-pagination>
    </div>
</template>

<script>
  import {getUserList} from '@/api/yeareportTable'
  export default {
    data() {
      return {
        tempList:[],
        users:[],
        currentPage1:1,  //初始页
        pageSize:10,  //每页的数据量/
      };
    },
    mounted(){
      this.getUsers()
    },
    methods: {
      // 获取用户列表
      getUsers() {
        getUserList().then(res => {
          this.users = res.data.lists
        })
      },

      handleSizeChange: function(pageSize) { // 每页条数切换
        this.pageSize = pageSize
        this.handleCurrentChange(this.currentPage1);
      },
      handleCurrentChange: function(currentPage) {//页码切换
        this.currentPage1 = currentPage
        this.currentChangePage(this.users,currentPage)

      },
      //分页方法（重点）
      currentChangePage(list,currentPage) {
        let from = (currentPage - 1) * this.pageSize;
        let to = currentPage * this.pageSize;
        this.tempList = [];
        for (; from < to; from++) {
          if (list[from]) {
            console.log(list[from]);
            this.tempList.push(list[from]);
          }
        }
      },

      getSummaries(param) {
        const { columns, data } = param;
        const sums = [];
        columns.forEach((column, index) => {
          if (index === 0) {
            sums[index] = '总价';
            return;
          }
          const values = data.map(item => Number(item[column.property]));
          if (!values.every(value => isNaN(value))) {
            sums[index] = values.reduce((prev, curr) => {
              const value = Number(curr);
              if (!isNaN(value)) {
                return prev + curr;
              } else {
                return prev;
              }
            }, 0);
            sums[index] += ' 元';
          } else {
            sums[index] = 'N/A';
          }
        });

        return sums;
      }
    }
  };
</script>

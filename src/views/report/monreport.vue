<template>
  <div class="block">
    <div id="title">
      <span>福州营业厅月销售报表</span>
      <el-button id='button' type="primary" @click="exportExcel">导出<i class="el-icon-upload el-icon--right"></i></el-button>
    </div>
    <el-table id="out-table" :data="tempList" border :summary-method="getSummaries"  show-summary style="width: 100%">
    <el-table-column prop="id" label="ID" width="180"></el-table-column>
    <el-table-column prop="time" sortable label="时间"></el-table-column>
    <el-table-column prop="amount1" sortable label="天王卡销售额（元）"></el-table-column>
    <el-table-column prop="amount2" sortable label="帝王卡销售额（元）"></el-table-column>
    <el-table-column prop="amount3" sortable label="大冰神卡销售额（元）"></el-table-column>
    <el-table-column prop="amount4" sortable label="小冰神卡销售额（元）"></el-table-column>
  </el-table>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page.sync="currentPage1"
        :next-text="ne"
        :prev-text="fi"
        :page-sizes="[3, 12, 20, 50]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="users.length"
      >
      </el-pagination>
    </div>
</template>

<script>
  import {getUserList} from '@/api/monreportTable'
  import FileSaver from 'file-saver'
  import XLSX from 'xlsx'
  export default {
    data() {
      return {
        fi:"上一页",
        ne:'下一页',
        tempList:[],
        users:[],
        currentPage1:1,  //初始页
        pageSize:12,  //每页的数据量
      };
    },
    mounted(){
      this.getUsers()
    },
    methods: {

      exportExcel () {
        /* generate workbook object from table */
        var wb = XLSX.utils.table_to_book(document.querySelector('#out-table'))
        /* get binary string as output */
        var wbout = XLSX.write(wb, { bookType: 'xlsx', bookSST: true, type: 'array' })
        try {
          FileSaver.saveAs(new Blob([wbout], { type: 'application/octet-stream' }), '福州营业厅月销售报表.xlsx')
        } catch (e) { if (typeof console !== 'undefined') console.log(e, wbout) }
        return wbout
      },

      // 获取用户列表
      getUsers() {
        getUserList().then(res => {
          this.users = res.data.lists
          this.currentChangePage(this.users,1)
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
      //分页方法
      currentChangePage(list,currentPage) {
        let from = (currentPage - 1) * this.pageSize;
        let to = currentPage * this.pageSize;
        this.tempList = [];
        for (; from < to; from++) {
          if (list[from]) {
            this.tempList.push(list[from]);
          }
        }
      },

      getSummaries(param) {
        const { columns, data } = param;
        const sums = [];
        columns.forEach((column, index) => {
          if (index === 0) {
            sums[index] = '销售总额';
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
<style>
  #title{
  text-align: center;
  }
  #button{
    float: right;
    margin:5px 25px 5px ;

  }
  #title >span{
    font-size: 20px;
    color: #333;
    line-height: 40px;
    font-weight: 700;
  }

</style>

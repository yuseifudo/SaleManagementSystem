<template>
  <div class="block">
    <div id="title">
      <span style="display: block">月销售报表</span>
      <div id="search">
        <el-input v-model="MonthSaleId" @keyup.native.enter="getSaleList" :placeholder="tip" style="width: 200px;" />
        <el-button type="primary" icon="el-icon-search" @click="getSaleList"></el-button>
      </div>

      <el-button id='button' type="primary" @click="exportExcel">导出<i class="el-icon-upload el-icon--right"></i></el-button>
    </div>
    <el-table id="out-table" :data="tempList" border :summary-method="getSummaries"  show-summary style="width: 100%">
    <el-table-column prop="saleMonthId" label="编号" width="150" align="center"></el-table-column>
    <el-table-column prop="saleMonth" sortable label="日期" align="center"></el-table-column>
    <el-table-column align="center" prop="saleVolume" sortable label="月销售额(元)"
                     :filters="[{ text: '良好', value: '100' }, { text: '优秀', value: '200' }]"
                     :filter-method="filterTotals">
      <template slot-scope="scope">
        <el-tag
          :type="scope.row.saleVolume >= 10000 ? 'danger' : scope.row.saleVolume <=5000 ? 'success':'warning'"
          disable-transitions>{{scope.row.saleVolume}}</el-tag>
      </template>
    </el-table-column>
    <el-table-column align="center" prop="saleCount" sortable label="月销售量（份）"
                     :filters="[{ text: '良好', value: '1' }, { text: '优秀', value: '2' }]"
                     :filter-method="filterCount">
      <template slot-scope="scope">
        <el-tag
          :type="scope.row.saleCount>= 300 ? 'danger' : scope.row.saleCount <=150 ? 'success':'warning'"
          disable-transitions>{{scope.row.saleCount}}</el-tag>
      </template>
    </el-table-column>
    <el-table-column align="center" prop="monthDifference" sortable label="较上月销售差额（元）"
                     :filters="[{ text: '增长', value: '1' }, { text: '下降', value: '0' }]"
                     :filter-method="difference">
      <template slot-scope="scope">
        <el-tag
          :type="scope.row.monthDifference >= 0 ? 'danger' :'success'"
          disable-transitions>{{scope.row.monthDifference}}</el-tag>
      </template>
    </el-table-column>
  </el-table>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page.sync="currentPage1"
        :prev-text="lastPage"
        :next-text="nextPage"
        :page-sizes="[3, 12, 20, 50]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="monthSales.length"
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
        MonthSaleId:null,
        tip:"编号",
        lastPage:"上一页",
        nextPage:'下一页',
        tempList:[],//每页展示的数据
        monthSales:[],//后台获取的总数据
        currentPage1:1,  //初始页
        pageSize:12,  //每页的数据量
      };
    },
    mounted(){
      this.getSales()
    },
    methods: {

      //月销售额筛选
      filterTotals(value,row){
        if(value==100)
          return row.saleVolume>=5000 && row.saleVolume<10000;
        if(value==200)
          return row.saleVolume>=10000;
      },

      //月销售量筛选
      filterCount(value,row){
        if(value==1)
          return row.saleCount>=150 && row.saleCount<300;
        if(value==2)
          return row.saleCount>=300;
      },

      //较上月营业差额筛选
      difference(value,row){
        if(value==1)
          return row.monthDifference>=0;
        if(value==0)
          return row.monthDifference<0;
      },
      //导出报表
      exportExcel () {
        /* generate workbook object from table */
        var wb = XLSX.utils.table_to_book(document.querySelector('#out-table'))
        /* get binary string as output */
        var wbout = XLSX.write(wb, { bookType: 'xlsx', bookSST: true, type: 'array' })
        try {
          FileSaver.saveAs(new Blob([wbout], { type: 'application/octet-stream' }), '月销售报表.xlsx')
        } catch (e) { if (typeof console !== 'undefined') console.log(e, wbout) }
        return wbout
      },

      // 获取总销售列表
      getSales() {
        getUserList().then(res => {
          this.monthSales = res.data.items
          this.currentChangePage(this.monthSales,1)
        })
      },

      handleSizeChange: function(pageSize) { // 每页条数切换
        this.pageSize = pageSize
        this.handleCurrentChange(this.currentPage1);
      },
      handleCurrentChange: function(currentPage) {//页码切换
        this.currentPage1 = currentPage
        this.currentChangePage(this.monthSales,currentPage)

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

      //根据编号查询
      getSaleList(){
        //过滤查询结果集（先过滤，再分页）
        let filterData=this.monthSales.filter(item=>{
          if(this.MonthSaleId  && item.saleMonthId.indexOf(this.MonthSaleId)<0) return false
          return true
        })
        //对过滤后结果分页显示
        this.currentChangePage(filterData,1)

      },
      //表格末行显示
      getSummaries(param) {
        const { columns, data } = param;
        const sums = [];
        columns.forEach((column, index) => {
          if (index === 0) {
            sums[index] = '合计';
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
            sums[index] += '';
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
    margin:5px 15px 5px ;
  }
  #search{
    float: left;
    margin:5px;
  }
  #title >span{
    font-size: 20px;
    color: #333;
    line-height: 40px;
    font-weight: 700;
  }

</style>

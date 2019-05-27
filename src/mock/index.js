import Mock from 'mockjs'
import tableAPI from './table'
import loginAPI from './login'
import articleAPI from './article'
import noticeAPI from './notice'
import awardAPI from './award'
import packageManageAPI from './packageManage'
import adminAPI from './admin'
import salereportAPI from './salereport'
import monreportAPI from './monreport'
import salesmanAPI from './salesman'
import homeAPI from './home'
import PackageCompareChartAPI from './PackageCompareChart'
import SaleResultChartAPI from './SaleResultChart'
import PackageChartAPI from './PackageChart'
import commissionPublishAPI from './commissionPublish'
import taocanListAPI from './taocanList'
import homeEchartAPI from './homechart'
import formAPI from './informationform'
import searchtableAPI from './searchTable'
import salesQuantityAPI from './salesQuantity'

// 设置全局延时 没有延时的话有时候会检测不到数据变化 建议保留
Mock.setup({
  timeout: '300-600'
})

// 登录相关
// Mock.mock(/\/user\/login/, 'post', loginAPI.loginByUsername)
// Mock.mock(/\/user\/logout/, 'post', loginAPI.logout)
// Mock.mock(/\/user\/info\.*/, 'get', loginAPI.getUserInfo)

// 图表相关(陈铠彬)

Mock.mock(/\/PackageCompareChart\/list/, 'get', PackageCompareChartAPI.getSales)
Mock.mock(/\/SaleResultChart\/data/, 'get', SaleResultChartAPI.getSales)
Mock.mock(/\/PackageChart\/list/, 'get', PackageChartAPI.getSales)
// 佣金(陈铠彬)
Mock.mock(/\/commissionPublish\/listpage/, 'get', commissionPublishAPI.getUserList)
Mock.mock(/\/commissionPublish\/remove/, 'get', commissionPublishAPI.deleteUser)
Mock.mock(/\/commissionPublish\/batchremove/, 'get', commissionPublishAPI.batchremove)
Mock.mock(/\/commissionPublish\/add/, 'get', commissionPublishAPI.createUser)
Mock.mock(/\/commissionPublish\/edit/, 'get', commissionPublishAPI.updateUser)

// 文章相关
Mock.mock(/\/article\/list/, 'get', articleAPI.getList)
Mock.mock(/\/article\/detail/, 'get', articleAPI.getArticle)
Mock.mock(/\/article\/pv/, 'get', articleAPI.getPv)
Mock.mock(/\/article\/create/, 'post', articleAPI.createArticle)
Mock.mock(/\/article\/update/, 'post', articleAPI.updateArticle)

// 用户相关
Mock.mock(/\/user\/listpage/, 'get', tableAPI.getUserList)
Mock.mock(/\/user\/remove/, 'get', tableAPI.deleteUser)
Mock.mock(/\/user\/batchremove/, 'get', tableAPI.batchremove)
Mock.mock(/\/user\/add/, 'get', tableAPI.createUser)
Mock.mock(/\/user\/edit/, 'get', tableAPI.updateUser)

/*
* 作者：杨昌海
* 时间：2019.05.06
* 功能：公告相关/
* */
//Mock.mock(/\/notice\/listpage/, 'get', noticeAPI.getNoticeList)
//Mock.mock(/\/notice\/remove/, 'get', noticeAPI.deleteNotice)
//Mock.mock(/\/notice\/batchremove/, 'get', noticeAPI.batchremove)
//Mock.mock(/\/notice\/add/, 'get', noticeAPI.createNotice)
//Mock.mock(/\/notice\/edit/, 'get', noticeAPI.updateNotice)

/*
* 作者：王震
* 时间：2019.05.06
* 功能：奖励相关/
* */
Mock.mock(/\/award\/listpage/, 'get', awardAPI.getAwardList)
Mock.mock(/\/award\/remove/, 'get', awardAPI.deleteAward)
Mock.mock(/\/award\/batchremove/, 'get', awardAPI.batchremove)
Mock.mock(/\/award\/add/, 'get', awardAPI.createAward)
Mock.mock(/\/award\/edit/, 'get', awardAPI.updateAward)


/**
 * 模块：套餐管理模块
 * 作者：石龙成
 * 日期：2019/5/9
 */
// Mock.mock(/\/packageManage\/list/,packageManageAPI.getList)// mock获取列表请求
// Mock.mock(/\/packageManage\/detail/,packageManageAPI.getItemDetail)// mock获取详情列表请求
// Mock.mock(/\/packageManage\/create/,packageManageAPI.insertPackageInfo)// mock新增套餐信息请求
// Mock.mock(/\/packageManage\/delete/,packageManageAPI.deletePackageInfo)// mock删除某条套餐信息请求
// Mock.mock(/\/packageManage\/update/,packageManageAPI.updatePackageInfo)// mock更新套餐信息请求
// Mock.mock(/\/packageManage\/setFirstPush/,packageManageAPI.setFirstPush)// mock 设置首推套餐请求

// 管理员相关
/**
*模块：管理员模块
*作者：陈年友
*日期：2019/5/5
*/
// Mock.mock(/\/admin\/listpage/, 'get', adminAPI.getAdminList)
Mock.mock(/\/admin\/remove/, 'get', adminAPI.deleteAdmin)
Mock.mock(/\/admin\/batchremove/, 'get', adminAPI.batchremove)
Mock.mock(/\/admin\/add/, 'get', adminAPI.createAdmin)
Mock.mock(/\/admin\/edit/, 'get', adminAPI.updateAdmin)

//报表相关
//Mock.mock(/\/user\/list/, 'get', monreportAPI.getUserList)
Mock.mock(/\/sale\/list/, 'get', salereportAPI.getSaleList)

//功能：销售人员相关
//作者：李娜容
//日期：2019/5/6
Mock.mock(/\/salesman\/listpage/, 'get', salesmanAPI.getSalesmanList)
Mock.mock(/\/salesman\/remove/, 'get', salesmanAPI.deleteSalesman)
Mock.mock(/\/salesman\/batchremove/, 'get', salesmanAPI.batchremove)
Mock.mock(/\/salesman\/add/, 'get', salesmanAPI.createSalesman)
Mock.mock(/\/salesman\/edit/, 'get', salesmanAPI.updateSalesman)
Mock.mock(/\/salesman\/pie/, 'get', salesmanAPI.getPieInfo)


/**
 *模块：首页
 *作者：陈年友
 *日期：2019/5/7
 */
Mock.mock(/\/home\/data/, 'get', homeAPI.getHomeData)
Mock.mock(/\/home\/sale/, 'get', homeAPI.getHomeSaleData)
Mock.mock(/\/home\/taocan/, 'get', homeAPI.getHomeTc)
Mock.mock(/\/home\/lchartdata/, 'get', homeEchartAPI.getLchartData)
Mock.mock(/\/home\/rchartdata/, 'get', homeEchartAPI.getRchartData)
Mock.mock(/\/home\/lbchartdata/, 'get', homeEchartAPI.getLbchartData)

//功能：套餐佣金相关；
// 作者：吴丽娟；
// 日期：20190507
Mock.mock(/\/taocanList\/list/, 'get', taocanListAPI.getTaocanList)
Mock.mock(/\/taocanList\/remove/, 'get', taocanListAPI.deleteTaocan)
Mock.mock(/\/taocanList\/batchremove/, 'get', taocanListAPI.batchremove)
Mock.mock(/\/taocanList\/add/, 'get', taocanListAPI.createTaocan)
Mock.mock(/\/taocanList\/edit/, 'get', taocanListAPI.updateTaocan)

/**
 *功能：个人信息修改、销售人员信息查询
 *作者：王从竹
 *日期：2019/5/9
 */
Mock.mock(/\/user\/wcz/, 'get', formAPI.getUser)
Mock.mock(/\/user\/searchtable/, 'get', searchtableAPI.getUsers)

//功能：套餐销量热力图随机数据
//作者：吴丽娟
// 日期：2019/5/9
Mock.mock(/\/salesQuantity\/list/, 'get', salesQuantityAPI.getmapdata)
export default Mock

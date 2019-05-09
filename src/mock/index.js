import Mock from 'mockjs'
import tableAPI from './table'
import loginAPI from './login'
import articleAPI from './article'
import noticeAPI from './notice'
import packageManageAPI from './packageManage'
import adminAPI from './admin'
import salesmanAPI from './salesman'
import homeAPI from './home'
import homeTcAPI from './homeTc'
import taocanListAPI from './taocanList'
// 设置全局延时 没有延时的话有时候会检测不到数据变化 建议保留
Mock.setup({
  timeout: '300-600'
})

// 登录相关
Mock.mock(/\/user\/login/, 'post', loginAPI.loginByUsername)
Mock.mock(/\/user\/logout/, 'post', loginAPI.logout)
Mock.mock(/\/user\/info\.*/, 'get', loginAPI.getUserInfo)

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
* 功能：公告相关
* */
Mock.mock(/\/notice\/listpage/, 'get', noticeAPI.getNoticeList)
Mock.mock(/\/notice\/remove/, 'get', noticeAPI.deleteNotice)
Mock.mock(/\/notice\/batchremove/, 'get', noticeAPI.batchremove)
Mock.mock(/\/notice\/add/, 'get', noticeAPI.createNotice)
Mock.mock(/\/notice\/edit/, 'get', noticeAPI.updateNotice)


//套餐管理相关
Mock.mock(/\/packageManage\/list/,packageManageAPI.getList)
Mock.mock(/\/packageManage\/detail/,packageManageAPI.getItemDetail)
Mock.mock(/\/packageManage\/create/,packageManageAPI.insertPackageInfo)
Mock.mock(/\/packageManage\/delete/,packageManageAPI.deletePackageInfo)
Mock.mock(/\/packageManage\/update/,packageManageAPI.updatePackageInfo)
Mock.mock(/\/packageManage\/setFirstPush/,packageManageAPI.setFirstPush)

//管理员相关
Mock.mock(/\/admin\/listpage/, 'get', adminAPI.getAdminList)
Mock.mock(/\/admin\/remove/, 'get', adminAPI.deleteAdmin)
Mock.mock(/\/admin\/batchremove/, 'get', adminAPI.batchremove)
Mock.mock(/\/admin\/add/, 'get', adminAPI.createAdmin)
Mock.mock(/\/admin\/edit/, 'get', adminAPI.updateAdmin)


//功能：销售人员相关
//作者：李娜容
//日期：2019/5/6
Mock.mock(/\/salesman\/listpage/, 'get', salesmanAPI.getSalesmanList)
Mock.mock(/\/salesman\/remove/, 'get', salesmanAPI.deleteSalesman)
Mock.mock(/\/salesman\/batchremove/, 'get', salesmanAPI.batchremove)
Mock.mock(/\/salesman\/add/, 'get', salesmanAPI.createSalesman)
Mock.mock(/\/salesman\/edit/, 'get', salesmanAPI.updateSalesman)
//首页相关
Mock.mock(/\/home\/data/, 'get', homeAPI.getHomeData)
Mock.mock(/\/home\/taocan/, 'get', homeTcAPI.getHomeTc)

//功能：套餐佣金相关；作者：吴丽娟；日期：20190507
Mock.mock(/\/taocanList\/list/, 'get', taocanListAPI.getTaocanList)
Mock.mock(/\/taocanList\/remove/, 'get', taocanListAPI.deleteTaocan)
Mock.mock(/\/taocanList\/batchremove/, 'get', taocanListAPI.batchremove)
Mock.mock(/\/taocanList\/add/, 'get', taocanListAPI.createTaocan)
Mock.mock(/\/taocanList\/edit/, 'get', taocanListAPI.updateTaocan)

export default Mock

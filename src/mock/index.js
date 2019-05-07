import Mock from 'mockjs'
import tableAPI from './table'
import loginAPI from './login'
import articleAPI from './article'
import packageManageAPI from './packageManage'
import adminAPI from './admin'
import homeAPI from './home'
import homeTcAPI from './homeTc'

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

//套餐管理相关
Mock.mock(/\/packageManage\/list/,packageManageAPI.getList)
Mock.mock(/\/packageManage\/detail/,packageManageAPI.getItemDetail)
Mock.mock(/\/packageManage\/create/,packageManageAPI.insertPackageInfo)
Mock.mock(/\/packageManage\/delete/,packageManageAPI.deletePackageInfo)
Mock.mock(/\/packageManage\/update/,packageManageAPI.updatePackageInfo)

//管理员相关
Mock.mock(/\/admin\/listpage/, 'get', adminAPI.getAdminList)
Mock.mock(/\/admin\/remove/, 'get', adminAPI.deleteAdmin)
Mock.mock(/\/admin\/batchremove/, 'get', adminAPI.batchremove)
Mock.mock(/\/admin\/add/, 'get', adminAPI.createAdmin)
Mock.mock(/\/admin\/edit/, 'get', adminAPI.updateAdmin)

//首页相关
Mock.mock(/\/home\/data/, 'get', homeAPI.getHomeData)
Mock.mock(/\/home\/taocan/, 'get', homeTcAPI.getHomeTc)

export default Mock

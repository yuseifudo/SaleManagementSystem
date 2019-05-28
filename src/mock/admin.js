import Mock from 'mockjs'
import { param2Obj } from '@/utils'

let List = []
const count = 60

for (let i = 0; i < count; i++) {
  List.push(Mock.mock({
    id:  Mock.Random.guid(),
    adminId:Mock.mock('@increment'),
    managerName: Mock.Random.cname(),
    loginName:Mock.mock('@word(4,6)'),
    managerSex: Mock.Random.integer(0, 1),
    'age|22-50': 30,
    managerTel:Mock.mock(/^1[3875][1-9]\d{8}/),
    managerEmail: Mock.mock('@email'),
    'role|1': [{id:1,roleName:'普通管理员'},{id:2,roleName:'超级管理员'},{id:3,roleName:'网格管理员'},{id:4,roleName:'市分管理员'},{id:5,roleName:'省分管理员'},{id:6,roleName:'集团管理员'}]
  }))
}

export default {
  getAdminList: config => {
    const { managerName,loginName,managerTel, page = 1, limit = 20 } = param2Obj(config.url)
    const mockList = List.filter(admin => {
      if (managerName && admin.managerName.indexOf(managerName) === -1) return false
      if (loginName && admin.loginName.indexOf(loginName) === -1) return false
      if (managerTel && admin.managerTel.indexOf(managerTel) === -1) return false
      return true
    })

    const pageList = mockList.filter((item, index) => index < limit * page && index >= limit * (page - 1))

    return {
      code: 0,
      data: {
        total: mockList.length,
        items: pageList
      }
    }
  },
  createAdmin: config => {
    const { id,adminId,managerName,loginName, age, managerSex,managerTel,managerEmail,role } = param2Obj(config.url)
    const roles=[{id:1,roleName:'网格管理员'},{id:2,roleName:'市分管理员'},{id:3,roleName:'省分管理员'},{id:4,roleName:'集团管理员'},{id:5,roleName:'超级管理员'}]
    // console.log('66')
    List.push({
      id: id,
      adminId: adminId,
      managerName: managerName,
      loginName: loginName,
      age: age,
      managerSex: managerSex,
      managerTel:managerTel,
      managerEmail:managerEmail,
      role:roles[role-1]
    })
    return {
      code: 0,
      data: {
        message: '添加成功'
      }
    }
  },
  deleteAdmin: config => {
    const { managerId } = param2Obj(config.url)
    List = List.filter(a => a.managerId !== managerId)
    // console.log(List)
    return {
      code: 0,
      data: {
        message: '删除成功'
      }
    }
  },
  batchremove: config => {
    let { list } = param2Obj(config.url)
    list = list.split(',')
    List = List.filter(a=> !list.includes(a.managerId))
    return {
      code: 0,
      data: {
        message: '批量删除成功'
      }
    }
  },
  updateAdmin: config => {
    const { managerId, managerName, loginName, managerSex, managerTel, managerEmail} = param2Obj(config.url)
    const managerSex_num = parseInt(managerSex)
    List.some(a => {
      if (a.managerId === managerId) {
        a.managerName = managerName
        a.loginName = loginName
        a.managerSex = managerSex_num
        a.managerTel = managerTel
        a.managerEmail = managerEmail
        return true
      }
    })
    return {
      code: 0,
      data: {
        message: '修改成功'
      }
    }
  }
}

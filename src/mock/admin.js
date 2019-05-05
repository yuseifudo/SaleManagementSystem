import Mock from 'mockjs'
import { param2Obj } from '@/utils'

let List = []
const count = 50

for (let i = 0; i < count; i++) {
  List.push(Mock.mock({
    id:  Mock.Random.guid(),
    adminId:Mock.mock('@increment'),
    name: Mock.Random.cname(),
    loginName:Mock.mock('@word(4,6)'),
    sex: Mock.Random.integer(0, 1),
    'age|22-50': 30,
    tel:Mock.mock(/^1[3875][1-9]\d{8}/),
    email: Mock.mock('@email')
  }))
}

export default {
  getAdminList: config => {
    const { name, page = 1, limit = 20 } = param2Obj(config.url)

    const mockList = List.filter(admin => {
      if (name && admin.name.indexOf(name) === -1) return false
      return true
    })

    const pageList = mockList.filter((item, index) => index < limit * page && index >= limit * (page - 1))

    return {
      code: 0,
      data: {
        total: mockList.length,
        admins: pageList
      }
    }
  },
  createAdmin: config => {
    const { id, name,loginName, age, sex,tel,email } = param2Obj(config.url)
    console.log('66')
    List.push({
      id: id,
      adminId: adminId,
      name: name,
      loginName: loginName,
      age: age,
      sex: sex,
      tel:tel,
      email:email
    })
    return {
      code: 0,
      data: {
        message: '添加成功'
      }
    }
  },
  deleteAdmin: config => {
    const { id } = param2Obj(config.url)
    List = List.filter(a => a.id !== id)
    console.log(List)
    return {
      code: 0,
      data: {
        message: '删除成功'
      }
    }
  },
  batchremove: config => {
    let { ids } = param2Obj(config.url)
    ids = ids.split(',')
    List = List.filter(a=> !ids.includes(a.id))
    return {
      code: 0,
      data: {
        message: '批量删除成功'
      }
    }
  },
  updateAdmin: config => {
    const { id, adminId, name, loginName, age, sex, tel, email } = param2Obj(config.url)
    const sex_num = parseInt(sex)
    List.some(a => {
      if (a.id === id) {
        a.adminId=adminId
        a.name = name
        a.loginName = loginName
        a.age = age
        a.sex = sex_num
        a.tel = tel
        a.email = email
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

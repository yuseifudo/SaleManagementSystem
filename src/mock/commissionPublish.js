import Mock from 'mockjs'
import { param2Obj } from '@/utils'

let List = []
const count = 60

for (let i = 0; i < count; i++) {
  List.push(Mock.mock({
    id: Mock.Random.guid(),
    title: Mock.Random.ctitle(),
    content: Mock.Random.cparagraph(3, 8),
    createDate: Mock.mock('@datetime("yyyy-MM-dd-HH:mm")')
  }))
}

export default {
  getUserList: config => {
    const { title, page = 1, limit = 20 } = param2Obj(config.url)

    const mockList = List.filter(user => {
      if (title && user.title.indexOf(title) === -1) return false
      return true
    })

    const pageList = mockList.filter((item, index) => index < limit * page && index >= limit * (page - 1))

    return {
      code: 0,
      data: {
        total: mockList.length,
        users: pageList
      }
    }
  },
  createUser: config => {
    const { id, title, content, createDate } = param2Obj(config.url)
    List.push({
      id: id,
      title: title,
      content: content,
      createDate: createDate
    })
    return {
      code: 0,
      data: {
        message: '添加成功'
      }
    }
  },
  deleteUser: config => {
    const { id } = param2Obj(config.url)
    List = List.filter(u => u.id !== id)
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
    List = List.filter(u => !ids.includes(u.id))
    return {
      code: 0,
      data: {
        message: '批量删除成功'
      }
    }
  },
  updateUser: config => {
    const { id, title, content, createDate } = param2Obj(config.url)
    // const sex_num = parseInt(sex)
    List.some(u => {
      if (u.id === id) {
        u.title = title
        u.content = content
        u.createDate = createDate
        return true
      }
    })
    return {
      code: 0,
      data: {
        message: '编辑成功'
      }
    }
  }
}

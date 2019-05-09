/*
* 作者：杨昌海
* 时间：2019.05.06
* 功能：公告信息Mock文件
*
* */
import Mock from 'mockjs'
import { param2Obj } from '@/utils'

let List = []
const count =30

for (let i = 0; i < count; i++) {
  List.push(Mock.mock({
    id: Mock.Random.guid(),
    num:Mock.mock('@increment()'),
    title: Mock.Random.ctitle(),
    content: Mock.mock('@cparagraph'),
    createDate: Mock.mock('@datetime("yyyy-MM-dd-HH:mm")')
  }))
}

export default {
  getNoticeList: config => {
    const { title,createDate,page = 1, limit = 10 } = param2Obj(config.url)

    const mockList = List.filter(notice => {
      if (title && notice.title.indexOf(title) === -1) return false

      if(createDate && notice.createDate.indexOf(createDate) === -1) return false
      return true
    })

    const pageList = mockList.filter((item, index) => index < limit * page && index >= limit * (page - 1))

    return {
      code: 0,
      data: {
        total: mockList.length,
        notices: pageList
      }
    }
  },
  createNotice: config => {
    const { id,num, title, content, createDate } = param2Obj(config.url)
    console.log('66')
    List.unshift({
      id: id,
      num:num,
      title: title,
      content: content,
      createDate: createDate,
    })
    return {
      code: 0,
      data: {
        message: '发布成功'
      }
    }
  },
  deleteNotice: config => {
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
  updateNotice: config => {
    const { id,num, title, content, createDate} = param2Obj(config.url)
    List.some(u => {
      if (u.id === id) {
        u.num=num
        u.title = title
        u.content = content.replace(/\n/g,"<br/>")
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

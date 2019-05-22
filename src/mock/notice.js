/*
* 作者：杨昌海
* 时间：2019.05.06
* 功能：公告信息Mock文件
*
* */
import Mock from 'mockjs'
import {param2Obj} from '@/utils'

let List = []
const count = 30

for (let i = 0; i < count; i++) {
  List.push(Mock.mock({
    id: Mock.Random.guid(),
    num: Mock.mock('@increment()'),
    title: Mock.Random.ctitle(),
    content: Mock.mock('@cparagraph'),
    createDate: Mock.mock('@datetime("yyyy-MM-dd-HH:mm")')
  }))
}

export default {
  getNoticeList: config => {
    console.log("config" + config)
    const {noticeTitle, updateTime, page = 1, limit = 10} = param2Obj(config.url)

    const mockList = List.filter(notice => {
      // console.log("List"+List)
      if (noticeTitle && notice.noticeTitle.indexOf(noticeTitle) === -1) return false
      if (updateTime && notice.updateTime.indexOf(updateTime) === -1) return false
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
  createNotice: config => {
    const {id, num, title, content, createDate} = param2Obj(config.url)
    // console.log('66')
    List.unshift({
      noticeId: noticeId,
      noticeTitle: noticeTitle,
      noticeContent: noticeContent,
      updateTime: updateTime,
    })
    return {
      code: 0,
      data: {
        message: '发布成功'
      }
    }
  },
  deleteNotice: config => {
    const {noticeId} = param2Obj(config.url)
    List = List.filter(u => u.noticeId !== noticeId)
    return {
      code: 0,
      data: {
        message: '删除成功'
      }
    }
  },
  batchremove: config => {
    let {ids} = param2Obj(config.url)
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
    const {noticeId, noticeTitle, noticeContent, updateTime} = param2Obj(config.url)
    List.some(u => {
      if (u.noticeId === noticeId) {
        u.noticeTitle = noticeTitle
        u.noticeContent = noticeContent.replace(/\n/g, "<br/>")
        u.updateTime = updateTime
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

// 个人信息mock数据

import Mock from 'mockjs'

let List=Mock.mock({
    'username': '@cname()',
    // 'usersex': '@integer(0, 1)',
    'usersex|1': ['男','女'],
    'native': '@county(true)',
    'nationnality|1': ['汉族','苗族','瑶族','彝族','藏族','白族'],
    'nickage|18-60': 20,
    'birth': '@date()',
    'education|1': ['大学专科','大学本科','硕士研究生','博士研究生'],
    'email': '@email',
    'telphone': /^1[385][1-9]\d{8}/

  })

export default {
  getUser: () => {
    return {
      code: 0,
      data: {
        users: List
      }
    }
  }

}

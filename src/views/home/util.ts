import { menuItems } from '@/views/home/top-banner/type.ts'
import { UserType } from '@/api/global/enum.ts'

export function switchType(type: UserType, choices: menuItems[]) {
  choices.splice(0, choices.length)
  switch (type) {
    case UserType.VISITOR:
      choices.push({
        name: '想发布一个交易？',
        subname: '成为验证会员!',
        action: '/upgrade'
      })
      break
    case UserType.UNKNOWN:
      choices.push({
        name: '似乎您并没有完成身份验证？',
        subname: '验证身份',
        action: '/verify'
      })
      break
    case UserType.STUDENT:
      // todo add upgrade to company / run a business option
      choices.push({
        name: '新建交易',
        subname: '出售/收购 物品/技能',
        action: '/publish'
      })
      break
    case UserType.COMPANY:
      // todo add company option
      break
  }
}
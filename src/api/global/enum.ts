export enum UserType{
    STUDENT = "STUDENT",
    COMPANY = "COMPANY",
    UNKNOWN = "UNKNOWN",
    VISITOR = "VISITOR"
}

export enum GoodsType{
    OBJECT="OBJECT",
    FAVOUR="FAVOUR"
}

export enum IOType{
    SELLING="SELLING",
    ACQUISITION="ACQUISITION"
}

export enum ContactType{
    EMAIL="EMAIL",
    PHONE="PHONE",
    QQ="QQ",
    WECHAT="WECHAT"
}


export function enumLocalize(value: UserType | GoodsType | IOType | ContactType){
    switch(value){
        case UserType.STUDENT:
            return "学生"
        case UserType.COMPANY:
            return "企业"
        case UserType.UNKNOWN:
            return "未验证会员"
        case UserType.VISITOR:
            return "游客"
        case GoodsType.OBJECT:
            return "实物"
        case GoodsType.FAVOUR:
            return "虚拟"
        case IOType.SELLING:
            return "出售"
        case IOType.ACQUISITION:
            return "求购"
        case ContactType.EMAIL:
            return "邮箱"
        case ContactType.PHONE:
            return "电话"
        case ContactType.QQ:
            return "QQ"
        case ContactType.WECHAT:
            return "微信"
    }
}
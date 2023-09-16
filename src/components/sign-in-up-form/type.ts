export enum IdentifierType{
    USER_ID = 'USER_ID',
    EMAIL = 'EMAIL',
    PHONE = 'PHONE',
    QQ = 'QQ',
    WECHAT = 'WECHAT'
}

export enum Template{
    EMAIL = /^\w+(?:[-+.]\w+)*@\w+(?:[-.]\w+)*\.\w+(?:[-.]\w+)*$/,
    PHONE = /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/,
    WECHAT = /^[a-zA-Z]\w+$/,
    QQ = /^[1-9][0-9]{4,10}$/,
    USER_ID = /^[1-9][0-9]+$/
}

export function possibleTypes(identifier: string): IdentifierType[]{
    const ret = []
    if (identifier.match(Template.EMAIL))
        return [IdentifierType.EMAIL]

    if (identifier.match(Template.WECHAT))
        ret.push(IdentifierType.WECHAT)

    if (identifier.match(Template.USER_ID)){
        ret.push(IdentifierType.USER_ID)

        if (identifier.match(Template.QQ))
            ret.push(IdentifierType.QQ)

        if (identifier.match(Template.PHONE))
            ret.push(IdentifierType.PHONE)
    }

}

export function typeToTemplate(type: IdentifierType): RegExp | null{
    switch (type){
        case IdentifierType.EMAIL:
            return Template.EMAIL
        case IdentifierType.PHONE:
            return Template.PHONE
        case IdentifierType.QQ:
            return Template.QQ
        case IdentifierType.WECHAT:
            return Template.WECHAT
        case IdentifierType.USER_ID:
            return Template.USER_ID
        default:
            return null
    }
}
export interface menuItems {
    disable: boolean
    loading: boolean
    color: string
    name: string
    subname: string
    action: string | (() => void)
}
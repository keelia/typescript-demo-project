import { AccountCategory } from "./account-category.enum"
import { AccountType } from "./account-type.enum"
import { AccountValueType } from "./account-value-type.enum"

export class Account{
    account_category: AccountCategory
    account_code:string
    account_currency: string
    account_identifier: string
    account_status: string
    value_type: AccountValueType
    account_name: string
    account_type: AccountType
    account_type_bank: string
    system_account: string
    total_value: number
    constructor(prop:any = {}){
        this.account_category = prop.account_category
        this.account_code = prop.account_code
        this.account_currency = prop.account_currency
        this.account_identifier = prop.account_identifier
        this.account_status = prop.account_status
        this.value_type = prop.value_type
        this.account_name = prop.account_name
        this.account_type = prop.account_type
        this.account_type_bank = prop.account_type_bank
        this.system_account = prop.system_account
        this.total_value = prop.total_value
    }
}
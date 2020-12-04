import { Account } from '../@types/account.model';
import { AccountCategory } from '../@types/account-category.enum';
import { AccountType } from '../@types/account-type.enum';
import { AccountValueType } from '../@types/account-value-type.enum';
import {  formater } from "./formater";
export const calculator:{[key:string]:Function} = {
    revenue(accounts:Account[]):number{
        return (accounts || []).filter(account=>(account && account.account_category) === AccountCategory.REVENUE)
        .map(account=>(isNaN(Number(account.total_value)) ? 0 :(isFinite(Number(account.total_value)) ? Number(account.total_value) : 0)))
        .reduce((a,c)=>a+c,0)
    },
    formatedRevenue(accounts:Account[]):string{
        return formater.toCurrency(this.revenue(accounts))
    },
    expenses(accounts:Account[]):number{
        return (accounts || []).filter(account=>(account && account.account_category) === AccountCategory.EXPENSE)
        .map(account=>(isNaN(Number(account.total_value)) ? 0 :(isFinite(Number(account.total_value)) ? Number(account.total_value) : 0)))
        .reduce((a,c)=>a+c,0)
    },
    formatedExpenses(accounts:Account[]):string{
        return formater.toCurrency(this.expenses(accounts))
    },
    grossProfitMargin(accounts:Account[]):number{
        //This is calculated in two steps: 
        //first by adding all the total_value fields where the account_type is set to sales and the value_type is set to debit;
        // then dividing that by the revenue value calculated earlier to generate a percentage value.
        const numerator:number = (accounts || []).filter(account=>((account && account.account_type) === AccountType.SALES) && (account && account.value_type) === AccountValueType.DEBIT)
            .map(account=>(isNaN(Number(account.total_value)) ? 0 :(isFinite(Number(account.total_value)) ? Number(account.total_value) : 0)))
            .reduce((a,c)=>a+c,0)
        const denominator:number = this.revenue(accounts)
        return isFinite(numerator/denominator) ? numerator/denominator : 0
    },
    formatedGrossProfitMargin(accounts:Account[]):string{
        return formater.toPercentage(this.grossProfitMargin(accounts))
    },
    netProfitMargin(accounts:Account[]):number{
        //This metric is calculated by subtracting the expenses value from the revenue value and dividing the remainder by revenue to calculate a percentage.
        const numerator:number = this.revenue(accounts) - this.expenses(accounts)
        const denominator:number = this.revenue(accounts)
        return isFinite(numerator/denominator) ? numerator/denominator : 0
    },
    formatedNetProfitMargin(accounts:Account[]):string{
        return formater.toPercentage(this.netProfitMargin(accounts))
    },
    workingCapitalRatio(accounts:Account[]):number{
        const assets1 = (accounts || [])
            .filter(account=>(
                    (account && account.account_category) === AccountCategory.ASSETS) 
                        && ((account && account.value_type) === AccountValueType.DEBIT)
                        && ([AccountType.CURRENT,AccountType.BANK,AccountType.CURRENT_ACCOUNTS_RECEIVABLE].some(type=>type ===(account && account.account_type))))
            .map(account=>(isNaN(Number(account.total_value)) ? 0 :(isFinite(Number(account.total_value)) ? Number(account.total_value) : 0)))
            .reduce((a,c)=>a+c,0)

        const assets2 = (accounts || [])
            .filter(account=>(
                    (account && account.account_category) === AccountCategory.ASSETS) 
                        && ((account && account.value_type) === AccountValueType.CREDIT)
                        && ([AccountType.CURRENT,AccountType.BANK,AccountType.CURRENT_ACCOUNTS_RECEIVABLE].some(type=>type ===(account && account.account_type))))
            .map(account=>(isNaN(Number(account.total_value)) ? 0 :(isFinite(Number(account.total_value)) ? Number(account.total_value) : 0)))
            .reduce((a,c)=>a+c,0)

        const liabilities1 = (accounts || [])
            .filter(account=>(
                    (account && account.account_category) === AccountCategory.LIABILITY) 
                        && ((account && account.value_type) === AccountValueType.CREDIT)
                        && ([AccountType.CURRENT,AccountType.CURRENT_ACCOUNTS_PAYABLE].some(type=>type ===(account && account.account_type))))
            .map(account=>(isNaN(Number(account.total_value)) ? 0 :(isFinite(Number(account.total_value)) ? Number(account.total_value) : 0)))
            .reduce((a,c)=>a+c,0)

        const liabilities2 = (accounts || [])
            .filter(account=>(
                    (account && account.account_category) === AccountCategory.LIABILITY) 
                        && ((account && account.value_type) === AccountValueType.DEBIT)
                        && ([AccountType.CURRENT,AccountType.CURRENT_ACCOUNTS_PAYABLE].some(type=>type ===(account && account.account_type))))
            .map(account=>(isNaN(Number(account.total_value)) ? 0 :(isFinite(Number(account.total_value)) ? Number(account.total_value) : 0)))
            .reduce((a,c)=>a+c,0)

        const numerator:number = assets1 - assets2
        const denominator:number = liabilities1 - liabilities2
        return isFinite(numerator/denominator) ? numerator/denominator : 0
    },
    formatedWorkingCapitalRatio(accounts:Account[]):string{
        return formater.toPercentage(this.workingCapitalRatio(accounts))
    }
}
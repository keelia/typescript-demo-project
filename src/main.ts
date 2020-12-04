import './style.css';
const DB = require('../public/data.json')
import { calculator } from "./lib/calculator";
const displayResult = (accounts:Account[])=>{
    const resultDom = document.createElement('ul')
    resultDom.id = 'result';
    const displayData:{[key:string]:string} = {
        Revenue: calculator.formatedRevenue(accounts),
        Expenses : calculator.formatedExpenses(accounts),
        'Gross Profit Margin' : calculator.formatedGrossProfitMargin(accounts),
        'Net Profit Margin' : calculator.formatedNetProfitMargin(accounts),
        'Working Capital Ratio' : calculator.formatedWorkingCapitalRatio(accounts)
    }
    Object.keys(displayData).map((type)=>{
        const li = document.createElement('li')
        li.innerText = `${type} : ${displayData[type]}`
        resultDom.appendChild(li)
    })
    document.body.appendChild(resultDom)
}

displayResult(DB.data)


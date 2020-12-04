export const formater = {
    toPercentage(num:number):string{
        return (isNaN(Number(num) * 100) || !isFinite(Number(num) * 100)) ? '-' : `${(Number(num)*100).toFixed(1)}%`
    },
    toCurrency(num:number):string{
        //thousands, millions, billions, and trillions
        const divider:{[key:string]:number} = {
            T:1.0e+12,
            B:1.0e+9,
            M:1.0e+6,
            K:1.0e+3
        }
        let base= Math.abs(Number(num))
        const parts:number[] = []
        Object.keys(divider).map(key=>{
            if(base >= (divider[key])){
                parts.push(Math.floor(base/divider[key]))
                base-= Math.floor(base/divider[key]) * divider[key]
            }
        })
        base =  Number(base.toFixed(0))
        let prefixedBase = base.toString()
        while(prefixedBase.length < 3){
            prefixedBase+='0'
        }
        return `$${num < 0 ? '-':''}${parts.length > 0 ? parts.join(',') + ',' + prefixedBase  :prefixedBase}`
    }
}
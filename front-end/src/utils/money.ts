export function formatMoney(money: number | string){
    return `R$${Number(money).toFixed(2)}`
}
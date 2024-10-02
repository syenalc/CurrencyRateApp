export interface Rate{
    id:string;
    name:string;
    currencyPair:string;
    exchangeRate:number | null;
    timestamp:string;
}
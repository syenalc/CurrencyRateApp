import React, { useState, createContext, ReactNode , Dispatch, SetStateAction, useEffect } from "react";

interface CountryType {
    code: string;
    label: string;
    currency: string;
  }
  
interface CurrencyData {
    success: boolean;
    query: {
        from: string;
        to: string;
        amount: number;
    };
    info: {
        rate: number;
    };
    result: number;
}
interface CurrencyContextProps {
    val1: CountryType | null;
    val2: CountryType | null;
    setVal1: Dispatch<SetStateAction<CountryType | null>>;
    setVal2: Dispatch<SetStateAction<CountryType | null>>;
    from: string |null ;
    to: string |null ;
    rate:number |null;
    setFrom: Dispatch<SetStateAction<string | null>> ;
    setTo: Dispatch<SetStateAction<string | null>> ;
    setRate: Dispatch<SetStateAction<number | null>> ;
    rate1:number |null;
    rate2:number |null;
    rate3:number |null;
    rate4:number |null;
    setRate1: Dispatch<SetStateAction<number | null>> ;
    setRate2: Dispatch<SetStateAction<number | null>> ;
    setRate3: Dispatch<SetStateAction<number | null>> ;
    setRate4: Dispatch<SetStateAction<number | null>> ;
}


export const CurrencyContext=createContext<CurrencyContextProps | undefined>(undefined);


export const CurrencyProvider:React.FC<{children:ReactNode}>=({children})=>{
    
    const [val1,setVal1]=useState<any>(null);
    const [val2,setVal2]=useState<any>(null);
    const [rate, setRate] = useState<number | null>(null);
    const [from, setFrom] = useState<string | null>(null);
    const [to, setTo] = useState<string | null>(null);

    const [rate1, setRate1] = useState<number | null>(null);
    const [rate2, setRate2] = useState<number | null>(null);
    const [rate3, setRate3] = useState<number | null>(null);
    const [rate4, setRate4] = useState<number | null>(null);

    
    return(
        <CurrencyContext.Provider value={{val1,val2,setVal1,setVal2,rate,from,to,setRate,setFrom,setTo,rate1,rate2,rate3,rate4,setRate1,setRate2,setRate3,setRate4}}>
            {children}
        </CurrencyContext.Provider>
    );
};
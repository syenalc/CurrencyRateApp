import React, { useState, createContext, ReactNode , Dispatch, SetStateAction, useEffect } from "react";

interface CountryType {
    code: string;
    label: string;
    currency: string;
  }
  
// interface CurrencyData {
//     success: boolean;
//     query: {
//         from: string;
//         to: string;
//         amount: number;
//     };
//     info: {
//         rate: number;
//     };
//     result: number;
// }
interface CurrencyContextProps {
    leftValue: CountryType | null;
    rightValue: CountryType | null;
    setLeftValue: Dispatch<SetStateAction<CountryType | null>>;
    setRightValue: Dispatch<SetStateAction<CountryType | null>>;
    from: string |null ;
    to: string |null ;
    rate:number |null;
    setFrom: Dispatch<SetStateAction<string | null>> ;
    setTo: Dispatch<SetStateAction<string | null>> ;
    setRate: Dispatch<SetStateAction<number | null>> ;
    rate1week:number |null;
    rate2week:number |null;
    rate3week:number |null;
    rate4week:number |null;
    setRate1Week: Dispatch<SetStateAction<number | null>> ;
    setRate2Week: Dispatch<SetStateAction<number | null>> ;
    setRate3Week: Dispatch<SetStateAction<number | null>> ;
    setRate4Week: Dispatch<SetStateAction<number | null>> ;
    isLoggedIn:boolean;
    setIsLoggedIn:React.Dispatch<React.SetStateAction<boolean>>;
    username:string;
    setUsername:React.Dispatch<React.SetStateAction<string>>;
}


export const CurrencyContext=createContext<CurrencyContextProps | undefined>(undefined);


export const CurrencyProvider:React.FC<{children:ReactNode}>=({children})=>{
    
    //leftValue, rightValueはオブジェクト, from, toはオブジェクトのcurrency(EURなど)
    const [leftValue,setLeftValue]=useState<any>(null);
    const [rightValue,setRightValue]=useState<any>(null);
    const [rate, setRate] = useState<number | null>(null);
    const [from, setFrom] = useState<string | null>(null);
    const [to, setTo] = useState<string | null>(null);

    const [rate1week, setRate1Week] = useState<number | null>(null);
    const [rate2week, setRate2Week] = useState<number | null>(null);
    const [rate3week, setRate3Week] = useState<number | null>(null);
    const [rate4week, setRate4Week] = useState<number | null>(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [username, setUsername]=useState('');

    
    return(
        <CurrencyContext.Provider value={{
            leftValue,
            rightValue,
            setLeftValue,
            setRightValue,
            rate,
            from,
            to,
            setRate,
            setFrom,
            setTo,
            rate1week,
            rate2week,
            rate3week,
            rate4week,
            setRate1Week,
            setRate2Week,
            setRate3Week,
            setRate4Week,
            isLoggedIn,
            setIsLoggedIn,
            username,
            setUsername,
        }}>
            {children}
        </CurrencyContext.Provider>
    );
};
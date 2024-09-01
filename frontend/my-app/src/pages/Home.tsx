import { Box, Typography } from "@mui/material";
import React from "react";
import CountrySelect from "../components/CountrySelect";
// import RateButton from "../components/RateButton";
import { useEffect,useContext } from "react";
import { CurrencyContext } from "../context/CurrencyContext";
import FormDialog from "../components/CreateBoards";
import OutlinedCard from "../components/Boards";
import { Item } from "../utils/items.model";
import { findAll } from "../utils/api";

// interface HomeProps{
//     linkDisabled:boolean;
//     setLinkDisable:React.Dispatch<React.SetStateAction<boolean>>;
// }

// {linkDisabled,setLinkDisable}:HomeProps

const Home=()=>{
    const currencyContext = useContext(CurrencyContext);

    if (!currencyContext) {
        throw new Error('CurrencySelect must be used within a CurrencyProvider');
    }

    const { setFrom,setTo,setRate} = currencyContext;
    const storedTrigger = localStorage.getItem('trigger');
    const parsedTrigger:boolean = storedTrigger !==null ? JSON.parse(storedTrigger) : false;

    const newFrom= localStorage.getItem('from');
    const newTo= localStorage.getItem('to');
    const newRate= localStorage.getItem('rate');
    useEffect(() => {
        // const savedVal1 = localStorage.getItem('val1');
        // const savedVal2 = localStorage.getItem('val2');

        // // const savedVal1 = localStorage.getItem('val1');
        // // const savedVal2 = localStorage.getItem('val2');
        // // if (savedVal1) setVal1(JSON.parse(savedVal1));
        // // if (savedVal2) setVal2(JSON.parse(savedVal2));
        // //storedTriggerはstring
        
        // // if (storedTrigger !== null) {
        // //     const parsedTrigger = JSON.parse(storedTrigger);
        // // }
        // //ReactのStrictモードにより2回実行されてしまうため、
        // // if (val1 && savedVal1) console.log(savedVal1.currency);
        // // if (val2 && savedVal2) console.log(savedVal2.currency);
        
        // const savedCurrency1 = localStorage.getItem('currency1');
        // const savedCurrency2 = localStorage.getItem('currency2');
        // console.log(savedCurrency1);
        // console.log(savedCurrency2);

        // fromやtoの値を設定する
        if (newFrom) setFrom(JSON.parse(newFrom));
        if (newTo) setTo(JSON.parse(newTo));
        if (newRate) setRate(JSON.parse(newRate));
    }, []);
    
    
    // useEffect(() => {
    //     // Homeに戻ってきたときに初期化処理を行う
    //     // 必要に応じて初期化処理を追加します
    //     console.log("Home component mounted");
    //     return () => {
    //         console.log("Home component unmounted");
    //     };
    // }, []);
    const [items, setItems] = React.useState<Item[]>([]);

    const fetchItems = async () => {
    const data = await findAll();
    if (data) {
      setItems(data);
    }
    };

    React.useEffect(() => {
        fetchItems();
    }, []);
    return(
    <>
        <Box sx={{padding:"50px"}}>
            {/* linkDisabled={linkDisabled} setLinkDisable={setLinkDisable} */}
            <CountrySelect parsedTrigger={parsedTrigger}/>
        </Box>
        <Typography 
        sx={{textAlign:"center",fontSize:"40px"}} variant="h2" 
        fontWeight={"fontWeightRegular"}
        >為替速報掲示板
        </Typography>
        <FormDialog onNewItemCreated={fetchItems} />
        <Box>
        {items.map((item)=>(
            <OutlinedCard
            key={item.id}
            item={item}
            sx={{textAlign:"center", padding:"50px"}}
            
            />
        ))}
        </Box>
    </>
    );
}

export default Home;
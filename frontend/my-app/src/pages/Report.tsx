import { useContext } from "react";
import { LineChart } from '@mui/x-charts/LineChart';
import { Box, Typography } from "@mui/material";
import { CurrencyContext } from "../context/CurrencyContext";


const Report=()=>{
    const currencyContextReport = useContext(CurrencyContext);

    if (!currencyContextReport) {
        throw new Error('CurrencySelect must be used within a CurrencyProvider');
    }

    const {rate,rate1week,rate2week,rate3week,rate4week} = currencyContextReport;
    
    const timeData:string[] = ["4週間前","3週間前","2週間前","1週間前","今日"]

    const valueFormatter = (value: any) => {
            return timeData[value];
    };
    // timeDataを数値の配列にマッピングする
    const numericXAxisData = timeData.map((_, index) => index);

    return(
        <>
            <Box  width={"50%"} margin="auto" textAlign={"center"}>
            <Typography><p style={{textAlign:"center", fontSize:"24px",marginTop:"40px"}}>過去1カ月間の推移</p></Typography>
            <LineChart
                series={[
                { curve: "linear", data: [rate4week, rate3week, rate2week, rate1week, rate] },
                ]}
                xAxis={[
                    {
                      data: numericXAxisData, // x軸にインデックスを使用
                      scaleType: "band",
                      dataKey: 'month',
                      valueFormatter,
                    }
                ]}
                width={600} 
                height={300} 
                sx={{textAlign:"center",margin:"auto"}}
                // ...
            />
            </Box>
        </>

    );
}

export default Report;



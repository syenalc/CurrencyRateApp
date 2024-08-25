import React, { useContext } from "react";
import { LineChart } from '@mui/x-charts/LineChart';
// import { Chart, LineElement, CategoryScale, LinearScale, PointElement, Title, Tooltip, Legend } from 'chart.js';
import { Box, Typography } from "@mui/material";
import { CurrencyContext } from "../context/CurrencyContext";


const Report=()=>{
    const currencyContext2 = useContext(CurrencyContext);

    if (!currencyContext2) {
        throw new Error('CurrencySelect must be used within a CurrencyProvider');
    }

    const {rate,rate1,rate2,rate3,rate4} = currencyContext2;
    
    const timeData:string[] = ["4週間前","3週間前","2週間前","1週間前","今日"]

    // const valueFormatter = (p) =>{
    const valueFormatter = (value: any) => {
            return timeData[value];
    };
    // timeDataを数値の配列にマッピングする
    const numericXAxisData = timeData.map((_, index) => index);

    // //過去1カ月のrateをストレージに保存する
    // if (rate) localStorage.setItem('rate', JSON.stringify(rate));
    // if (rate1) localStorage.setItem('rate1', JSON.stringify(rate1));
    // if (rate2) localStorage.setItem('rate2', JSON.stringify(rate2));
    // if (rate3) localStorage.setItem('rate3', JSON.stringify(rate3));
    // if (rate4) localStorage.setItem('rate4', JSON.stringify(rate4));

    // }
    // const xAxisData = [
    //     new Date("2023-12-04"),
    //     new Date("2023-12-05"),
    //     new Date("2023-12-06"),
    //     new Date("2023-12-07"),
    //     new Date("2023-12-08"),
    //     new Date("2023-12-09"),
    //     new Date("2023-12-10"),
    // ];
    // const xAxisCommon = {
    //     data: timeData,
    //     scaleType: 'time',
    //     valueFormatter,
    //   } as const;
    return(
        <>
            <Box  width={"50%"} margin="auto" textAlign={"center"}>
            <Typography><p style={{textAlign:"center", fontSize:"24px",marginTop:"40px"}}>過去1カ月間の推移</p></Typography>
            <LineChart
                series={[
                { curve: "linear", data: [rate4, rate3, rate2, rate1, rate] },
                ]}
                xAxis={[
                    {
                    //   label: "Date",
                      data: numericXAxisData, // x軸にインデックスを使用
                      scaleType: "band",
                      dataKey: 'month',
                      valueFormatter,
                    }
                ]}
                
          
                width={600} // 必要な場合は他のプロパティも追加
                height={300} // 必要な場合は他のプロパティも追加
                sx={{textAlign:"center",margin:"auto"}}
                // ...
            />
            </Box>
        </>

    );
}

export default Report;

// import React from "react";
// import { Line } from 'react-chartjs-2';
// import { Chart, LineElement, CategoryScale, LinearScale, PointElement, Title, Tooltip, Legend } from 'chart.js';
// import { Typography } from "@mui/material";

// Chart.register(LineElement, CategoryScale, LinearScale, PointElement, Title, Tooltip, Legend);

// const data = {
//     labels: ['Point 1', 'Point 2', 'Point 3', 'Point 4', 'Point 5', 'Point 6'],
//     datasets: [
//         {
//             label: 'Series 1',
//             data: [0, 5, 2, 6, 3, 9.3],
//             fill: false,
//             borderColor: 'rgb(75, 192, 192)',
//             tension: 0.1
//         },
//         {
//             label: 'Series 2',
//             data: [6, 3, 7, 9.5, 4, 2],
//             fill: false,
//             borderColor: 'rgb(153, 102, 255)',
//             tension: 0.1
//         }
//     ]
// };

// const options = {
//     responsive: true,
//     plugins: {
//         legend: {
//             position: 'top',
//         },
//         title: {
//             display: true,
//             text: 'Line Chart Example'
//         }
//     }
// };

// const Report = () => {
//     return (
//         <>
//             <Typography>Report</Typography>
//             <Line data={data} options={options} />
//         </>
//     );
// };

// export default Report;

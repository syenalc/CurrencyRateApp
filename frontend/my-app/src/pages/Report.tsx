import { useContext, useEffect, useState } from "react";
import { LineChart } from '@mui/x-charts/LineChart';
import { Box, Typography } from "@mui/material";
import { CurrencyContext } from "../context/CurrencyContext";
import { getPastRate, saveRate } from "../utils/api";
import { Rate } from '../utils/rate.model';
import { v4 as uuidv4 } from 'uuid'; 

const Report=()=>{
    const currencyContextReport = useContext(CurrencyContext);

    if (!currencyContextReport) {
        throw new Error('currencyContextReportは呼び出せませんでした。');
    }
    
    const {from,to,username,rate,beforeRate,setBeforeRate} = currencyContextReport;
    const currencyPair=`${from}${to}`;
    const [lastVisit, setLastVisit]=useState<string | null>(null);
    const [error, setError] = useState<string | null>(null); // エラーメッセージの状態
    
    
    const fetchItems = async () => {
        try {
            // API呼び出しをデバッグするためのログ
            console.log('API呼び出し開始:', username, currencyPair);
    
            const data = await getPastRate(username, currencyPair);
    
            // APIからのレスポンスデータを確認
            console.log('APIから取得したデータ:', data);
    
            if (data) {
                setBeforeRate(data.exchangeRate);
    
                if (data.timestamp && typeof data.timestamp === 'string') {
                    setLastVisit(data.timestamp.split('T')[0]);
                } else {
                    console.warn('タイムスタンプが無効または存在しません:', data.timestamp);
                    setLastVisit("なし");
                }
            } else {
                console.warn('データが存在しません');
                setLastVisit("なし");
            }
        } catch (error) {
            // APIリクエスト失敗時の詳細なエラーログ
            console.error('APIリクエストに失敗しました。エラー内容:', error);
            setLastVisit("取得できませんでした");
        }
    };
    
    const saveRateFunction = async () => { 
        try {
            // from と to が null でないことを確認
            if (from == null || to == null) {
                setError('通貨が選択されていません。');
                return; // 処理を中断
            }
    
            const latestRate: Rate = {
                id: uuidv4(),  // UUIDを生成
                name: username,
                currencyPair: `${from}${to}`, // from と to を文字列として結合
                exchangeRate: rate,
                timestamp: new Date().toISOString(),
            };
    
            await saveRate(latestRate);
            console.log("為替レートの保存に成功")

        } catch (e) {
            console.error('エラーが発生しました', e);
            setError('最新為替レートの保存に失敗しました。もう一度お試しください。');
        }
    };

    useEffect(() => {
        const fetchDataAndSaveRate = async () => {
            try {
                await fetchItems();  // fetchItemsが完了するまで待つ
                await saveRateFunction();  // fetchItemsが終わったらsaveRateFunctionを実行
            } catch (error) {
                console.error('エラーが発生しました:', error);
            }
        };
    
        fetchDataAndSaveRate();
    }, []);
    

    const timeData:string[] = [`前回訪問時(${lastVisit})`,"今日"]
    const valueFormatter = (value: any) => {
            return timeData[value];
    };
    // timeDataを数値の配列にマッピングする
    const numericXAxisData = timeData.map((_, index) => index);

    return(
        <>
            <Box  width={"50%"} margin="auto" textAlign={"center"}>
            <Typography><p style={{textAlign:"center", fontSize:"24px",marginTop:"40px"}}>為替レートの推移</p></Typography>
            <LineChart
                series={[
                { curve: "linear", data: [beforeRate, rate] },
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



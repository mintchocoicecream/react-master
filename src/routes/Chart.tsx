import { useQuery } from "react-query";
import { useOutletContext} from "react-router-dom"
import { fetchCoinHistory } from "../api";
import ApexChart from "react-apexcharts";
import { isDarkAtom } from "../atoms";
import {useRecoilValue} from "recoil";

interface ChartProps{
    coinId: string;
    // isDark: boolean;
}

interface Ihitorical{
    time_open: number,
    time_close: number,
    open: string,
    high:string,
    low:string,
    close:string,
    volume:string, 
    market_cap:number,
}

export default function Chart(){
    const {coinId}=useOutletContext<ChartProps>();
    // const {isDark}=useOutletContext<ChartProps>();
    const isDark=useRecoilValue(isDarkAtom);
    const {isLoading, data}=useQuery<Ihitorical[]>(
        ["ohlcv", coinId], 
        ()=> fetchCoinHistory(coinId),
        {
            refetchInterval: 10000,
        }
        );
    return (
        <div>
            {
                isLoading? 
                    "Loading chart..." 
                    :(
                    <>
                        {/* <p>{coinId}</p> */}
                        <ApexChart 
                            type="line" 
                            series={[
                                {
                                    name: "price",
                                    data: data?.map((price)=>parseFloat(price.close))??[], //[]를 붙여주는 이유는 데이터가 null이 되는 것을 방지함. null대신 빈 배열 반환.
                                },
                            ]}
                            options={{
                                theme:{
                                    mode: isDark? "dark": "light",
                                },
                                chart:{
                                    height: 300,
                                    width: 500,
                                    background: "transparent",
                                    toolbar: {
                                        show: false,
                                    },
                                },
                                grid:{show:false},
                                stroke:{
                                    curve: "smooth",
                                    width: 3,
                                },
                                yaxis: {show:false},
                                xaxis:{
                                    labels: {show: false,},
                                    axisBorder: {show:false},
                                    axisTicks: {show:false},
                                    type: "datetime",
                                    categories: data?.map((price)=>new Date(price.time_close*1000).toISOString()),
                                },
                                fill: {
                                    type:"gradient", 
                                    gradient:{gradientToColors:["#0be881"], stops: [0,100]},
                                },
                                colors: ["#0fbcf9"],
                                tooltip:{
                                    y: {
                                        formatter: (value)=> `$ ${value.toFixed(2)}`
                                    }
                                },
                        }}/>
                    </>
                )
            }
        </div>
    )
}

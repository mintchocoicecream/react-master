import { useQuery } from "react-query";
import { useOutletContext} from "react-router-dom"
import { fetchCoinHistory } from "../api";
import ApexChart from "react-apexcharts";

interface ChartProps{
    coinId: string;
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
    const {isLoading, data}=useQuery<Ihitorical[]>(["ohlcv", coinId], ()=> fetchCoinHistory(coinId));
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
                                    mode:"dark",
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
                                },
                        }}/>
                    </>
                )
            }
        </div>
    )
}

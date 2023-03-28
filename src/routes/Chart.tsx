import { useQuery } from "react-query";
import { useOutletContext} from "react-router-dom"
import { fetchCoinHistory } from "../api";

interface ChartProps{
    coinId: string;
}

export default function Chart(){
    const {coinId}=useOutletContext<ChartProps>();
    const {isLoading, data}=useQuery(["ohlcv", coinId], ()=> fetchCoinHistory(coinId));
    return (
        <>
            <h1>Chart</h1>
            <p>{coinId}</p>
        </>
    )
}

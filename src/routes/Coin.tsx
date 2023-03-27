import axios from "axios";
import { useState, useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";
import styled from "styled-components";

const Container=styled.div`
    padding: 0 20px;
    max-width: 480px;
    margin: 0 auto;
`;

const Header=styled.header`
    height: 10vh;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const Title = styled.h1`
  font-size: 48px;
  color: ${(props) => props.theme.accentColor};
`;

const Loader = styled.span`
  text-align: center;
  display: block;
`;

interface RouteParams{
    coinId: string;
}

interface RouterState{
    state:string;
};

interface InfoData{
    id: string;
    name: string;
    symbol: string;
    rank: number;
    is_new: boolean;
    is_active: boolean;
    type: string;
    logo: string;
    description: string;
    message: string;
    open_source: boolean;
    started_at: string;
    development_status: string;
    hardware_wallet: boolean;
    proof_type: string;
    org_structure: string;
    hash_algorithm: string;
    first_data_at: string;
    last_data_at: string;
};

interface PriceData{
    id: string;
    name: string;
    symbol: string;
    rank: number;
    circulating_supply: number;
    total_supply: number;
    max_supply: number;
    beta_value: number;
    first_data_at: string;
    last_updated:string;
    quotes: {
        USD: {
            ath_date: string;
            ath_price: number;
            market_cap: number;
            market_cap_change_24h: number;
            percent_change_1h: number;
            percent_change_1y: number;
            percent_change_6h: number;
            percent_change_7d: number;
            percent_change_12h: number;
            percent_change_15m: number;
            percent_change_24h: number;
            percent_change_30d: number;
            percent_change_30m: number;
            percent_from_price_ath: number;
            price: number;
            volume_24h: number;
            volume_24h_change_24h: number;
          };
    };
};

function Coin(){
    const [loading, setLoading]=useState(true);
    const {coinId}=useParams();
    const {state}=useLocation() as RouterState;
    const [info, setInfo]=useState<InfoData>();
    const [priceInfo, setPriceInfo]=useState<PriceData>();
    useEffect(()=>{
        (async()=>{
            const infoData=await axios(`https://api.coinpaprika.com/v1/coins/${coinId}`);
            const priceData=await axios({
                method: 'get',
                url: `https://api.coinpaprika.com/v1/tickers/${coinId}`,
            })
                .then(function(response){
                    return response.data;
                });
            // console.log(infoData.data);
            // console.log(priceData);
            setInfo(infoData.data);
            setPriceInfo(priceData.data);
        })();
    },[]);
    return (
    <Container>
        <Header>
            <Title>{state? state:"Loading..."}</Title>
        </Header>
        {loading? <Loader>Loading...</Loader> : null}
    </Container>
    )
}

export default Coin;
import axios from "axios";
import { useState, useEffect } from "react";
import { Link, Outlet, useLocation, useMatch, useParams } from "react-router-dom";
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

const Overview = styled.div`
    display: flex;
    justify-content: space-between;
    background-color: rgba(0,0,0,0.5);
    padding: 10px 20px;
    border-radius: 10px;
`;

const OverviewItem =styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;

    span:first-child{
        font-size: 10px;
        font-weight: 400;
        text-transform: uppercase;
        margin-bottom: 5px;
    }
`;

const Descriptsion=styled.p`
    margin: 20px 0px;
`;

const Tabs=styled.div`
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    margin: 25px 0px;
    gap: 10px;
`;

//Tab styled component는 isActive라고 불리는 prop을 가질 것.
const Tab=styled.span<{isActive:boolean}>`
    text-align: center;
    text-transform: uppercase;
    font-size: 12px;
    font-weight: 400;
    background-color: rgba(0,0,0,0.5);
    border-radius: 10px;
    transition: background-color .2s ease-in;
    cursor: pointer;
    color: ${props => props.isActive ? props.theme.accentColor : props.theme.textColor };
    &:hover{
            background-color: rgba(0,0,0);
        }
    a{
        padding: 7px 0px;
        display: block;
    }
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

    // useMatch(URL): 해당 URL에 있는 지 알려줌
    const priceMatch=useMatch(":coinId/price");
    const chartMatch=useMatch(":coinId/chart");
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
            setPriceInfo(priceData);
            setLoading(false);
        })();
    },[coinId]);
    return (
    <Container>
        <Header>
            <Title>{state? state: loading? "Loading...":info?.name}</Title>
        </Header>
        {loading? <Loader>Loading...</Loader> : (
        <>
            <Overview>
                <OverviewItem>
                    <span>Rank:</span>
                    <span>{info?.rank}</span>
                </OverviewItem>
                <OverviewItem>
                    <span>Symbol:</span>
                    <span>${info?.symbol}</span>
                </OverviewItem>
                <OverviewItem>
                    <span>Open Source:</span>
                    <span>{info?.open_source ? "Yes":"No"}</span>
                </OverviewItem>
            </Overview>
            <Descriptsion>{info?.description}</Descriptsion>
            <Overview>
            <OverviewItem>
              <span>Total Suply:</span>
              <span>{priceInfo?.total_supply}</span>
            </OverviewItem>
            <OverviewItem>
              <span>Max Supply:</span>
              <span>{priceInfo?.max_supply}</span>
            </OverviewItem>
          </Overview>
          <Tabs>
            <Tab isActive={chartMatch !==null}>
                <Link to="chart">Chart</Link>
            </Tab>
            <Tab isActive={priceMatch !==null}>
                <Link to="price">Price</Link>
            </Tab>
          </Tabs>
          <Outlet/>
        </>
        )}
    </Container>
    )
}

export default Coin;
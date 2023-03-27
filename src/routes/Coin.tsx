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

function Coin(){
    const [loading, setLoading]=useState(true);
    const {coinId}=useParams();
    const {state}=useLocation() as RouterState;
    const [info, setInfo]=useState({});
    const [priceInfo, setPriceInfo]=useState({});
    useEffect(()=>{
        (async()=>{
            const infoData=await axios(`https://api.coinpaprika.com/v1/coins/${coinId}`);
            const priceData=await axios({
                method: 'get',
                url: `https://api.coinpaprika.com/v1/coins/${coinId}`,
            })
                .then(function(response){
                    return response;
                });
            setInfo(infoData);
            setPriceInfo(priceData);
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
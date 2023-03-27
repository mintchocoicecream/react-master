import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { fetchCoins } from "../api";

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

const CoinList=styled.ul``;

const Coin=styled.li`
    background-color: white;
    color: ${(props)=>props.theme.bgColor};
    border-radius: 15px;
    margin-bottom: 10px;
    a{
        display: flex;
        align-items: center;
        padding: 20px;
        transition: color .2s ease-in;
    }
    &:hover{
        a{
            color: ${(props)=>props.theme.accentColor};
        }
    }
`;

const Title=styled.h1`
    font-size: 48px;
    color: ${(props)=>props.theme.accentColor};
`;

const Loader=styled.span`
    text-align: center;
    display: block;
`;

const Img=styled.img`
    width: 35px;
    height: 35px;
    margin-right: 10px;
`;

interface ICoin{
    id: string,
    name: string,
    symbol: string,
    rank: number,
    is_new: boolean,
    is_active:boolean,
    type: string,
}

function Coins(){
    //fetcher함수가 isLoading이라면 react query가 알려줌, 또한 fetcher 함수가 끝나면 react query가 알려줌.
    //fetch함수가 끝나면 react query는 그 함수의 데이터를 data에 넣어줌다.
    const {isLoading, data}=useQuery<ICoin[]>(["allCoins"], fetchCoins);
    // const [coins, setCoins]=useState<CoinInterface[]>([]);
    // const [loading, setLoading]=useState(true);
    // const getCoins=async()=>{
    //     const resp=await axios("https://api.coinpaprika.com/v1/coins");
    //     setCoins(resp.data.slice(0,100));
    //     setLoading(false);
    // }
    // useEffect(()=>{
    //     getCoins();
    //     // (async()=>{
    //     //     const response=await fetch("https://api.coinpaprika.com/v1/coins");
    //     //     const json=await response.json();
    //     //     setCoins(json.slice(0,100));
    //     //     setLoading(false);
    //     // })();
    // }, []);
    return (
    <Container>
        <Header>
            <Title>Coin</Title>
        </Header>
        {isLoading? (
            <Loader>Loading...</Loader>
            ):(
            <CoinList>
                {data?.slice(0,100).map((coin)=>(
                <Coin key={coin.id}>
                    <Link to={`${coin.id}`} state={`${coin.name}`}>
                        <Img src={`https://coinicons-api.vercel.app/api/icon/${coin.symbol.toLowerCase()}`} />
                        {coin.name} &rarr;
                    </Link> 
                </Coin>
                ))}
            </CoinList>
        )}
    </Container>
    );
}

export default Coins;
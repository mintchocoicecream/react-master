import axios from "axios";

const BASE_URL="https://api.coinpaprika.com/v1";
const API_URL="https://ohlcv-api.nomadcoders.workers.dev/?coinId";

export function fetchCoins(){
    return axios.get(`${BASE_URL}/coins`)
        .then(resp=>resp.data);
};

export function fetchCoinInfo(coinId:string|undefined){
    return axios.get(`${BASE_URL}/coins/${coinId}`)
        .then(resp=>resp.data);
};

export function fetchCoinTickers(coinId:string|undefined){
    return axios.get(`${BASE_URL}/tickers/${coinId}`)
        .then(resp=>resp.data);
}

//https://ohlcv-api.nomadcoders.workers.dev/?coinId=btc-bitcoin
export function fetchCoinHistory(coinId:string|undefined){
    // 언제를 기준으로 데이터를 받고 싶은지
    // const endDate=Math.floor(Date.now() /1000); //현재
    // const startDate=endDate-60*60*24*7; // 현재기준 7일 전

    return axios.get(`${API_URL}=${coinId}`)
    .then(resp=>resp.data);
}
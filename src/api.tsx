import axios from "axios";

const BASE_URL="https://api.coinpaprika.com/v1";

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
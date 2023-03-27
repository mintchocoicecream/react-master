import axios from "axios";

export function fetchCoins(){
    return axios.get("https://api.coinpaprika.com/v1/coins")
        .then(resp=>resp.data);

}
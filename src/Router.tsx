import { BrowserRouter, Route, Routes } from "react-router-dom";
import Chart from "./routes/Chart";
import Coin from "./routes/Coin";
import Coins from "./routes/Coins";
import Price from "./routes/Price";

interface IRouterProps{
  //아무 argument를 받지 않고, void를 return하는 함수 타입
  toggleDark:  ()=>void;
  isDark: boolean;
}

function Router({toggleDark, isDark}:IRouterProps) {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Coins toggleDark={toggleDark}/>}></Route>
        <Route path=":coinId" element={<Coin isDark={isDark}/>}>
          <Route path="chart" element={<Chart />}/>
          <Route path="price" element={<Price />}/>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
export default Router;
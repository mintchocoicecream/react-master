import {Outlet} from "react-router-dom";
import Header from "./components/Header";

function App() {
  
  // const Container=styled.div`
  //   background-color: ${(props)=> props.theme.bgColor};
  // `;

  // const H1=styled.h1`
  //   color: ${(props)=>props.theme.textColor};
  // `;

  return (
    <div>
      <Header />
      <Outlet />
    </div>
  );
}

export default App;
import {Link, useNavigate} from "react-router-dom";

function Header(){
  const navigate=useNavigate(); //예)사용자가 권한이 없는 페이지로 갔을 때 이동시킴
  const onAboutClick=()=>{
    navigate("/about");
  };
    return( 
    <header>
        <ul>
            <li>
              <Link to={"/"}>HOME</Link>
            </li>
            <li>
              <button onClick={onAboutClick}>ABOUT</button>
            </li>
        </ul>
    </header>
    )
}

export default Header;
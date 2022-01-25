import { useNavigate } from "react-router-dom";


export default function NavBar(){



const nav = useNavigate();

function toLogin(){ nav("../../login") }
function toEmp(){ nav("../../employee") }

    return(<>
    <span>
        
        <button onClick={toLogin}>Log out</button>
        <button onClick={toEmp}>Employee pg</button>
        
    </span>
    </>)
}
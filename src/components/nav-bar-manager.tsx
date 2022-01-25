import { useNavigate } from "react-router-dom";


export default function NavBarMgr(){
    
    //props.updateUser(props.user)
    const nav = useNavigate();

    function toLogin(){ nav("../../login") }
    function toMgr(){ nav("../../manager") }
    function toMyPg(){ nav("../../manager/reimbs")}
    function toStats(){ nav("../../stats")}

    return(<>
        <span>

            <button onClick={toLogin}>Log out</button>
            <button onClick={toMgr}>Manage</button>
            <button onClick={toMyPg}>My Page</button>
            <button onClick={toStats}>Stats</button>
        </span>
    </>)
}
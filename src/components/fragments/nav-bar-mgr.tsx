import { useNavigate } from "react-router-dom";
import { Button } from "../styles/elements.style";
import { ButtonText } from "../styles/text.style";



export default function NavBarMgr(){
    
    const nav = useNavigate();

    function toLogin(){ nav("../../login") }
    function toMgr(){ nav("../../manager") }
    function toMyPg(){ nav("../../manager/reimbs")}
    function toStats(){ nav("../../stats")}

    return(<>
        <span>
            

            <Button style={{top: 60, left: 100, position: 'absolute', textAnchor:'start'}} onClick={toLogin}></Button>
            <ButtonText style={{top: 60, left: 125, position: 'absolute', textAnchor:'start'}}>Log Out</ButtonText>
            <Button style={{top: 100, left: 100, position: 'absolute'}} onClick={toMgr}></Button>
            <ButtonText style={{top: 100, left: 125, position: 'absolute', textAnchor:'start'}}>Manage</ButtonText>
            <Button style={{top: 140, left: 100, position: 'absolute'}} onClick={toMyPg}></Button>
            <ButtonText style={{top: 140, left: 125, position: 'absolute', textAnchor:'start'}}>My Page</ButtonText>
            <Button style={{top: 180, left: 100, position: 'absolute'}} onClick={toStats}></Button>
            <ButtonText style={{top: 180, left: 125, position: 'absolute', textAnchor:'start'}}>Stats</ButtonText>
            <Button style={{top: 220, left: 100, position: 'absolute'}}></Button>
            <ButtonText style={{top: 220, left: 125, position: 'absolute', textAnchor:'start'}}>Contact Us</ButtonText>
        </span>
    </>)
}
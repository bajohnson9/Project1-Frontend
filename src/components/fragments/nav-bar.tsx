import { useNavigate } from "react-router-dom";
import { Button } from "../styles/elements.style";
import { ButtonText, HeadingText } from "../styles/text.style";


export default function NavBar(){



const nav = useNavigate();

function toLogin(){ nav("../../login") }
function toEmp(){ nav("../../employee") }

    return(<>
    <span >
        
        <Button style={{top: 60, position: 'absolute'}} onClick={toLogin}></Button>
        <ButtonText style={{top: 60, left: 25, position: 'absolute', textAnchor:'start'}}>Log Out</ButtonText>
        <Button style={{top: 100, left: 0, position: 'absolute'}} onClick={toEmp}></Button>
        <ButtonText style={{top: 100, left: 25, position: 'absolute', textAnchor:'start'}}>My Page</ButtonText>
        <Button style={{top: 140, left: 0, position: 'absolute'}}></Button>
        <ButtonText style={{top: 140, left: 12, position: 'absolute', textAnchor:'start'}}>Contact Us</ButtonText>
        
        
    </span>
    </>)
}
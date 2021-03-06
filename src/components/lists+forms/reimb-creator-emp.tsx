import { useRef } from "react";
import { ReimbursementStatus } from "../../models/reimbursement-item";
import ReimbursementItem, { AddRequest, User } from "../../models/dto";
import { Button } from "../styles/elements.style";
import { ButtonText, HeadingText, StaticLabel } from "../styles/text.style";


export default function ReimbCreatorEmp(props:{user:User, updateUser:Function}){
    const typeInput = useRef(null);
    const descInput = useRef(null);
    const amountInput = useRef(null);

    async function createReimb(){
        //create the add request
        try{
        const requ:AddRequest = {user:{...props.user},
        reimb:{
            id:"",
            type: typeInput.current.value,
            desc: descInput.current.value,
            amount: amountInput.current.value,
            status: ReimbursementStatus.pending
    
        }}
        
        console.log(requ);
        //make the request
        const response = await fetch("https://project1-backend-final.azurewebsites.net/reimbs", {
        method: "POST",
        headers:  {'Content-Type': 'application/json'},
        body: JSON.stringify(requ)
        })

        //update table
        const returnedReimb:ReimbursementItem = await response.json();
        //update user
        const user = {...props.user}
        user.reimbs.push(returnedReimb.id)
        props.updateUser({...user})
        //clear inputs
        typeInput.current.value = "";
        descInput.current.value = "";
        amountInput.current.value = "";
        
        } catch(error) {
            console.error("error posting new reimb")
        }
    
        
    }

    return(<div>
        <HeadingText>Create a Reimbursement:</HeadingText><br/>
    
        <StaticLabel htmlFor="typeInput">Type</StaticLabel>
        <input type="text" ref={typeInput} placeholder="type"/>
        <br/>
        <StaticLabel htmlFor="descInput">Desc</StaticLabel>
        <input type="desc" ref={descInput} placeholder="desc"/>
        <br/>
        <StaticLabel htmlFor="amountInput">Amount</StaticLabel>
        <input type="amount" ref={amountInput} placeholder="amt"/>
        <>
        <br/><ButtonText style={{paddingLeft: 18, position:"absolute", color: "yellow"}}>Add Reimb</ButtonText>
             <Button onClick={createReimb}></Button>

        </>
    </div>)
}
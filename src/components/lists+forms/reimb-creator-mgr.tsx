import { useRef } from "react";
import { ReimbursementStatus } from "../../models/reimbursement-item";
import ReimbursementItem, { AddRequest, User } from "../../models/dto";

export default function ReimbCreatorMgr(props:{user:User, updateUser:Function}){

    const typeInput = useRef(null);
    const descInput = useRef(null);
    const amountInput = useRef(null);
    const empIDInput = useRef(null);

    async function createReimb(){
        //create the add request
        try{
        const requ:AddRequest = {user:{
            
            username:empIDInput.current.value,
            password:"",
            id: "",
            isAuthenticated:false,
            isManager:false,
            reimbs: []
        },
        reimb:{
            id:"",
            type: typeInput.current.value,
            desc: descInput.current.value,
            amount: amountInput.current.value,
            status: ReimbursementStatus.pending
    
        }}
        
        
        //request to add reimb 
        const response = await fetch("http://localhost:5000/reimbs", {
        method: "POST",
        headers:  {'Content-Type': 'application/json'},
        body: JSON.stringify(requ)
        })

        const returnedReimb:ReimbursementItem = await response.json();
        const user = {...props.user}
        user.reimbs.push(returnedReimb.id)
        props.updateUser({...user})

    
        } catch(error) {
            console.error("error posting new reimb")
        }
        //return something? clear the inputs?
        //try passing in getReimbs as a prop into UseEffect here

    }

    return(<>
        <h3>Create a Reimb:</h3>
    
        <label htmlFor="typeInput">type</label>
        <input type="text" ref={typeInput} placeholder="type"/>
        <br/>
        <label htmlFor="descInput">desc</label>
        <input type="desc" ref={descInput} placeholder="desc"/>
        <br/>
        <label htmlFor="amountInput">amount</label>
        <input type="amount" ref={amountInput} placeholder="amt"/>
        <br/>
        <label htmlFor="idInput">employee ID</label>
        <input type="id" ref={empIDInput} placeholder="00000000-0000-0000-0000-000000000000"/>
        <button onClick={createReimb}>add reimb</button>
    </>)
}
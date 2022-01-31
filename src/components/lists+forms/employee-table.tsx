import ReimbursementItem, { User } from "../../models/dto"; 
import ReimbursementRow from "../fragments/reimbursement-row";
import { useEffect, useState } from "react";
import { ReimbTable } from "../styles/elements.style";



export default function EmployeeTable(props: {user:User, updateUser:Function}){
    
    const [reimbs,setReimbs] = useState([]);
    
    //get from backend
    async function getReimbs(){
        const response = await fetch("https://project1-backend-final.azurewebsites.net/reimbs")
        const tempReimbs:ReimbursementItem[] = await response.json();
        //filter out reimbs that aren't theirs
        let newReimbs = [];
        for(let reimb of tempReimbs){
                if((props.user).reimbs.find(r => (r === reimb.id))) {
                newReimbs.push(reimb);
            }
        }
        
        setReimbs(newReimbs);
        return newReimbs;   
    }
    
    
    useEffect(()=>{
        getReimbs();
    },[props.user])
    //},[getReimbs, props.user])
    //alternative to get github actions to shut up

    //the empty array represents stateful dependencies that can retrigger useEffect
    //empty means run once upon initialization
    
    return(<>
        <ReimbTable>
            <thead>
                <tr><th>Category</th><th>Description</th><th>Amount</th><th>Status</th><th>ID</th></tr>
            </thead>
            <tbody style={{border: "1px dotted red"}}>
                {reimbs.map(item => <ReimbursementRow item={item} key={item.id}/>)}
            </tbody>
        </ReimbTable>
    </>)
}
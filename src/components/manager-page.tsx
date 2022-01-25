import { useEffect, useState } from "react";
import ReimbursementItem, { User } from "../models/dtos/dto";
import ReimbursementRow from "./reimbursement-row";
import ReimbCreator from "./reimb-creator-mgr";
import NavBarMgr from "./nav-bar-manager";


 export default function ManagerPage(props:{user:User, updateUser:Function}) {
    /*
    //placeholder
    const dummyReimbursements:ReimbursementItem[] = [
        {id:"1", type:"Food", desc:"Two dozen hunks of meat", amount:50, status:ReimbursementStatus.pending},
        {id:"2", type:"Collateral", desc:"17 battleships destroyed", amount:5000000, status:ReimbursementStatus.denied},
        {id:"3", type:"Tribute", desc:"Big Mom didn't pay up", amount:75000, status:ReimbursementStatus.denied},
        {id:"4", type:"Collateral", desc:"9 Government cars", amount:1800000, status:ReimbursementStatus.approved}];
    */

    const [reimbs,setReimbs] = useState([]);
    //let tableRows = reimbs.map(r => <ReimbursementRow key={r.id} item={r}/>)
        

    async function getReimbs(){
        const response = await fetch("http://localhost:5000/reimbs")
        const reimbs:ReimbursementItem[] = await response.json();
        //filter out reimbs that aren't theirs
        
        setReimbs(reimbs);
    }

    useEffect(()=>{
        getReimbs();
        
    },[])

    async function approveReimbursement(item:ReimbursementItem): Promise<void> {
        await fetch("http://localhost:5000/reimbs/approve", {
        method: "PATCH",
        headers:  {'Content-Type': 'application/json'},   
        body: JSON.stringify(item)
        })
        //redundant, dont need 2s
        const response2 = await fetch("http://localhost:5000/reimbs")
        const reimbs2:ReimbursementItem[] = await response2.json();
        setReimbs(reimbs2);
    } 

    async function denyReimbursement(item:ReimbursementItem): Promise<void> {
        await fetch("http://localhost:5000/reimbs/deny", {
        method: "PATCH",
        headers:  {'Content-Type': 'application/json'},
        body: JSON.stringify(item)
        })
        const response2 = await fetch("http://localhost:5000/reimbs")
        const reimbs2:ReimbursementItem[] = await response2.json();
        setReimbs(reimbs2);
        
    }

    async function deleteReimbursement(item:ReimbursementItem): Promise<void> {
        await fetch("http://localhost:5000/reimbs", {
        method: "DELETE",
        headers:  {'Content-Type': 'application/json'},
        body: JSON.stringify(item)
        })
        const response2 = await fetch("http://localhost:5000/reimbs")
        const reimbs2:ReimbursementItem[] = await response2.json();
        setReimbs(reimbs2);
    }
        
    return(<>
        
        <h2>Welcome to the Manager Home page!</h2>
        <NavBarMgr/>
        <h3>Reimbursement Table</h3>
        <table>
            <thead>
                <tr><th>Type</th><th>Description</th><th>Amount</th><th>Status</th><th>id</th><th>Manager Functions</th></tr>
            </thead>
            <tbody>
                {reimbs.map(item => <ReimbursementRow item={item} key={item.id} managerFunctions={
                    {approve:()=>approveReimbursement(item), deny:()=>denyReimbursement(item), delete:()=>deleteReimbursement(item)}}/>)}
            </tbody>
        </table>
        <ReimbCreator user={props.user}/>
    </>)
 }
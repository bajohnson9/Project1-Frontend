import { useEffect, useState } from "react";
import ReimbursementItem, { User } from "../../models/dtos/dto";
import ReimbursementRow from "../reimbursement-row";
import NavBarMgr from "../nav-bar-mgr";
import ReimbCreatorMgr from "../lists+forms/reimb-creator-mgr";


 export default function ManagerPage(props:{user:User, updateUser:Function}) {
    const [reimbs,setReimbs] = useState([]);      

    async function getReimbs(){
        const response = await fetch("http://localhost:5000/reimbs")
        const reimbs2:ReimbursementItem[] = await response.json();
        //filter out reimbs that aren't theirs
        
        setReimbs(reimbs2);
    }

    useEffect(()=>{
        getReimbs();
        
    },[props.user])

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
        <ReimbCreatorMgr user={props.user} updateUser={props.updateUser}/>
    </>)
 }
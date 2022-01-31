import { useEffect, useState } from "react";
import ReimbursementItem, { User } from "../../models/dto";
import ReimbursementRow from "../fragments/reimbursement-row";
import NavBarMgr from "../fragments/nav-bar-mgr";
import ReimbCreatorMgr from "../lists+forms/reimb-creator-mgr";
import { MgrView } from "../styles/views.style";
import { HeadingText } from "../styles/text.style";
import { ReimbTable } from "../styles/elements.style";

import managerbackground from "../../manager-background.jpg"
import { ContainerDiv } from "../styles/containers.style";

 export default function ManagerPage(props:{user:User, updateUser:Function}) {
    const [reimbs,setReimbs] = useState([]);      

    async function getReimbs(){
        const response = await fetch("https://project1-backend-final.azurewebsites.net/reimbs")
        const reimbs2:ReimbursementItem[] = await response.json();
        //filter out reimbs that aren't theirs
        
        setReimbs(reimbs2);
    }

    useEffect(()=>{
        getReimbs();
        
    },[props.user])

    async function approveReimbursement(item:ReimbursementItem): Promise<void> {
        await fetch("https://project1-backend-final.azurewebsites.net/reimbs/approve", {
        method: "PATCH",
        headers:  {'Content-Type': 'application/json'},   
        body: JSON.stringify(item)
        })
        //redundant, dont need 2s
        const response2 = await fetch("https://project1-backend-final.azurewebsites.net/reimbs")
        const reimbs2:ReimbursementItem[] = await response2.json();
        setReimbs(reimbs2);
    } 

    async function denyReimbursement(item:ReimbursementItem): Promise<void> {
        await fetch("https://project1-backend-final.azurewebsites.net/reimbs/deny", {
        method: "PATCH",
        headers:  {'Content-Type': 'application/json'},
        body: JSON.stringify(item)
        })
        const response2 = await fetch("https://project1-backend-final.azurewebsites.net/reimbs")
        const reimbs2:ReimbursementItem[] = await response2.json();
        setReimbs(reimbs2);
        
    }

    async function deleteReimbursement(item:ReimbursementItem): Promise<void> {
        await fetch("https://project1-backend-final.azurewebsites.net/reimbs", {
        method: "DELETE",
        headers:  {'Content-Type': 'application/json'},
        body: JSON.stringify(item)
        })
        const response2 = await fetch("https://project1-backend-final.azurewebsites.net/reimbs")
        const reimbs2:ReimbursementItem[] = await response2.json();
        setReimbs(reimbs2);
    }
        
    return(<><MgrView style={{
        margin: '0px',
        height: '100%',
        backgroundImage: `url(${managerbackground})`,
        backgroundSize: '100% auto',
        position: 'absolute',
        backgroundRepeat: 'no-repeat'
        
        }}>
        
        <HeadingText>Welcome to the Manager Home page!</HeadingText><br/>
        
        <HeadingText style={{fontSize:'25px'}}>All Reimbursements:</HeadingText><br/>
        <ReimbTable>
            <thead>
                <tr><th>Type</th><th>Description</th><th>Amount</th><th>Status</th><th>id</th><th>Manager Functions</th></tr>
            </thead>
            <tbody>
                {reimbs.map(item => <ReimbursementRow item={item} key={item.id} managerFunctions={
                    {approve:()=>approveReimbursement(item), deny:()=>denyReimbursement(item), delete:()=>deleteReimbursement(item)}}/>)}
            </tbody>
        </ReimbTable><br/>
        <ReimbCreatorMgr user={props.user} updateUser={props.updateUser}/>
    </MgrView>
    <NavBarMgr/>
    </>)
 }
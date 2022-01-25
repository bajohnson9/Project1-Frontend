import ReimbursementItem, { User } from "../models/dtos/dto"; 
import ReimbursementRow from "./reimbursement-row";
import { useEffect, useState } from "react";



export default function EmployeeTable(props: {user:User, updateUser:Function}){
    
    //const [user,setUser] = useState({});
    const [reimbs,setReimbs] = useState([]);

    //get from backend
    async function getReimbs(){
        const response = await fetch("http://localhost:5000/reimbs")
        const tempReimbs:ReimbursementItem[] = await response.json();
        //filter out reimbs that aren't theirs
        let newReimbs = [];
        let ids = []
        for(let i = 0; i < tempReimbs.length; i++){
                if((props.user).reimbs.find(r => (r === tempReimbs[i].id))) {
                newReimbs.push(tempReimbs[i]);
                ids.push(tempReimbs[i].id)
            }
        }
        
        setReimbs(newReimbs);
        const tempUser:User = {...props.user, reimbs:ids}
        await props.updateUser({...tempUser})
        

        sessionStorage.setItem("username", tempUser.username);
        sessionStorage.setItem("password", tempUser.password);
        sessionStorage.setItem("id", tempUser.id);
        sessionStorage.setItem("isAuthenticated", String(tempUser.isAuthenticated));
        sessionStorage.setItem("isManager", String(tempUser.isManager));
        sessionStorage.setItem("reimbs", tempUser.reimbs.join(","))
    }
    
    
    useEffect(()=>{
        getReimbs();
        
    },[])
    //the empty array represents stateful dependencies that can retrigger useEffect
    //empty means run once upon initialization
    //can use for multiple segments
    
    return(<>
        <table>
            <thead>
                <tr><th>Name</th><th>Description</th><th>Amount</th><th>Status</th><th>id</th></tr>
            </thead>
            <tbody>
                {reimbs.map(item => <ReimbursementRow item={item} key={item.id}/>)}
            </tbody>
        </table>
        <button onClick={getReimbs}>refresh</button>
        <div>user is {props.user.username} : {props.user.password} : {props.user.id} : {props.user.reimbs.join(",")}</div>
    </>)
}
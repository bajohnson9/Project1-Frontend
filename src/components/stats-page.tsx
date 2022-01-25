import { useEffect } from "react";
import { User } from "../models/dtos/dto";
import NavBarMgr from "./nav-bar-manager";



export default function StatsPage(props:{user:User, updateUser:Function}) {
    const loggedInUser = props.user;
    let stats:string[] = []

    async function getStats(){
    
    const response = await fetch("http://localhost:5000/stats", {
        method: "GET",
        headers:  {'Content-Type': 'application/json'}
        })
        stats = await response.json();
        return Promise.resolve(stats);
    }



    useEffect(()=>{
        getStats();
        console.log(getStats());
    },[])
    return (<>
        
        
        <h2>You are now on the Stats Page!</h2>
        <NavBarMgr/>
        <br/>
        <table>
            <thead>
                <tr><th>Name</th><th>Description</th><th>Amount</th><th>Status</th><th>id</th></tr>
            </thead>
            <tbody>
                {stats}
            </tbody>
        </table>
        <h6>Your ID is {loggedInUser.id}</h6>
        
    </>)
}
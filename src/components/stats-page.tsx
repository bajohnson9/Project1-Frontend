import { useEffect, useState } from "react";
import { User } from "../models/dtos/dto";
import NavBarMgr from "./nav-bar-manager";
import StatRow from "./stat-row";



export default function StatsPage(props:{user:User, updateUser:Function}) {
    let [stats, setStats] = useState<string[]>([])

    async function getStats(){
    
        const response = await fetch("http://localhost:5000/stats", {
            method: "GET",
            headers:  {'Content-Type': 'application/json'}
        })
        const statsJSON = await response.json();
        console.log(statsJSON);
        setStats(statsJSON)
    }

    useEffect(()=>{
        getStats();
    },[])

    return (<>
        
        
        <h2>You are now on the Stats Page!</h2>
        <NavBarMgr/>
        <br/>
        <table>
            <thead>
                <tr><th>Name</th></tr>
            </thead>
            <tbody>{stats.map(item => <StatRow stat={item} key={item}/>)}</tbody>
        </table>
        <h6>Your ID is {props.user.id}</h6>
        
    </>)
}
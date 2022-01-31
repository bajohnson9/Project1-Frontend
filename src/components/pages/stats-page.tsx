import { useEffect, useState } from "react";
import { User } from "../../models/dto";
import NavBarMgr from "../fragments/nav-bar-mgr";
import StatRow from "../fragments/stat-row";
import { HeadingText, ButtonText } from "../styles/text.style";
import { StatsView } from "../styles/views.style";

import statsbackground from '../../stats-background.jpg'
import { StatsBox } from "../styles/elements.style";



export default function StatsPage(props:{user:User, updateUser:Function}) {
    let [stats, setStats] = useState<string[]>([])

    async function getStats(){
    
        const response = await fetch("https://project1-backend-final.azurewebsites.net/stats", {
            method: "GET",
            headers:  {'Content-Type': 'application/json'}
        })
        const statsJSON = await response.json();
        setStats(statsJSON)
    }

    useEffect(()=>{
        getStats();
    },[])

    return (<StatsView style={{
        margin: '0px',
        height: '100%',
        backgroundImage: `url(${statsbackground})`,
        backgroundSize: '100% auto',
        position: 'absolute',
        backgroundRepeat: 'no-repeat'
        
    }}>
        
        
        <HeadingText>You are now on the Stats Page!</HeadingText>
        <br/>
        <NavBarMgr/>
        <br/>
        <StatsBox>
            <tbody><ButtonText>{stats.map(item => <StatRow stat={item} key={item}/>)}</ButtonText></tbody>
        </StatsBox>
        <h6 style={{color: "white"}}>Your ID is {props.user.id}</h6>
        
    </StatsView>)
}
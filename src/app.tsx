import { useEffect, useState } from "react";
import EmployeePage from "./components/employee-page";
import Login from "./components/login";
import ManagerPage from "./components/manager-page";
import StatsPage from "./components/stats-page";
import User from "./models/user";
import './app.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import EmployeePageMgr from "./components/employee-page-mgr";

export default function App() {
    
    //help here, i need to set an initial state but replace it immediately
    //sessionStorage.setItem('reimbs',"")
    
    //setting up my user state
    const reimbs = String(sessionStorage.getItem('reimbs')).split(',').map(String) ?? [];
    const [user, setUser] = useState<User>({
        username:sessionStorage.getItem('username'),
        password:sessionStorage.getItem('password'), 
        id:sessionStorage.getItem('id'), 
        isAuthenticated:Boolean(sessionStorage.getItem('isAuthenticated')), 
        isManager:Boolean(sessionStorage.getItem('isManager')),
        reimbs:reimbs
    });

    function getUser(){
        
    }

    useEffect(()=>{
        setUser(user);
    },[])

    return (<>

    {
    <BrowserRouter>
    
    <Routes>

    <Route path="" element = {<Login user={user} updateUser={setUser}/>}/>
    <Route path="login" element = {<Login user={user} updateUser={setUser}/>}/>
    <Route path="manager" element = {<ManagerPage user={user} updateUser={setUser}/>}/>
    <Route path="manager/reimbs" element = {<EmployeePageMgr user={user} updateUser={setUser}/>}/>
    <Route path="employee">
        
        <Route path="" element = {<EmployeePage user={user} updateUser={setUser}/>}/>
    </Route>    
    <Route path="stats" element = {<StatsPage user={user} updateUser={setUser}/>}/>
    </Routes>
    
    </BrowserRouter>
        }
    </>);
}


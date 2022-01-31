import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import User from "../../models/user";

import { Button, TextBox } from "../styles/elements.style";
import { LoginView } from "../styles/views.style";


import backgroundimage from '../../loginimage.jpg'

//props:function setUser or something (LOOK IN PLEASANT)
export default function Login(props:{user:User, updateUser:Function}) {
    const navigate = useNavigate();

    const unInput = useRef (null);
    const pwInput = useRef (null);

    async function login() {
        const userFragment:User = {"username":unInput.current?.value,"password":pwInput.current?.value,"id":"","isAuthenticated":false,"isManager":false,"reimbs":[]}
        
        //get userFragment from the login function on backend

        const response = await fetch("https://project1-backend-final.azurewebsites.net/login", {
            method: "PATCH",
            headers:  {'Content-Type': 'application/json'},
            body: JSON.stringify(userFragment)
        })
        const user:User = await response.json() ?? userFragment; 
        props.updateUser(user)
        sessionStorage.setItem("username", user.username);
        sessionStorage.setItem("password", user.password);
        sessionStorage.setItem("id", user.id);
        sessionStorage.setItem("isAuthenticated", String(user.isAuthenticated));
        sessionStorage.setItem("isManager", String(user.isManager));
        sessionStorage.setItem("reimbs", user.reimbs.join(","))
        
        
        
        if(user.isAuthenticated && user.isManager) { navigate(`../manager`)}
        else if(user.isAuthenticated){ navigate(`../employee`) }
        else alert("Login failed");
        
    }

    return(<LoginView style={{
        margin: '0px',
        height: '100%',
        backgroundImage: `url(${backgroundimage})`,
        backgroundSize: '100% auto',
        position: 'absolute',
        
    }}>
        
        {/* image goes here */}
        <img src="https://project1storagebrooks.blob.core.windows.net/brooks-project1/logo.png" alt="logo" style={{flex:1, top: 50, right: '30%', height:400,width:600,alignItems:'center', position: 'absolute'}}></img>
        <img src="https://project1storagebrooks.blob.core.windows.net/brooks-project1/Log In.png" alt="Log In" style={{flex:1, height:100,width:300,alignItems:'center'}}></img>
        

        <TextBox ref={unInput} type="text" placeholder="username"/><br />
        <TextBox ref={pwInput} type="password" placeholder="password"/><br />
        
        <Button onClick={login}>Log In</Button>

    </LoginView>);

}


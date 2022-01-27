import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import User from "../../models/user";



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

    return(<>
        <h2>Login:</h2><br />
        <input ref={unInput} type="text" placeholder="username"/><br />
        <input ref={pwInput} type="password" placeholder="password"/><br />
        <button onClick={login}>Login</button>

    </>);

}
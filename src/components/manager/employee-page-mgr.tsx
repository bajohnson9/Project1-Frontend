import { User } from "../../models/dtos/dto";
import EmployeeTable from "../emp/employee-table";
import ReimbCreatorEmp from "../emp/reimb-creator";
import NavBarMgr from "./nav-bar-manager";


export default function EmployeePage(props:{user:User, updateUser:Function}) {
    /*props.updateUser({
        username:sessionStorage.getItem('username'),
        password:sessionStorage.getItem('password'), 
        id:sessionStorage.getItem('id'), 
        isAuthenticated:Boolean(sessionStorage.getItem('isAuthenticated')), 
        isManager:Boolean(sessionStorage.getItem('isManager')),
        reimbs:(sessionStorage.getItem('reimbs').split(',').map(String))
    })*/

    return (<>
        
        
        <h2>You are now on the Employee Page!</h2>
        <NavBarMgr/>
        <h3>Reimbursement Table</h3>
        <EmployeeTable user={props.user} updateUser={props.updateUser}/>
        <ReimbCreatorEmp user={props.user} updateUser={props.updateUser}/>
        <h6>Your ID is {props.user.id}</h6>
        <br/> 
    </>)
}
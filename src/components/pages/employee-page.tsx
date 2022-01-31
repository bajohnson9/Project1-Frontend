import { User } from "../../models/dto";
import EmployeeTable from "../lists+forms/employee-table";
import NavBar from "../fragments/nav-bar";
import ReimbCreatorEmp from "../lists+forms/reimb-creator-emp";
import { HeadingText } from "../styles/text.style";
import { ReimbView } from "../styles/views.style";

import employeebackground from '../../employee-background.jpg'   


export default function EmployeePage(props:{user:User, updateUser:Function}) {

    return (<>
        
        <ReimbView style={{
        margin: '0px',
        height: '100%',
        backgroundImage: `url(${employeebackground})`,
        backgroundSize: '100% auto',
        position: 'absolute',
        backgroundRepeat: 'no-repeat'
        
        }}>

            <HeadingText>Your Reimbursements:</HeadingText>
            <EmployeeTable user={props.user} updateUser={props.updateUser}/>
            <ReimbCreatorEmp user={props.user} updateUser={props.updateUser}/>
            <h6 style={{color: "white"}}>Your ID is {props.user.id}</h6>
            <br/> 
        </ReimbView>
        <NavBar/>
    </>)
}
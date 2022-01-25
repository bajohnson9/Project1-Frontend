import { MouseEventHandler } from "react";
import ReimbursementItem from "../models/reimbursement-item";


export default function ReimbursementRow(props:{
    item:ReimbursementItem, managerFunctions?:{approve:MouseEventHandler, deny:MouseEventHandler, delete:MouseEventHandler}}) {

    const {id, type, desc, amount, status} = props.item;

    

    return <tr><td>{type}</td><td>{desc}</td><td>${amount}</td><td>{status}</td><td>{id}</td>
        {props.managerFunctions && 
            <td><button onClick={props.managerFunctions.approve}>Approve</button>
                <button onClick={props.managerFunctions.deny}>Deny</button>
                <button onClick={props.managerFunctions.delete}>Delete</button></td>}</tr>

}
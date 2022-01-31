import { MouseEventHandler } from "react";
import ReimbursementItem from "../../models/reimbursement-item";
import { ApproveButton, DeleteButton, DenyButton } from "../styles/elements.style";


export default function ReimbursementRow(props:{
    item:ReimbursementItem, managerFunctions?:{approve:MouseEventHandler, deny:MouseEventHandler, delete:MouseEventHandler}}) {

    const {id, type, desc, amount, status} = props.item;

    

    return <tr style={{border: "2px dotted red"}}>
        <td style={{border: "2px dotted red"}}>{type}</td>
        <td style={{border: "2px dotted red"}}>{desc}</td>
        <td style={{border: "2px dotted red"}}>${amount}</td>
        <td style={{border: "2px dotted red"}}>{status}</td>
        <td style={{border: "2px dotted red"}}>{id}</td>
        {props.managerFunctions && 
            <td><ApproveButton onClick={props.managerFunctions.approve}>Approve</ApproveButton>
                <DenyButton onClick={props.managerFunctions.deny}>Deny</DenyButton>
                <DeleteButton onClick={props.managerFunctions.delete}>Delete</DeleteButton></td>}</tr>

}
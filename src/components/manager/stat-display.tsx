import { MouseEventHandler } from "react";
import ReimbursementItem from "../../models/reimbursement-item";
import User from "../../models/user";


export default function StatDisplay(props:{
    reimb:ReimbursementItem, user:User, feat:string,
    managerFunctions?:{approve:MouseEventHandler, deny:MouseEventHandler, delete:MouseEventHandler}}) {

    const reimb:ReimbursementItem = props.reimb;
    const user:User = props.user;
    const feat:string = props.feat;
    

    return <> 
    <body>{user.username} had the {feat} with:
    <br/></body>
    <tr><td>{reimb.type}</td><td>{reimb.desc}</td><td>${reimb.amount}</td><td>{reimb.status}</td><td>{reimb.id}</td></tr>        </>
}
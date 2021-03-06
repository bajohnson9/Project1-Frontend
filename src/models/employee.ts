import ReimbursementItem from "./reimbursement-item";


export default interface Employee {
    id:string,
    fname:string,
    mname?:string,
    lname?:string,
    username:string,
    password:string,
    reimbursements:ReimbursementItem[]
}
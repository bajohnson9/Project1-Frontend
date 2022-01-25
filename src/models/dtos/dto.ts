export enum ReimbursementStatus {
    pending = 'pending', 
    denied = 'denied', 
    approved = 'approved' 
}

export default interface ReimbursementItem {
    id:string,
    type:string
    desc:string,
    amount:number,
    status:ReimbursementStatus
    //files (to be implemented later)
}

export interface User {
    username:string,
    password:string,
    id:string,
    isAuthenticated:boolean,
    isManager:boolean,
    //a string of reimb IDs (which ones are mine)
    reimbs: string[]

}

export interface addRequest{
    user:User;
    reimb:ReimbursementItem;
}
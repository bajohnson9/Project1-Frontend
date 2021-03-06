

export enum ReimbursementStatus {
    pending = 'pending', 
    denied = 'denied', 
    approved = 'approved' 
}

export default interface ReimbursementItem {
    id:string,
    type:string,
    desc:string,
    amount:number,
    status:ReimbursementStatus
    //files (to be implemented later)
}
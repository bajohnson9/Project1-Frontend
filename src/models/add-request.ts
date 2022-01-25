import ReimbursementItem from "./reimbursement-item";
import User from "./user";

export interface addRequest{
    user:User;
    reimb:ReimbursementItem;
}
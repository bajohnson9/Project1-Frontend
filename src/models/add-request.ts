import ReimbursementItem from "./reimbursement-item";
import User from "./user";

export interface AddRequest{
    user:User;
    reimb:ReimbursementItem;
}
import { configureStore, createSlice, PayloadAction } from "@reduxjs/toolkit"
import { ReimbursementStatus } from "./models/reimbursement-item";


export interface Reimb{
    id:string
    type:string
    desc:string
    amount:number
    empid:string
    status:ReimbursementStatus
}

export interface LogState{
    totalReimbursement:number
    reimbs:Reimb[]
}

//create a global initial state; accessible anywhere
const initialState:LogState = {
    totalReimbursement:120,
    reimbs:   [{id:"1",type:"groce",desc:"some grapes",amount:6,empid:"1",status:ReimbursementStatus.approved},
    {id:"2",type:"collateral",desc:"17 cars",amount:6000000,empid:"1",status:ReimbursementStatus.approved},
    {id:"3",type:"lost lives",desc:"Sarah from accounting",amount:2000,empid:"2",status:ReimbursementStatus.approved}]
}


//USE THIS WHEN ADDING TO DATA (and they're supposed to reduce, so remove any unneeded variables)
const reimbSlice = createSlice({
    name:"Reimbursements",
    initialState,
    //you MUST use a reducer to interact, the state is protected otherwise
    reducers:{
        
        approveReimb(state, action:PayloadAction<{id:string,type:string,desc:string,amount:number,empid:string,status:ReimbursementStatus}>){
            const reimb:Reimb = action.payload;
            reimb.status = ReimbursementStatus.approved;
            state.reimbs.find(p => p.id === reimb.id).status = ReimbursementStatus.approved;
        },
        denyReimb(state, action:PayloadAction<{id:string,type:string,desc:string,amount:number,empid:string,status:ReimbursementStatus}>){
            const reimb:Reimb = action.payload;
            reimb.status = ReimbursementStatus.denied;
            state.reimbs.find(p => p.id === reimb.id).status = ReimbursementStatus.denied;
        }
        /*
        increaseBudget(state){
            if(state.budget <= 999) state.budget = state.budget + 5;
        },
        
        decreaseBudget(state){
            if(state.budget >= 5) state.budget = state.budget - 5;
        },

        addProductToList(state, action: PayloadAction<Product>){
            //you can write logic as if it were mutable
            const product:Product = action.payload;
            state.products.push(product);
        },

        setProudctComplete(state,action:PayloadAction<string>){
            const desc:string = action.payload;
            state.products.find(p => p.desc===desc).isBought=true;
        }
        */
    }
})


export const reimbStore =configureStore({reducer:reimbSlice.reducer})
export const actions = reimbSlice.actions;
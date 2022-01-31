import styled from "styled-components";
import logo from "../../logo.png"

export const Button = styled.div`
    //border: 1px solid black;
    width:99px;
    height:33px;
    font-family: "Comic Sans MS", "Comic Sans", cursive;
    color: blue;
    padding-left: 14%;
    
    
    background-image: url('https://project1storagebrooks.blob.core.windows.net/brooks-project1/button.png');
    background-size: contain;
    background-repeat: no-repeat;
`

export const ApproveButton = styled.button`
    background-color: green;

`

export const DenyButton = styled.button`
    background-color: red;

`

export const DeleteButton = styled.button`
    background-color: black;
    color: white;
    font-family: "Comic Sans MS", "Comic Sans", cursive;

`

export const StatsBox = styled.table`
    background: rgba(223, 202, 48, 0.6);

`

export const TextBox = styled.input`
    align-items: center;
    font-size: 20px;
    font-family: "Comic Sans MS", "Comic Sans", cursive;

`

export const Logo = styled.div`
    flex: 1;
    background-image: url(${logo});
    

`

export const ReimbTable = styled.table`
    flex: 1;
    font-family: 'Courier New', monospace;
    color: rgba(251, 251, 188);
    background: rgba(0, 0, 0, 0.6);
    border: 2px solid red;
    border-width: 2px;
    border-collapse: collapse;
    padding: 5px;
    
`

export const TD = styled.td`
    border: "1px dotted red";
`
//could even make a sonic-themed one for managers
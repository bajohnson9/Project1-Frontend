import { MouseEventHandler } from "react";

export default function StatRow(props:{stat:String}) {

    const stat = props.stat;

    

    return <tr><td>{stat}</td></tr>

}
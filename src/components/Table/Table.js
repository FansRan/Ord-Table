import React from "react";
import { useSelector } from "react-redux";
import TaskRow from "./TaskRow";
import ResultRow from "./ResultRow";
import InputRow from "./InputRow";

import './table.css';


function Table(props) {
    const tasksCount = useSelector(state => state.tasksCount);
    const computed = useSelector(state => state.computed);

    return (
        <>
            <table id="root-table">
                <tbody>
                    {Boolean(tasksCount) && <TaskRow taskType="base" tableType={props.type} />}
                    {Boolean(tasksCount) && props.type === "input" && <InputRow />}
                    {props.type === "input" && computed && <TaskRow taskType="next" tableType="input" />}
                    {props.type === "early" && <ResultRow tableType="early" />}
                    {props.type === "late" && <ResultRow tableType="late" />}
                </tbody>
            </table>
        </>
    );
}

export default Table;

import React from "react";
import { useSelector } from "react-redux";
import ResultCell from "./ResultCell";

const renderCell = (tasks, tableType) => {
    return tasks.map(task =>
        <td key={task.id}>
            <ResultCell tableType={tableType} task={task} />
        </td>
    )
}

function ResultRow(props) {
    const listTasks = useSelector(state => state.listTasks);
    return (
        <>
            <tr id={props.tableType} className="result-row">
                {renderCell(listTasks, props.tableType)}
                {props.tableType === "early" && <td><ResultCell /></td>}
            </tr>
        </>
    );
}

export default ResultRow;

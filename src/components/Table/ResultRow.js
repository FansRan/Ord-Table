import React from "react";
import { useSelector } from "react-redux";
import ResultCell from "./ResultCell";

const renderCell = (tasks, tableType) => {
    return tasks.map((task) => (
        <td key={task.id}>
            <ResultCell tableType={tableType} task={task} />
        </td>
    ));
};

export default function ResultRow(props) {
    const listTasks = useSelector((state) => state.listTasks);
    return (
        <>
            {props.tableType !== "margin" && (
                <tr id={props.tableType} className="result-row">
                    {renderCell(listTasks, props.tableType)}
                    {props.tableType === "early" && (
                        <td>
                            <ResultCell />
                        </td>
                    )}
                </tr>
            )}
            {props.tableType === "margin" && (
                <tr id={props.tableType} className="result-row">
                    <td>Marges</td>
                    {listTasks.map((task) => (
                        <td key={task.id}>{task.margin}</td>
                    ))}
                </tr>
            )}
        </>
    );
}

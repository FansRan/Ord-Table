import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    compute_final_achievment_date,
    compute_late_date,
    find_critical_path,
} from "../../utils/algorithm/table";

function InputRow() {
    const raz = useSelector((state) => state.raz);
    const computing = useSelector((state) => state.computing);
    const allTasks = useSelector((state) => state.allTasks);
    const listTasks = useSelector((state) => state.listTasks);
    const linkedTask = useSelector((state) => state.linkedTask);
    const dispatch = useDispatch();
    const [inputVal, setInnputVal] = useState("");
    const previousInputVal = useRef("");

    useEffect(() => {
        if (computing) {
            linkedTask.start_tasks = [];
            linkedTask.end_tasks = [];
            for (const id in allTasks) {
                allTasks[id].early_date = null;
                allTasks[id].late_date = null;
                allTasks[id].margin = null;
                allTasks[id].next_tasks = [];
            }
            for (const id in allTasks) {
                if (allTasks[id].previous_tasks) {
                    if (typeof allTasks[id].previous_tasks[0] === "string")
                        allTasks[id].previous_tasks = allTasks[
                            id
                        ].previous_tasks.map((task) => allTasks[task]);
                    allTasks[id].previous_tasks.forEach((task) =>
                        task.next_tasks.push(allTasks[id])
                    );
                } else linkedTask.start_tasks.push(allTasks[id]);
            }
            const final_date = compute_final_achievment_date(linkedTask);
            compute_late_date(final_date, linkedTask);
            dispatch({
                type: "COMPUTED",
                final: final_date,
                path: find_critical_path(final_date, linkedTask),
            });
        }
    }, [computing]);

    useEffect(() => {
        if (raz) {
            document
                .querySelectorAll(".row-input")
                .forEach((element) => (element.value = ""));
            dispatch({ type: "INITIATED" });
        }
    }, [raz]);

    useEffect(() => {
        previousInputVal.current = inputVal;
    }, [inputVal]);

    const inPreviousTasks = (id, previous_id) => {
        if (id === previous_id) return true;
        else if (allTasks[previous_id] && allTasks[previous_id].previous_tasks)
            return allTasks[previous_id].previous_tasks.some((p) =>
                inPreviousTasks(id, p)
            );
        else return false;
    };

    const cleanTasksData = (id, input_value) => {
        input_value = [
            ...new Set(
                input_value
                    .split(",")
                    .filter(
                        (previous_id) =>
                            allTasks[previous_id] &&
                            previous_id !== id &&
                            !inPreviousTasks(id, previous_id)
                    )
            ),
        ];
        allTasks[id].previous_tasks = input_value.toString()
            ? input_value
            : null;
        return input_value;
    };

    return (
        <>
            <tr id="duration">
                <td>Durée</td>
                {listTasks.map((task) => (
                    <td key={task.id}>
                        <input
                            type="text"
                            className="row-input duration-field"
                            style={{
                                maxWidth: "50px",
                                textAlign: "center",
                                border: 0,
                            }}
                            placeholder="1"
                            maxLength={4}
                            onChange={(e) => {
                                e.preventDefault();
                                if (!/^([1-9]?|[1-9]\d*)$/.test(e.target.value))
                                    e.target.value = previousInputVal.current;
                                else setInnputVal(e.target.value);
                                dispatch({
                                    type: "COMPUTABLE",
                                    computabled: [
                                        ...document.querySelectorAll(
                                            ".duration-field"
                                        ),
                                    ].every((element) => element.value),
                                });
                            }}
                            onBlur={(e) => {
                                e.preventDefault();
                                allTasks[task.id].duration = parseInt(
                                    e.target.value
                                );
                                setInnputVal("");
                            }}
                        />
                    </td>
                ))}
            </tr>
            <tr id="previous-task">
                <td>T.ant</td>
                {listTasks.map((task) => (
                    <td key={task.id}>
                        <input
                            type="text"
                            className="row-input"
                            style={{
                                maxWidth: "50px",
                                textAlign: "center",
                                border: 0,
                            }}
                            placeholder="-"
                            onChange={(e) => {
                                e.preventDefault();
                                if (
                                    !/^([a-zA-Z]?|([a-zA-Z],)+[a-zA-Z]?)$/i.test(
                                        e.target.value
                                    )
                                )
                                    e.target.value = previousInputVal.current;
                                else {
                                    e.target.value =
                                        e.target.value.toUpperCase();
                                    e.target.value = cleanTasksData(
                                        task.id,
                                        e.target.value
                                    );
                                    if (e.nativeEvent.data === ",") {
                                        e.target.value += e.target.value
                                            ? ","
                                            : "";
                                    }
                                    setInnputVal(e.target.value);
                                }
                            }}
                            onBlur={(e) => {
                                e.preventDefault();
                                e.target.value = cleanTasksData(
                                    task.id,
                                    e.target.value
                                );
                                setInnputVal("");
                            }}
                        />
                    </td>
                ))}
            </tr>
        </>
    );
}

export default InputRow;
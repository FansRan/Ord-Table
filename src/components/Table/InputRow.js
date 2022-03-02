import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { compute_final_achievment_date, compute_late_date, find_critical_path } from "../../utils/algorithm/table";


function InputRow() {
    const raz = useSelector(state => state.raz);
    const computing = useSelector(state => state.computing);
    const allTasks = useSelector(state => state.allTasks);
    const listTasks = useSelector(state => state.listTasks);
    const linkedTask = useSelector(state => state.linkedTask);
    const dispatch = useDispatch();

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
                    if (typeof allTasks[id].previous_tasks[0] === 'string')
                        allTasks[id].previous_tasks = allTasks[id].previous_tasks.map(task => allTasks[task]);
                    allTasks[id].previous_tasks.forEach(task => task.next_tasks.push(allTasks[id]));
                }
                else linkedTask.start_tasks.push(allTasks[id]);
            }
            const final_date = compute_final_achievment_date(linkedTask);
            compute_late_date(final_date, linkedTask);
            dispatch({ type: 'COMPUTED', final: final_date, path: find_critical_path(final_date, linkedTask) })
        }
    }, [computing]);

    useEffect(() => {
        if (raz) {
            document.querySelectorAll('.row-input').forEach(element => element.value = "");
            dispatch({ type: 'INITIATED' })
        }
    }, [raz]);

    return (
        <>
            <tr id="duration">
                <td>Durée</td>
                {
                    listTasks.map(task =>
                        <td key={task.id}>
                            <input type="text" className="row-input" style={{ maxWidth: '50px', textAlign: 'center' }} placeholder="1"
                                onChange={(e) => { allTasks[task.id].duration = parseInt(e.target.value) }} />
                        </td>)
                }
            </tr>
            <tr id="previous-task">
                <td>T.ant</td>
                {
                    listTasks.map(task =>
                        <td key={task.id}>
                            <input type="text" className="row-input" style={{ maxWidth: '50px', textAlign: 'center' }} placeholder="-"
                                onChange={(e) => { allTasks[task.id].previous_tasks = e.target.value.split(",").map(p => p.trim()) }} />
                        </td>)
                }
            </tr>
        </>
    );
}

export default InputRow;

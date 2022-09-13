import React from "react";
import { Form, Button, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Task } from "../../utils/model/data.model";

const createTask = (e, listTasks, dispatch) => {
    e.target.value =
        e.target.value > 26 ? 26 : e.target.value < 1 ? 1 : e.target.value;
    let list_tasks = [];
    if (listTasks.length > e.target.value) {
        list_tasks = listTasks.slice(0, e.target.value);
        for (let i = 0; i < e.target.value; i++)
            if (list_tasks[i].previous_tasks) {
                list_tasks[i].previous_tasks = list_tasks[
                    i
                ].previous_tasks.filter(
                    (p) =>
                        list_tasks.includes(p) ||
                        list_tasks.map((t) => t.id).includes(p)
                );
                if (!list_tasks[i].previous_tasks.length)
                    list_tasks[i].previous_tasks = null;
            }
    } else {
        list_tasks = listTasks.slice();
        for (let i = listTasks.length; i < e.target.value; i++)
            list_tasks.push(new Task(String.fromCharCode(i + 65)));
    }

    dispatch({
        type: "INITIATE",
        count: e.target.value,
        list: list_tasks,
        computabled: list_tasks.every((task) => task.duration),
    });
};

export default function Control() {
    const listTasks = useSelector((state) => state.listTasks);
    const computable = useSelector((state) => state.computable);
    const dispatch = useDispatch();

    return (
        <Form>
            <Form.Group as={Row} controlId="formTasksCount">
                <Form.Label
                    column
                    sm="12"
                    style={{
                        color: "#eeeeee",
                        fontFamily: "cursive",
                    }}
                >
                    Nombre des tâches
                </Form.Label>
                <Form.Control
                    type="number"
                    min={1}
                    max={26}
                    onChange={(e) => createTask(e, listTasks, dispatch)}
                />
                <Button
                    className="mt-2"
                    variant="primary"
                    disabled={!computable}
                    onClick={() => dispatch({ type: "COMPUTE" })}
                >
                    Calculer
                </Button>
            </Form.Group>
        </Form>
    );
}

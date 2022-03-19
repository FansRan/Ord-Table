import React from "react";
import { Form, Button, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Task } from "../../utils/model/data.model";

const createTask = (e, dispatch) => {
    e.target.value =
        e.target.value > 26 ? 26 : e.target.value < 1 ? 1 : e.target.value;
    const all_tasks = {};
    const list_tasks = [];
    for (let i = 0; i < e.target.value; i++) {
        all_tasks[String.fromCharCode(i + 65)] = new Task(
            String.fromCharCode(i + 65)
        );
        list_tasks.push(all_tasks[String.fromCharCode(i + 65)]);
    }
    dispatch({
        type: "INITIATE",
        count: e.target.value,
        all: all_tasks,
        list: list_tasks,
    });
};

function Control() {
    const computable = useSelector((state) => state.computable);
    const dispatch = useDispatch();

    return (
        <Form>
            <Form.Group as={Row} controlId="formTasksCount">
                <Form.Label column sm="12">
                    Nombre des tâches
                </Form.Label>
                <Form.Control
                    type="number"
                    min={1}
                    max={26}
                    onChange={(e) => createTask(e, dispatch)}
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

export default Control;

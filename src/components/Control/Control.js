import React from "react";
import { Col, Form, Button, Row } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { Task } from "../../utils/model/data.model";


const createTask = (tasksCount, dispatch) => {
    const all_tasks = {};
    const list_tasks = [];
    for (let i = 0; i < tasksCount; i++) {
        all_tasks["T" + i] = new Task("T" + i);
        list_tasks.push(all_tasks["T" + i]);
    }
    dispatch({ type: 'INITIATE', count: tasksCount, all: all_tasks, list: list_tasks });
}

function Control() {
    const dispatch = useDispatch();

    return (
        <Form>
            <Form.Group as={Row} className="mb-3" controlId="formTasksCount">
                <Row>
                    <Form.Label column sm="10">
                        Nombre des tâches
                    </Form.Label>
                    <Col sm="12">
                        <Form.Control type="number" pattern="[0-9]*" onChange={(e) => createTask(e.target.value, dispatch)} />
                    </Col>
                    <Col sm="12">
                        <Button variant="primary" onClick={() => dispatch({ type: 'COMPUTE' })}>Compute</Button>
                    </Col>
                </Row>
            </Form.Group>
        </Form>
    );
}

export default Control;

import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import Control from "../../components/Control/Control";
import CriticalPath from "../../components/CriticalPath/CriticalPath";
import Table from "../../components/Table/Table";

function Home() {
    const tasksCount = useSelector((state) => state.tasksCount);
    const computed = useSelector((state) => state.computed);
    const criticalPath = useSelector((state) => state.criticalPath);
    return (
        <Container as={Row} className="px-5" fluid>
            <Col sm={2}>
                <Control />
            </Col>
            <Col className="pe-5" sm={10}>
                <div className="my-2 p-3" style={{ overflowX: "auto" }}>
                    {Boolean(tasksCount) && (
                        <>
                            <u>Données</u>: <Table type="input" />
                        </>
                    )}
                </div>
                <div className="my-2 p-3" style={{ overflowX: "auto" }}>
                    {computed && (
                        <>
                            <u>Date au plus tôt</u>: <Table type="early" />
                        </>
                    )}
                </div>
                <div
                    id="criticalPathGraph"
                    className="my-2 p-3"
                    style={{ overflowX: "auto", overflowY: "auto" }}
                >
                    {criticalPath && (
                        <>
                            <u>Chémin critique</u>: <CriticalPath />
                        </>
                    )}
                </div>
                <div className="my-2 p-3" style={{ overflowX: "auto" }}>
                    {computed && (
                        <>
                            <u>Date au plus tard</u>: <Table type="late" />
                        </>
                    )}
                </div>
                <div className="my-2 p-3" style={{ overflowX: "auto" }}>
                    {computed && (
                        <>
                            <u>Marges</u>: <Table type="margin" />
                        </>
                    )}
                </div>
            </Col>
        </Container>
    );
}

export default Home;

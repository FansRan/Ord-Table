import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import Control from "../../components/Control/Control";
import CriticalPath from "../../components/CriticalPath/CriticalPath";
import Table from "../../components/Table/Table";

function Home() {
    const computed = useSelector(state => state.computed);
    const criticalPath = useSelector(state => state.criticalPath);
    return (
        <Container>
            <Row>
                <Col xs={10}>
                    <div style={{ overflowX: 'auto' }}>
                        <Table type="input" />
                    </div>
                    <div style={{ overflowX: 'auto' }}>
                        {computed && <Table type="early" />}
                    </div>
                    <div style={{ overflowX: 'auto' }}>
                        {computed && <Table type="late" />}
                    </div>
                    <div style={{ overflowX: 'auto' }}>
                        {criticalPath && <CriticalPath />}
                    </div>
                </Col>
                <Col xs={2}>
                    <Control />
                </Col>
            </Row>
        </Container>
    );
}

export default Home;

import React from "react";
import {Container , Row, Col} from "react-bootstrap";
import SideBar from "../components/SideBar"
import MessageForm from "../components/MessageForm"

function  Chat(){
    return(
        <Container>
            <Row>
                <Col md={4}>
                    <SideBar/>
                </Col>
                <Col md={7}>
                    <MessageForm/>
                </Col>
            </Row>
        </Container>
    )
}

export default Chat
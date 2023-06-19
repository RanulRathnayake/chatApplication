import React from "react";
import {Col, Container, ListGroup, Row} from "react-bootstrap";

function  SideBar(){
    const rooms = ["first room", "second room", "third room"];
    return(
        <>
            <h2>Available rooms</h2>
            <ListGroup>
                {rooms.map((room, idx) =>(
                    <ListGroup.Item key={idx}>
                        {room}
                    </ListGroup.Item>
                ))}
            </ListGroup>
            <h2>Members</h2>
        </>
    );
}

export default SideBar
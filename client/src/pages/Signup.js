import React, {useState} from "react";
import {Col, Container, Row} from "react-bootstrap";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import {Link} from "react-router-dom";
import './Signup.css';
import ProPic from '../assets/proPic.jpg'
import { useSignupUserMutation } from '../services/appApi'



function  Signup(){

    const[email, setEmail] = useState('');
    const[name, setName] = useState('');
    const[password, setPassword] = useState('');
    const [signupUser, {isLoading, error}] = useSignupUserMutation();

    //image upload
    const [image , setImage] = useState(null);
    const [uploadLoadingImage ,setUploadLoadingImage ] = useState(false)
    const [imagePreview, setImagePreview] = useState(null);


    function validateImg(e){
        const file = e.target.files[0];
        if(file.size >= 1048576) {
            return alert("Max file size is 1mb");
        }else{
            setImage(file);
            setImagePreview(URL.createObjectURL(file));
        }
    }

    async function uploadImage(){
        const data= new FormData();
        data.append('file',image);
        data.append('upload_preset', 'kngiemnq');
        try{
            setUploadLoadingImage(true);
            let res = await fetch('https://api.cloudinary.com/v1_1/dgzvpuif6/image/upload', {
                method:'post',
                body:data
            })
            const urlData = await res.json();
            setUploadLoadingImage(false);
            return urlData.url
        }catch (error){
            setUploadLoadingImage(false);
            console.log(error);
        }
    }

    async function handleSignup(e){
        e.preventDefault()
        if(!image) return alert('Please upload your profile picture');
        const url = await uploadImage(image);
        console.log(url);
        signupUser({name, email, password, picture: url}).then(({data}) =>{
            if (data) {
                console.log(data);
            }
        })
    }


    return(
        <Container>
            <Row>
                <Col md={6} className="d-flex align-items-center justify-content-center flex-direction-column">
                    <Form style={{width:"80%", maxWidth:500}} onSubmit={handleSignup}>
                        <h1 className="text-center">Create Account</h1>

                        <div className="signup-profile-pic_container">
                            <img src={imagePreview || ProPic} className="signup-profile-pic"/>
                            <label htmlFor="image-upload" className="image-upload-label">
                                <i className="fas fa-plus-circle add-picture-icon"></i>
                            </label>
                            <input type="file" id="image-upload" hidden accept="image/png, image/jpeg" onChange={validateImg}/>
                        </div>

                        <br/>

                        <Form.Group className="mb-3" controlId="formBasicName">
                            <Form.Label>Name</Form.Label>
                            <Form.Control type="text" placeholder="Your name"  onChange={(e) => setName(e.target.value)} value={name}/>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control type="email" placeholder="Enter email" onChange={(e) => setEmail(e.target.value)} value={email}/>
                            <Form.Text className="text-muted">
                                We'll never share your email with anyone else.
                            </Form.Text>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} value={password}/>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicCheckbox">
                        </Form.Group>
                        <Button variant="primary" type="submit">
                            {uploadLoadingImage ? 'Signing you up..' : 'SignUp'}
                        </Button>
                        <div className="py-4">
                            <p className="text-center">
                                Already have an account ? <Link to="/login">Login</Link>
                            </p>
                        </div>
                    </Form>
                </Col>
                <Col md={6} className="signup_bg"></Col>
            </Row>
        </Container>
    )
}

export default Signup
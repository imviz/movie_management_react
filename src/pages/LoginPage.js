import React from 'react'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import NavBar from '../Components/NavBar/NaveBar'
import Login from '../Components/Login/Login'


function LoginPage() {
  return (
    <div>
        <Row>
            <NavBar/>
        </Row>
        <Row className='justify-content-center mt-1 pt-5'>
   
        <Col lg={5}>     
            <div><Login /></div>
            </Col>
        </Row>  

    </div>

    
  )
}

export default LoginPage
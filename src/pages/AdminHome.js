import React from 'react'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import NavBar from '../Components/NavBar/NaveBar'
import Admin from '../Components/Admin/Admin'


function AdminHome() {
  return (
    <div>
        <Row>
            <NavBar/>
        </Row>
        <Row className='justify-content-center mt-1 pt-5'>
   
        <Col lg={12}>     
            <div><Admin /></div>
            </Col>
        </Row>  

    </div>

    
  )
}

export default AdminHome
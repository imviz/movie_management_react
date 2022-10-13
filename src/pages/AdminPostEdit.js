import React from 'react'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import PostEdit from '../Components/Admin/PostEdit'
import NavBar from '../Components/NavBar/NaveBar'



function AdminPostEdit() {
  return (
    <div>
        <Row>
            <NavBar/>
        </Row>
        <Row className='justify-content-center mt-1 pt-5'>
   
        <Col lg={5}>        
            <div><PostEdit /></div>
            </Col>
        </Row>  

    </div>

    
  )
}

export default AdminPostEdit
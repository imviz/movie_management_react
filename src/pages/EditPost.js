import React from 'react'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import EditPost from '../Components/AddPost/EditPost'
import NavBar from '../Components/NavBar/NaveBar'



function AddPostPage() {
  return (
    <div>
        <Row>
            <NavBar/>
        </Row>
        <Row className='justify-content-center mt-1 pt-5'>
   
        <Col lg={5}>        
            <div><EditPost /></div>
            </Col>
        </Row>  

    </div>

    
  )
}

export default AddPostPage
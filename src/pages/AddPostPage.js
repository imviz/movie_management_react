import React from 'react'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import NavBar from '../Components/NavBar/NaveBar'
import AddPost from '../Components/AddPost/AddPost'



function AddPostPage() {
  return (
    <div>
        <Row>
            <NavBar/>
        </Row>
        <Row className='justify-content-center mt-1 pt-5'>
   
        <Col lg={5}>        
            <div><AddPost /></div>
            </Col>
        </Row>  

    </div>

    
  )
}

export default AddPostPage
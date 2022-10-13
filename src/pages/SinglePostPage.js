import React from 'react'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import NavBar from '../Components/NavBar/NaveBar'
import SinglePost from '../Components/Admin/SinglePost'



function SinglePostPage() {
  return (
    <div>
        <Row>
            <NavBar/>
        </Row>
        <Row className='justify-content-center mt-1 pt-5'>
   
        <Col lg={5}>        
            <div><SinglePost /></div>
            </Col>
        </Row>  

    </div>

    
  )
}

export default SinglePostPage
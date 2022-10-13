import React from 'react'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import NavBar from '../Components/NavBar/NaveBar'
import Home from '../Components/Home/Home'


function HomePage() {
  return (
    <div>
        <Row>
            <NavBar/>
        </Row>
        <Row className='justify-content-center mt-1 pt-5'>
   
        <Col lg={12}>     
            <div><Home /></div>
            </Col>
        </Row>  

    </div>

    
  )
}

export default HomePage
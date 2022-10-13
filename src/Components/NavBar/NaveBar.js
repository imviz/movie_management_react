import React from 'react'
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useSelector,useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { logout, reset } from '../../Redux/Features/LoginSlice';


function NavBar() {
    const datas=useSelector((state)=>state.auth)
    const dispatch=useDispatch()
    const navigate=useNavigate()

  const LogOut=()=>{
    dispatch(logout())
    dispatch(reset())
    navigate('/')
  }
  return (
    
<div>
<Navbar style={{height:'100px',backgroundColor:'white'}}  expand="lg">
      <Container fluid>
        <Navbar.Brand style={{fontWeight:800}} href="#">Movie Bazar</Navbar.Brand>
      {datas.user &&  <Link to='/home'><Button className='ms-5' variant="outline-dark" >HOME</Button></Link> }
            {datas.user ? <Button className='me-5' variant="outline-dark" onClick={LogOut}>Logout</Button> :<Link to='/'><Button variant="outline-dark" >LOGIN</Button></Link>}   
        {/* {datas && <Button className='me-5' variant="outline-dark" onClick={LogOut}>Logout</Button>} */}
    
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: '40px' }}
            navbarScroll
          >
           
          </Nav>              
        </Navbar.Collapse>
   </Container>
    </Navbar>
</div>
  )
}

export default NavBar
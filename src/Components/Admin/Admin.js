import React, { useEffect ,useState} from 'react'
import Table from 'react-bootstrap/Table';
import Col from 'react-bootstrap/Col'
import {useSelector} from 'react-redux'
import axios from '../../Axios';
import Button from 'react-bootstrap/Button';
import {useNavigate} from 'react-router-dom'
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';


function Admin() {

    const navigate=useNavigate()
    useEffect(()=>{
        getallpost()
        userData()
    },[])


    const [delId,setDelId]=useState('')
    const [delName,setdelName]=useState('')
        const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = (id,name) => {
        setDelId(id)
        setdelName(name)
        setShow(true)
        
    };


        // user list
        const [userz,setUser]=useState([])
    const userData=()=>{
        axios.get('adminz/user/',{
            headers: {
            Authorization:'Bearer  '+user.access
        
        }}).then((res)=>{
            console.log(res.data,'data')
            setUser(res.data)
        })
    }


    const [data,setData]=useState([])
    const {user}=useSelector((state)=>state.auth)
    console.log(user,'lll')
    // get all records of book that can seen student on home page 
    const getallpost=()=>{    
        axios.get('adminz/poster/',{
            headers: {
            Authorization:'Bearer  '+user.access
        
        }}).then((res)=>{
            console.log(res.data,'data')
            setData(res.data)
        })
        }
// delete action
        const deletePost=()=>{    
            axios.delete(`adminz/poster/${delId}/`,{
                headers: {
                Authorization:'Bearer  '+user.access
            
            }}).then((res)=>{
                console.log(res.data,'data')
                handleClose()
                getallpost()
              
            })
            }

        const [view,setView]=useState(false)
        const handler=()=>{
            if(view){
                setView(false)
            }else{
                setView(true)
            }
        }

    const deleteUser=()=>{    
        axios.delete(`adminz/user/${delId}/`,{
            headers: {
            Authorization:'Bearer  '+user.access
        
        }}).then((res)=>{
            console.log(res.data,'data')
            handleClose()
            userData()
          
        })
        }
  return (
    <div>
        <Col lg={12} >
            <div style={{margin:'50px'}}>
            <Modal show={show} onHide={handleClose} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Form.Group controlId="my_multiselect_field">
      <Form.Label>delete this  {delName}</Form.Label>
     
    </Form.Group>
   
     
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
       {view ?   <Button variant="primary" onClick={deleteUser}>
            Save Changes
          </Button> : <Button variant="primary" onClick={deletePost}>
            Save Changes
          </Button> }
        </Modal.Footer>
      </Modal>
      <div align='center'>
          {view? <Button variant="primary" onClick={handler} >PostView </Button> : <Button variant="primary" onClick={handler} >User View </Button>  }
      </div>
       { !view ?  <Table  bordered >
        <thead style={{color:'red'}}>
            <tr>
            <th>No's</th>
            <th></th>
            <th>Movie Name</th>
            <th>Type</th>
            <th>View </th>
            <th>Delete</th>
            </tr>
        </thead>
    
       <tbody style={{color:'white'}}>
       {data&& data.map((obj,index)=> 
            <tr>
            <td>{index+1}</td>
            <td ><img style={{width:'80px' ,height:'80px'}} src={obj.image} /></td>
            <td>{obj.movie_name}</td>
            <td>{obj.type}</td>
            <td fullWidth> <Button onClick={()=>navigate(`single/${obj.id}`)}  variant="success">View and Edit</Button></td>
            <th> <Button onClick={()=>handleShow(obj.id,obj.movie_name)}  variant="danger">Delete</Button></th>
            </tr>
              )}
            </tbody>      
        </Table>

            :

        <Table  bordered >
        <thead style={{color:'red'}}>
            <tr>
            <th>No's</th>
            <th> Name</th>
            <th>Email</th>        
            <th>Delete</th>
            </tr>
        </thead>
    
       <tbody style={{color:'white'}}>
       {userz&& userz.map((obj,index)=> 
            <tr>
            <td>{index+1}</td>           
            <td>{obj.name}</td>
            <td>{obj.email}</td>           
            <th> <Button onClick={()=>handleShow(obj.id,obj.name)}  variant="danger">Delete</Button></th>
            </tr>
              )}
            </tbody>      
        </Table> }
            </div>
          
        </Col>
    </div>
  )
}

export default Admin
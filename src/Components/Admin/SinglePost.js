import React,{useEffect,useState} from 'react'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { useParams ,useNavigate} from 'react-router-dom';
import axios from '../../Axios';
import {useSelector} from 'react-redux'
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';


function SinglePost() {
    const parms=useParams()
    const id=parms.id
    const {user}=useSelector((state)=>state.auth)
    const [post,setPost]=useState('')

  const navigate=useNavigate()
    useEffect(() => {
        postData()
        userdata()
    }, [])

    const [users,setUsers]=useState([])
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const postData=()=>{
        axios.get(`adminz/poster/${id}/`,{
            headers: {
            Authorization:'Bearer  '+user.access
        
        }}).then((res)=>{
                console.log(res.data,'ddddd')
              setPost(res.data)
              setSelect(res.data.visibility)
                
               
            })
    }

    const userdata=()=>{
        axios.get(`adminz/user/`,{
            headers: {
            Authorization:'Bearer  '+user.access
        
        }}).then((res)=>{
                console.log(res.data,'data')
                setUsers(res.data)   
            })
    } 


    const changez=()=>{
      console.log(select);
        axios.patch(`adminz/change/${id}/`,{'select':select},{
          headers: {
          Authorization:'Bearer  '+user.access
      
      }}).then((res)=>{
                console.log(res.data,'data')   
                handleClose()
               
            })
    } 
    const [visible, setVisible] = useState([])
    // const  checkVisible=(b,id)=>{
      
       
    //       console.log('kk')
    //       console.log(visible,'pipi',id,'pppopopo')
    //       var f=visible.includes(id)
    //       console.log("nokk",f)
    //       if (f){
    //         console.log('removing ')
    //         setVisible(visible.replace('b'+id,''))
    //       }else{
    //     //    const filterz=
    //     setVisible(visible+'b'+String(id))
    //       }                 
    //   }
      const updates=()=>{
        console.log(visible,'dfdfadsf')
        changez(visible)
      }


      const [select,setSelect]=useState()

   

  return (
    <div align='center'>
          <Modal show={show} onHide={handleClose} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Form.Group controlId="my_multiselect_field">
      <Form.Label>userlist</Form.Label>
       <Form.Control as="select" multiple  onChange={e => setSelect([].slice.call(e.target.selectedOptions).map(item => item.value))} value={select} >    
    {users&& users.map((obj)=>  
         <option style={{color:'black'}} value={obj.id}>{obj.name}</option>      
         )}
      </Form.Control> 
    </Form.Group>
    <h6>you can select multiple element using control and select</h6>
     
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={updates}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>


     <Card style={{ width: '18rem' }}>
      <Card.Img variant="top" src={post.image} />
      <Card.Body>
        <Card.Title>{post.movie_name}</Card.Title>
        <Card.Text>
         {post.movie_description}
        </Card.Text>
        <del>Owner</del>
      {post.user && <h6>{post.user.name}</h6> }<br></br>
            <Button onClick={handleShow} variant="success">Visibility</Button> <br></br>
            <Button onClick={()=>navigate(`/admin/post/${post.id}/`)} variant='contained' color="success">Edit</Button> 
        
      </Card.Body>
    </Card>
    <button onClick={()=>navigate('/admin')}>Back</button>
    </div>
  )
}

export default SinglePost
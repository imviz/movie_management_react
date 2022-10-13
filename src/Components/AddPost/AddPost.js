import React,{useState} from 'react'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import { Link ,useNavigate} from 'react-router-dom';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import './AddPost.css'
import axios from '../../Axios';
import {useSelector} from 'react-redux'

function AddPost() {
    


  const {user}=useSelector((state)=>state.auth)
  const navigate=useNavigate()
  // for storing values
    const [name,setName]=useState('')   
    const [type,setType]=useState('')
    const [description,setDescription]=useState('')
    const [image,setImage]=useState()


    // for validation purpose
    const[nameErr, setNameErr] = useState({})  
    const [typeErr, setTypeErr] = useState({})
    const [desErr, setDesErr] = useState({})
    const [imageErr,setImageErr] = useState({})
   

const formValidation=()=>{ 
  const nameErr={} 
  const typeErr={}
  const desErr={}
  const imageErr={}


  let isValid = true

  // for name
  if (!name){
    nameErr.short_fname = '* this field is required '
      isValid = false
    }


  // for email
  if (!type){
    typeErr.short_fname =  '* this field is required '
    isValid = false
  }

  // for password
  if (!description){
    desErr.short_fname = '* this field is required '
    isValid = false
  }

  // for confirm password
  if (!image){
    imageErr.short_fname =  '* this field is required '
    isValid = false
  }


  setNameErr(nameErr)
  setTypeErr(typeErr)
  setDesErr(desErr)
  setImageErr(imageErr)

  return isValid
  }
  
  const imageView=(e)=>{
    setImage(e.target.files[0])
  }

// register calling
    const handler=(e)=>{
      e.preventDefault()
      const formdata=new FormData()
      formdata.append('movie_name',name)
      formdata.append("movie_description",description)
      formdata.append("type",type)
      formdata.append("image",image)
      formdata.append("user",user.id)
      const isValid = formValidation()
      if (isValid){      
        axios.post('user/poster/',formdata,{
          headers: {
          Authorization:'Bearer  '+user.access
      
      }}).then((res)=>{
              console.log(res.data,'data')
               navigate('/home')
             
          })
      }
    }

    
  return (
    <div>
      <Grid>
        <Paper elevation={5} className='paper'>
         
          <Grid align='center' className='grid'>
          <Avatar >          
          </Avatar >
              <Typography variant='h4' className='typo'>Add Post Here</Typography>
          </Grid>
          <Grid >
            <form onSubmit={handler} className='formss' >   
            <div><TextField style={{marginTop:'55px'}}   InputLabelProps={{
                                                                            style: { color: 'black' ,fontWeight:600,}, 
                                                                        }}        
            variant='standard' name="name"  type='text' label='movie name' placeholder='movie  name' onChange={(e)=>setName(e.target.value)} value={name} fullWidth></TextField>
              {Object.keys(nameErr).map((key)=>{
                                 return <div style={{color:'red'}} >{nameErr[key]}</div> })}        
            </div>       
            <div>
            <TextField style={{marginTop:'40px'}}       InputLabelProps={{
                                                                            style: { color: 'black' ,fontWeight:600}, 
                                                                        }}
            variant='standard' name="type" type='text' label='movie type' onChange={(e)=>setType(e.target.value)} value={type}  placeholder='movie type' fullWidth></TextField>  
             {Object.keys(typeErr).map((key)=>{
                                 return <div style={{color:'red'}} >{typeErr[key]}</div> })}
            </div>      
            <div><TextField  name="password" style={{marginTop:'40px'}} InputLabelProps={{
                                                                            style: { color: 'black' ,fontWeight:600}, 
                                                                        }}
            variant='standard' type='text' label='movie description' placeholder='movie description' onChange={(e)=>setDescription(e.target.value)} value={description}  fullWidth></TextField>
             {Object.keys(desErr).map((key)=>{
                                 return <div style={{color:'red'}} >{desErr[key]}</div> })}
          
            </div>
            <div>
              <label>image</label><br></br>
              <input type='file' onChange={imageView} ></input>
             {Object.keys(imageErr).map((key)=>{
                                 return <div style={{color:'red'}} >{imageErr[key]}</div> })}
            </div>   
            <Button style={{marginTop:'40px'}} type='submit' fullWidth={true} className='button1' variant='outlined'>SIGN UP</Button><br /><br />
            </form> 
          </Grid> 
        </Paper>
      </Grid>
    </div>
  )
}

export default AddPost
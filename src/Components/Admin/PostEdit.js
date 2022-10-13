import React,{useState,useEffect} from 'react'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import { useParams ,useNavigate} from 'react-router-dom';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import '../AddPost/AddPost.css'
import axios from '../../Axios';
import {useSelector} from 'react-redux'

function PostEdit() {
    const parms=useParams()
    const id=parms.id

    useEffect(() => {      
        currentdata()
      
    }, [])

    const currentdata=()=>{
        axios.get(`adminz/poster/${id}`,{
            headers: {
            Authorization:'Bearer  '+user.access
        
        }}).then((res)=>{
                console.log(res.data,'data')
                //  navigate('/home')
                setName(res.data.movie_name)
                setDescription(res.data.movie_description)
                setType(res.data.type)
               
            })
    }
  const {user}=useSelector((state)=>state.auth)
  const navigate=useNavigate()
  // for storing values
    const [name,setName]=useState('')   
    const [type,setType]=useState('')
    const [description,setDescription]=useState('')



 
// register calling
    const handler=(e)=>{
      e.preventDefault()
      const formdata=new FormData()
      formdata.append('movie_name',name)
      formdata.append("movie_description",description)
      formdata.append("type",type)
      
        axios.patch(`adminz/poster/${id}/`,formdata,{
          headers: {
          Authorization:'Bearer  '+user.access
      
      }}).then((res)=>{
              console.log(res.data,'data')
               navigate('/admin')
             
          })
      
    }

    
  return (
    <div>
      <Grid>
        <Paper elevation={5} className='paper'>
         
          <Grid align='center' className='grid'>
          <Avatar >          
          </Avatar >
              <Typography variant='h4' className='typo'>Edit Post Here</Typography>
          </Grid>
          <Grid >
            <form onSubmit={handler} className='formss' >   
            <div><TextField style={{marginTop:'55px'}}   InputLabelProps={{
                                                                            style: { color: 'black' ,fontWeight:600,}, 
                                                                        }}        
            variant='standard' name="name"  type='text' label='movie name' placeholder='movie  name' onChange={(e)=>setName(e.target.value)} value={name} fullWidth></TextField>
             
            </div>       
            <div>
            <TextField style={{marginTop:'40px'}}       InputLabelProps={{
                                                                            style: { color: 'black' ,fontWeight:600}, 
                                                                        }}
            variant='standard' name="type" type='text' label='movie type' onChange={(e)=>setType(e.target.value)} value={type}  placeholder='movie type' fullWidth></TextField>  
           
            </div>      
            <div><TextField  name="password" style={{marginTop:'40px'}} InputLabelProps={{
                                                                            style: { color: 'black' ,fontWeight:600}, 
                                                                        }}
            variant='standard' type='text' label='movie description' placeholder='movie description' onChange={(e)=>setDescription(e.target.value)} value={description}  fullWidth></TextField>
            
          
            </div>
            
            <Button style={{marginTop:'40px'}} type='submit' fullWidth={true} className='button1' variant='outlined'>Change it</Button><br /><br />
            </form> 
          </Grid> 
        </Paper>
      </Grid>
    </div>
  )
}

export default PostEdit
import axios from 'axios'

// for api calling we use axios
const  instance=axios.create({
    baseURL:'https://moviebackend.tk/',
})



export default instance
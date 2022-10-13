import {BrowserRouter,Routes,Route,} from "react-router-dom";
import EditPost from "./Components/AddPost/EditPost";
import EditProfile from "./Components/Register/EditProfile";
import AddPostPage from "./pages/AddPostPage";
import AdminHome from "./pages/AdminHome";
import AdminPostEdit from "./pages/AdminPostEdit";
import HomePage from "./pages/HomePage";
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import SinglePostPage from "./pages/SinglePostPage";

function App() {
  return (
    <>  
       <BrowserRouter> 
          <Routes> 
          <Route path='/register' element={<RegisterPage />} />
          <Route path='' element={<LoginPage />} />
          <Route path='/home' element={<HomePage />} />
          <Route path='/home/addpost' element={<AddPostPage />} />
          <Route path='/home/editpost/:id' element={<EditPost /> } />
          <Route  path='/home/profile' element={<EditProfile />} />
          <Route path='/admin' element={<AdminHome />} />
          <Route path='/admin/single/:id' element={<SinglePostPage />} />
          <Route path='/admin/post/:id' element={<AdminPostEdit />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;

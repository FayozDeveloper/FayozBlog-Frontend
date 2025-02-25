import Container from "@mui/material/Container";
import { Header } from "./components";
import {Home, FullPost, Registration, AddPost, Login, TagPosts} from "./pages";
import {Routes, Route} from "react-router-dom";
import {useEffect} from "react";
import {useDispatch} from "react-redux";
import {fetchAuthMe} from "./redux/slices/auth";

function App() {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchAuthMe());
    }, [dispatch])


  return (
    <>
      <Header />
      <Container maxWidth="lg">
          <Routes>
               <Route path={'/'} element={<Home/>} />
               <Route path={'/posts/:id'} element={<FullPost/>} />
               <Route path={'/posts/:id/edit'} element={<AddPost/>} />
               <Route path={'/tag/:tag'} element={<TagPosts/>} />
               <Route path={'/add-post'} element={<AddPost/>} />
               <Route path={'/login'} element={<Login/>} />
               <Route path={'/signup'} element={<Registration/>} />
          </Routes>
      </Container>
    </>
  );
}

export default App;

import {Routes, Route} from 'react-router-dom'
import AddPostForm from './app/feature/post/AddPostForm';
import EditPostForm from './app/feature/post/EditPost';
import PostsList from './app/feature/post/PostsList';
import SinglePostPage from './app/feature/post/SinglePostPage';
import Layout from './components/Layout';

// path that starts after '/'
// path/post take you to addpostform
// path/post/id takes you to singlepostpage
// index is the home page

function App() {
  return (

    <Routes>
      <Route path='/' element={<Layout />}>

        <Route index element={<PostsList />}/>

        <Route path='post'>
          <Route index element={<AddPostForm />}/>
          <Route path=":postId" element={<SinglePostPage />}/>
          <Route path="edit/:postId" element={<EditPostForm />}/>
        </Route>

      </Route>
    </Routes>
  );
}

export default App;

import useTitle from './hooks/useTitle';
import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Register from './components/Register'
import Login from './features/auth/Login'
import DashLayout from './components/DashLayout'
import Welcome from './features/auth/Welcome'
import UsersList from './features/users/UsersList'
import PostsList from './features/posts/PostsList'
import CommentsList from './features/comments/CommentsList'

function App() {
  useTitle('flexiBlog')

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Register />} />

        <Route path="login" element={<Login />} />

        <Route path="dash" element={<DashLayout />}>

          <Route index element={<Welcome />} />

          <Route path="users">
            <Route index element={<UsersList />} />
          </Route>

          <Route path="posts">
            <Route index element={<PostsList />} />
          </Route>

          <Route path="comments">
            <Route index element={<CommentsList />} />
          </Route>

        </Route>{/* End Dash */}

      </Route>
    </Routes>
  );
}

export default App;

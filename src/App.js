import useTitle from './hooks/useTitle'
import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import NotFoundPage from './components/NotFoundPage'
import Public from './components/Public'
import Register from './components/Register'
import Login from './features/auth/Login'
import DashLayout from './components/DashLayout'
import Welcome from './features/auth/Welcome'
import UserProfile from './features/users/UserProfile'
import PostsList from './features/posts/PostsList'
import CommentsList from './features/comments/CommentsList'
import Prefetch from './features/auth/Prefetch'
import PersistLogin from './features/auth/PersistLogin'

function App() {
  useTitle('FlexiBlog')

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Public />} />

        <Route path="register" element={<Register />} />

        <Route path="login" element={<Login />} />

        <Route element={<PersistLogin />}>
          <Route element={<Prefetch />}>
            <Route path="dash" element={<DashLayout />}>

              <Route index element={<Welcome />} />

              <Route path="users">
                <Route index element={<UserProfile />} />
              </Route>

              <Route path="posts">
                <Route index element={<PostsList />} />
              </Route>

              <Route path="comments">
                <Route index element={<CommentsList />} />
              </Route>

            </Route>{/* End Dash */}
          </Route>
        </Route>

        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}

export default App;

import LoginPage from './pages/Login'
import { BrowserRouter as Router,Route,Routes } from 'react-router-dom'
import SigninPage from './pages/Signin'
import Home from './pages/Home'
import Profile from './pages/Profile'
import SearchPage from './pages/Search'
import Main from './pages/Main'
function App() {

  return (
    <Router>
      <Routes>
        <Route path='/' element={<LoginPage/>}/>
        <Route path='/login' element={<LoginPage/>}/>
        <Route path='/signin' element={<SigninPage/>}/>
        <Route path='/home' element={<Home/>}/>
        <Route path='/search' element={<SearchPage/>}/>
        <Route path='/user' element={<Profile/>}/>
        <Route path='/main' element={<Main/>}/>
      </Routes>
    </Router>
  )
}

export default App

import LoginPage from './pages/Login'
import { BrowserRouter as Router,Route,Routes } from 'react-router-dom'
import SigninPage from './pages/Signin'
import Home from './pages/Home'

function App() {

  return (
    <Router>
      <Routes>
        <Route path='/' element={<LoginPage/>}/>
        <Route path='/login' element={<LoginPage/>}/>
        <Route path='/signin' element={<SigninPage/>}/>
        <Route path='/home' element={<Home/>}/>
      </Routes>
    </Router>
  )
}

export default App

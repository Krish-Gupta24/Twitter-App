import LoginPage from './pages/Login'
import { BrowserRouter as Router,Route,Routes } from 'react-router-dom'
import SigninPage from './pages/Signin'

function App() {

  return (
    <Router>
      <Routes>
        <Route path='/' element={<LoginPage/>}/>
        <Route path='/login' element={<LoginPage/>}/>
        <Route path='/signin' element={<SigninPage/>}/>
      </Routes>
    </Router>
  )
}

export default App

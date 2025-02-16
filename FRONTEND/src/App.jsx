  import {
    BrowserRouter as Router,
    Route,
    Routes,
    Navigate,
  } from "react-router-dom";
  import LoginPage from "./pages/Login";
  import SigninPage from "./pages/Signin";
  import Home from "./pages/Home";
  import Profile from "./pages/Profile";
  import SearchPage from "./pages/Search";
  import Main from "./pages/Main";

  const ProtectedRoute = ({ children }) => {
    const isAuthenticated = localStorage.getItem("token") !== null;

    if (!isAuthenticated) {
      return <Navigate to="/login" replace />;
    }

    return children;
  };

  function App() {
    return (
      <Router>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<LoginPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signin" element={<SigninPage />} />

          {/* Protected Routes */}
          <Route
            path="/home"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route
            path="/search"
            element={
              <ProtectedRoute>
                <SearchPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/user"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
          <Route
            path="/main"
            element={
              <ProtectedRoute>
                <Main />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Router>
    );
  }



  export default App;

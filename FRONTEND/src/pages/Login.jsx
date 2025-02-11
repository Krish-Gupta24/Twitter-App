import React from 'react'
import { Link } from 'react-router-dom'

const Login = () => {
  return (
    // Add a full-screen container with centering
    <div className="min-h-screen w-full flex items-center justify-center bg-base-200">
      <div className="card bg-base-100 w-96 shadow-xl">
        <div className="card-body">
          <h2 className="card-title justify-center text-2xl font-bold mb-4">Login</h2>
          
          <form className="space-y-4">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input 
                type="email" 
                placeholder="email@example.com" 
                className="input input-bordered" 
              />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input 
                type="password" 
                placeholder="Enter your password" 
                className="input input-bordered" 
              />
              <label className="label">
                <Link to={"/"} className='label-text-alt link link-hover'>Forgot password?</Link>
              </label>
            </div>

            <div className="card-actions">
              <button className="btn btn-primary w-full">Login</button>
            </div>
          </form>

          <div className="text-center mt-4 text-sm">
            Don't have an account? 
            <Link to={'/signin'} className="link link-primary ml-1">Sign up</Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login  
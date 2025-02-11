import React from 'react'
import { Link } from 'react-router-dom'

const Signup = () => {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-base-200">
      <div className="card bg-base-100 w-96 shadow-xl">
        <div className="card-body">
          <h2 className="card-title justify-center text-2xl font-bold mb-4">Create Account</h2>
          
          <form className="space-y-4">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Full Name</span>
              </label>
              <input 
                type="text" 
                placeholder="John Doe" 
                className="input input-bordered" 
              />
            </div>

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
                placeholder="Create a password" 
                className="input input-bordered" 
              />
              <label className="label">
                <span className="label-text-alt">Must be at least 8 characters</span>
              </label>
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Confirm Password</span>
              </label>
              <input 
                type="password" 
                placeholder="Confirm your password" 
                className="input input-bordered" 
              />
            </div>

            <div className="form-control">
              <label className="label cursor-pointer">
                <span className="label-text">I agree to the Terms of Service and Privacy Policy</span>
                <input type="checkbox" className="checkbox checkbox-primary" />
              </label>
            </div>

            <div className="card-actions">
              <button className="btn btn-primary w-full">Create Account</button>
            </div>
          </form>

          <div className="text-center mt-4 text-sm">
            Already have an account? 
            <Link to={'/login'} className="link link-primary ml-1">Login</Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Signup
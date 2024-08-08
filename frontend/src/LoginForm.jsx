import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import {jwtDecode} from 'jwt-decode';

import toast from 'react-hot-toast';

const LoginForm = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const response = await axios.post('http://localhost:5000/login', data);
      const accessToken = response.data.accessToken;
      localStorage.setItem('accessToken', accessToken);

      // Decode the token to get the role
      const decodedToken = jwtDecode(accessToken);
      const userRole = decodedToken.role;

      // Redirect based on the role
      if (userRole === 'Admin' || userRole === 'Manager') {
        navigate('/manager_dashboard');
      } else {
        navigate('/user_dashboard');
      }

      toast.success("Logged In Successfully!");
    } catch (error) {
      console.error('Login error:', error);
      toast.error("Login Error");
    }
  };

  return (
    <>
    
    <div className="flex min-h-[100dvh] items-center justify-center bg-gradient-to-br from-primary to-primary-foreground/50 px-4 py-12 sm:px-6 lg:px-8 bg-white">
      <div className="mx-auto w-full max-w-md space-y-6 rounded-lg bg-background p-8 shadow-lg">
        <div className="space-y-2 text-center">
          <h1 className="text-3xl font-bold tracking-tight text-foreground">Sign in to your account</h1>
          <p className="text-muted-foreground">Enter your email and password below to access your account.</p>
        </div>
        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 sr-only"
              htmlFor="email"
            >
              Email
            </label>
            <input
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              id="email"
              placeholder="name@example.com"
              type="email"
              {...register('email', { required: 'Email is required' })}
            />
            {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
          </div>
          <div>
            <label
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 sr-only"
              htmlFor="password"
            >
              Password
            </label>
            <input
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              id="password"
              placeholder="Password"
              type="password"
              {...register('password', { required: 'Password is required' })}
            />
            {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>}
          </div>
          <button
            className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-black text-white hover:bg-black/90 h-10 px-4 py-2 w-full"
            type="submit"
            >
            Sign In
        </button>
        </form>
      </div>
    </div>
    </>
  );
};

export default LoginForm;

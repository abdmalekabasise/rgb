"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import Header1 from '@/components/headers/Header1';
import Footer1 from '@/components/footer/Footer1';
import { signUp } from '@/data/api';
import { useRouter } from 'next/navigation';

export default function Signup() {
  const router = useRouter();
  // State to manage form inputs and errors
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
  });

  const [errors, setErrors] = useState({});

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Validate the form inputs
  const validate = () => {
    let tempErrors = {};
    if (!formData.fullName) tempErrors.fullName = "Full Name is required";
    if (!formData.email) {
      tempErrors.email = "Email address is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      tempErrors.email = "Email address is invalid";
    }
    if (!formData.password) {
      tempErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      tempErrors.password = "Password must be at least 6 characters long";
    }
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent the default form submission behavior

    if (validate()) {
      // Perform form submission logic, e.g., send data to an API
      console.log('Form submitted successfully', formData);
      const data = await signUp(formData);
      if (data.error) {
        setErrors(data)
      } else {
        localStorage.setItem('token', data.token);
        // Reset the form after submission (optional)
        setFormData({
          fullName: '',
          email: '',
          password: '',
        });
        router.push('/');
        setErrors({});
      }

    } else {
      console.log('Form validation failed');
    }
  };

  return (
    <>
      {/* Header */}
      <Header1 />

      {/* Main Content */}
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-purple-200 via-purple-300 to-purple-400 mt-6">
        <div className="bg-white p-10 rounded-lg shadow-2xl max-w-md w-full">
          <h1 className="text-3xl font-bold text-center text-purple-700 mb-8">Sign Up</h1>
          <form onSubmit={handleSubmit}>
            <div className="mb-6">
              <label htmlFor="name" className="block text-sm font-medium text-purple-700">
                Full Name
              </label>
              <input
                type="text"
                id="name"
                name="fullName"
                value={formData.name}
                onChange={handleChange}
                className={`mt-2 block w-full px-4 py-3 border rounded-lg shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm ${errors.name ? 'border-red-500' : 'border-purple-300'}`}
                required
              />
              {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
            </div>
            <div className="mb-6">
              <label htmlFor="email" className="block text-sm font-medium text-purple-700">
                Email address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={`mt-2 block w-full px-4 py-3 border rounded-lg shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm ${errors.email ? 'border-red-500' : 'border-purple-300'}`}
                required
              />
              {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
            </div>
            <div className="mb-6">
              <label htmlFor="password" className="block text-sm font-medium text-purple-700">
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className={`mt-2 block w-full px-4 py-3 border rounded-lg shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm ${errors.password ? 'border-red-500' : 'border-purple-300'}`}
                required
              />
              {errors.password && <p className="text-red-600 text-sm mt-1">{errors.password}</p>}
            </div>
            <button
              type="submit"
              className="login-style margin-auto w-full bg-purple-700 text-white py-3 px-4 rounded-lg hover:bg-purple-800 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
            >
              Sign Up
            </button>
            {errors.error && <h6 className="text-red-500 text-sm mt-1">{errors.error}</h6>}
          </form>
          <div className="mt-8 text-center">
            <p className="text-sm text-purple-600">
              Already have an account?{' '}
              <Link href="/login" className="text-purple-700 hover:text-purple-800 font-medium">
                Login
              </Link>
            </p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer1 />
    </>
  );
}

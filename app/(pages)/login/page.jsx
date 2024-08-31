"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Header1 from "@/components/headers/Header1";
import Footer1 from "@/components/footer/Footer1";
import axios from "axios";
import { login } from "@/data/api";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState();
  const [errors, setErrors] = useState({});
  const router = useRouter();

  const validate = () => {
    let valid = true;
    if (!email) {
      setError("Email address is required.");
      valid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setError("Email address is invalid.");
      valid = false;
    }
    if (!password) {
      setError("Password is required.");
      valid = false;
    }
    return valid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent the default form submission behavior

    if (validate()) {
      // Perform form submission logic, e.g., send data to an API
      console.log('Form submitted successfully');
      const data = await login({ email, password });
      console.log("date:::", data);
      if (data.error) {
        setErrors(data)
      } else {
        localStorage.setItem('token', data.token);
        // Reset the form after submission (optional)
        router.push('/');
        setErrors({});
      }

    } else {
      console.log('Form validation failed');
    }
  };


  return (
    <>
      <Header1 />

      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="bg-white p-8 shadow-lg max-w-md w-full">
          <h1 className="text-2xl font-semibold text-center mb-6 border-solid border-2 border-sky-500">
            Elite Game Boost
          </h1>
          {error && <p className="text-red-500 text-center mb-4">{error}</p>}
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                required
              />
            </div>
            <div className="mb-6">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                required
              />
            </div>
            <div className="">
            <p className="text-sm text-gray-600">
              
              <Link href="/forgot-password" className="text-indigo-600 hover:text-indigo-500">
                Forgot password?
              </Link>
            </p>
          </div>

            <button
              type="submit"
              className="mt-6 login-style margin-auto w-full bg-purple-700 text-white py-3 px-4 rounded-lg hover:bg-purple-800 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
            >
              Login
            </button>
            {errors.error && <h6 className="mt-3 text-red text-sm mt-1">{errors.error}</h6>}
          </form>
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Don&apos;t have an account?{" "}
              <Link href="/signup" className="text-indigo-600 hover:text-indigo-500">
                Register
              </Link>
            </p>
          </div>
        </div>
      </div>

      <Footer1 />
    </>
  );
}

/* eslint-disable @next/next/no-img-element */
"use client";
import React from "react";
import Link from "next/link";
import Header1 from "@/components/headers/Header1";
import Footer1 from "@/components/footer/Footer1";

export default function Login() {
  return (
    <>
      {/* Header */}
      <Header1 />

      {/* Main Content */}
      <div className="min-h-screen flex flex-col">
        <div className="flex-grow flex items-center justify-center bg-slate-950">
          <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
          <h1 className="text-3xl font-bold text-center mb-6 border-2 border-rose-500 rounded-full px-4 py-2">
  Sign Up
</h1>

            <form>
              <div className="mb-4">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  required
                />
              </div>
              <div className="mb-6">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700"
                >
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  required
                />
              </div>
              <button
                type="submit"
                className="login-style w-full bg-purple-700 text-white py-3 px-4 rounded-lg hover:bg-purple-800 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
              >
                Register
              </button>
            </form>
          </div>
        </div>

        {/* Footer */}
        <Footer1 />
      </div>
    </>
  );
}

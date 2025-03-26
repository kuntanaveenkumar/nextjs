'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
export default function Home() {
  const [email, setEmail] = useState('');
  const router = useRouter()
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const FormData = { "username": email, "password": password };
      const res = await fetch('https://localhost/api/auth', {
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(FormData),
      });
      const data = await res.json();
      if (res.ok) {
        if (data.result.token != "" && data.result.token != null) {
          sessionStorage.setItem("nextoken", data.result.token)

          router.push('/serials')
        }
        setMessage(data.message);
      } else {
        setMessage(data.message);
      }
    } catch (error) {
      setMessage('An error occurred. Please try again.' + error);
    }
  };
  return (
    <div className="w-full max-w-md bg-white rounded-lg shadow-md p-8">
      <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">Login</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
          <input
            type="text"
            id="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            placeholder="Enter your email"
            required
          />
        </div>
        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            placeholder="Enter your password"
            required
          />
        </div>
        <div className="flex items-center justify-between">
          <label className="flex items-center">
            <input
              type="checkbox"
              name="remember"
              className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            />
            <span className="ml-2 text-sm text-gray-600">Remember me</span>
          </label>
          <a href="#" className="text-sm text-blue-600 hover:underline">Forgot password?</a>
        </div>
        <div>
          <button
            type="submit"
            className="w-full py-2 px-4 bg-red-600 hover:bg-red-700 text-white font-medium rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none"
          >
            Login
          </button>
        </div>
      </form>
      {message && <p className="mt-4 text-center text-sm text-red-600">{message}</p>}
      <p className="mt-6 text-center text-sm text-gray-600">
        Don&apos;t have an account? <a href="#" className="text-blue-600 hover:underline">Sign up</a>
      </p>
    </div>
  );
}

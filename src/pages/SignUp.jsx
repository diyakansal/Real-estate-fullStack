// import React, { useState } from 'react'
// import { Link, useNavigate } from 'react-router-dom'
// import OAuth from '../components/OAuth';


// export default function SignUp() {
//   const [formData, setFormData] = useState({})
//   const [error, setError] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const navigate = useNavigate();
//   const handleChange = (e) => {
//     setFormData(
//       {
//         ...formData,
//         [e.target.id]: e.target.value,
//       }
//     );
//   };
//   const handleSubmit = async(e) =>{
//     e.preventDefault();
    
//     try {
      
//         setLoading(true);
//         const res = await fetch('/api/auth/signup', 
//         {
//             method: 'POST', 
//             headers: {
//               'Content-Type': 'application/json',
//             },
//             body: JSON.stringify(formData),
//         });
//         const data = await res.json();
//         console.log(data);
//         if(data.success === false){
//           setLoading(false);
//           setError(data.message);
//           return;
//         }
//         setLoading(false);
//         setError(null);
//         navigate('/sign-in');
//       }
//     catch (error) {
//       setLoading(false);
//       setError(error.message);
//     }
//   }
//   return (
//     <div className='p-3 max-w-lg mx-auto'> 
//       <h1 className='text-3xl text-center font-semibold my-7'>
//         Sign Up
//       </h1>
//       <form onSubmit={handleSubmit}  className='flex flex-col gap-4'>
//         <input type="text" placeholder='username' className='border p-3 rounded-lg' id='username' required onChange={handleChange} />
//         <input type="email" placeholder='email' className='border p-3 rounded-lg' id='email' required onChange={handleChange} />
//         <input type="password" placeholder='password' className='border p-3 rounded-lg' id='password' required onChange={handleChange} />

//         <button disabled={loading}  className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80'>
//           {loading? 'Loading...': 'Sign up'}
//         </button>
//         <OAuth />
//       </form>
//       <div className="flex gap-2 mt-5"> 
//       <p>Have an account?</p>
//       <Link to="/sign-in">
//         <span className='text-blue-700'>Sign in</span>
//       </Link>
//       </div>
//       <div className='text-red-500 mt-5'>
//         {error}
//       </div>
//     </div>
//   )
// }

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import OAuth from '../components/OAuth';

export default function SignUp() {
  const [formData, setFormData] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        setLoading(false);
        setError(data.message);
        return;
      }
      setLoading(false);
      setError(null);
      navigate('/sign-in');
    } catch (error) {
      setLoading(false);
      setError(error.message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-green-50">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
        <h1 className="text-3xl text-center font-semibold mb-6 text-green-700">Sign Up</h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <input
            type="text"
            placeholder="Username"
            className="border p-4 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-green-500 placeholder-gray-500 text-lg"
            id="username"
            required
            onChange={handleChange}
          />
          <input
            type="email"
            placeholder="Email"
            className="border p-4 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-green-500 placeholder-gray-500 text-lg"
            id="email"
            required
            onChange={handleChange}
          />
          <input
            type="password"
            placeholder="Password"
            className="border p-4 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-green-500 placeholder-gray-500 text-lg"
            id="password"
            required
            onChange={handleChange}
          />
          <button
            disabled={loading}
            className="bg-green-700 text-white p-4 rounded-lg uppercase hover:bg-green-800 focus:outline-none focus:ring-2 focus:ring-green-400 shadow-md disabled:opacity-80 w-full"
          >
            {loading ? 'Loading...' : 'Sign Up'}
          </button>
        </form>

        {/* Space between Sign Up button and Continue with Google */}
        <div className="mt-5 mx-16">
          <OAuth
            buttonClass="bg-green-700 text-white p-4 rounded-lg uppercase hover:bg-green-800 focus:outline-none focus:ring-2 focus:ring-green-400 shadow-md w-full"
          />
        </div>

        <div className="flex justify-center gap-2 mt-5 text-lg">
          <p>Have an account?</p>
          <Link to="/sign-in">
            <span className="text-green-700 font-semibold hover:underline">Sign In</span>
          </Link>
        </div>

        {error && (
          <div className="text-red-500 mt-4 text-center">
            <p>{error}</p>
          </div>
        )}
      </div>
    </div>
  );
}


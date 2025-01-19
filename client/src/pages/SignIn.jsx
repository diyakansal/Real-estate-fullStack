// import React, { useState } from 'react'
// import { Link, useNavigate } from 'react-router-dom'
// import { useDispatch, useSelector } from 'react-redux';
// import {signInStart, signInSuccess, signInFailure} from '../redux/user/userSlice';
// import OAuth from '../components/OAuth';


// export default function SignIn() {
//   const [formData, setFormData] = useState({})
//   const { loading, error } = useSelector((state) => state.user);
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
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
      
//         dispatch(signInStart());
//         const res = await fetch('/api/auth/signin', 
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
//           dispatch(signInFailure(data.message));
//           return;
//         }
//         dispatch(signInSuccess(data));
//         navigate('/');
//       }
//     catch (error) {
//       dispatch(signInFailure(error.message));
//     }
//   }
//   return (
//     <div className='p-3 max-w-lg mx-auto'> 
//       <h1 className='text-3xl text-center font-semibold my-7'>
//         Sign In
//       </h1>
//       <form onSubmit={handleSubmit}  className='flex flex-col gap-4'>
        
//         <input type="email" placeholder='email' className='border p-3 rounded-lg' id='email' required onChange={handleChange} />
//         <input type="password" placeholder='password' className='border p-3 rounded-lg' id='password' required onChange={handleChange} />

//         <button disabled={loading}  className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80'>
//           {loading? 'Loading...': 'Sign in'}
//         </button>
//         <OAuth />
//       </form>
//       <div className="flex gap-2 mt-5"> 
//       <p>Dont Have an account?</p>
//       <Link to="/sign-up">
//         <span className='text-blue-700'>Sign up</span>
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
import { useDispatch, useSelector } from 'react-redux';
import { signInStart, signInSuccess, signInFailure } from '../redux/user/userSlice';
import OAuth from '../components/OAuth';

export default function SignIn() {
  const [formData, setFormData] = useState({});
  const { loading, error } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      dispatch(signInStart());
      const res = await fetch('/api/auth/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(signInFailure(data.message));
        return;
      }
      dispatch(signInSuccess(data));
      navigate('/');
    } catch (error) {
      dispatch(signInFailure(error.message));
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-green-50">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
        <h1 className="text-3xl text-center font-semibold mb-6 text-green-700">
          Sign In
        </h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
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
            {loading ? 'Loading...' : 'Sign In'}
          </button>
        </form>

        {/* Space between buttons */}
        <div className="mt-5 mx-20">
          <OAuth buttonClass="bg-green-700 text-white p-4 rounded-lg uppercase hover:bg-green-800 focus:outline-none focus:ring-2 focus:ring-green-400 shadow-md w-full" />
        </div>

        <div className="flex justify-center gap-2 mt-5 text-lg">
          <p>Don't have an account?</p>
          <Link to="/sign-up">
            <span className="text-green-700 font-semibold hover:underline">Sign Up</span>
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


// import React, { useState } from 'react'
// import { getDownloadURL, ref, getStorage, uploadBytesResumable } from 'firebase/storage'
// import { app } from '../firebase';
// import {useSelector} from 'react-redux'
// import {useNavigate} from 'react-router-dom'


// function CreateListing() {
//   const {currentUser}  = useSelector(state => state.user)
//   const [files, setFiles] = useState ([]);
//   const [formData, setFormData] = useState({
//     imageUrls: [],
//     name: '',
//     description: '',
//     type:'rent',
//     bedrooms: 1,
//     bathrooms: 1,
//     regularPrice: 50,
//     discountPrice: 0,
//     offer: false,
//     parking: false,
//     furnished: false,
//   })
//   const navigate = useNavigate(); 
//   const [imageUploadError, setImageUploadError] = useState(false);
//   const [uploading, setUploading] = useState(false);
//   const [error, setError] = useState(false);
//   const [loading, setLoading] = useState(false);
//   console.log(formData);
//   const handleImageSubmit = (e) => {
//     if(files.length > 0 && files.length + formData.imageUrls.length < 7){
//       setUploading(true);
//       setImageUploadError(false);
//       const promises = [];

//       for(let i = 0; i < files.length; i++){
//         promises.push(storeImage(files[i]));
//       }
//       Promise.all(promises).then((urls) => {
//         setFormData({...formData, imageUrls: formData.imageUrls.concat(urls) });
//         setImageUploadError(false);
//         setUploading(false);
//       }).catch((err) => {
//         setImageUploadError('Image upload failed (2 mb max per image)');
//         setUploading(false);
//       });
      
//     }
//     else{
//       setImageUploadError('You can only upload 6 images per listing')
//       setUploading(false);
//     }
//   };

//   const storeImage = async (file) => {
//     return new Promise((resolve, reject) => {
//       const storage = getStorage(app);
//       const fileName = new Date().getTime() + file.name;
//       const storageRef = ref(storage, fileName);
//       const uploadTask = uploadBytesResumable(storageRef, file);

//       uploadTask.on(
//         'state_changed',
//         (snapshot) => {
//           const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
//           console.log(`upload is ${progress}% done`);
//         },
//         (error)=>{
//           reject(error);
//         },
//         ()=>{
//           getDownloadURL(uploadTask.snapshot.ref).then((getDownloadURL) => {
//             resolve(getDownloadURL);
//           });
//         }
//       )
//     })
//   }

//   const handleRemoveImage = (index) => {
//     setFormData({ 
//       ...formData,
//       imageUrls: formData.imageUrls.filter((_, i) => i !== index),
//     })
//   }

//   const handleChange = (e) => {
//     if(e.target.id === 'sale' || e.target.id === 'rent'){
//       setFormData({
//         ...formData,
//         type: e.target.id
//       })
//     }

//     if(e.target.id === 'parking' || e.target.id === 'furnished' || e.target.id === 'offer'){
//       setFormData({
//         ...formData,
//         [e.target.id]: e.target.checked
//       })
//     }

//     if(e.target.type === 'number' || e.target.type ==='text' || e.target.type === 'textarea'){
//       setFormData({
//         ...formData,
//         [e.target.id]: e.target.value 
//       })
//     }
//   }

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       if(formData.imageUrls.length < 1) return setError('You must upload at least one image');
//       if(+formData.regularPrice < +formData.discountPrice) return setError('Discount Price must be lower than regular price')
//       setLoading(true);
//       setError(false);

//       const res = await fetch('/api/listing/create', {
//         method: 'POST',
//         headers: {
//           "Content-Type": 'application/json',
//         },
//         body: JSON.stringify({
//           ...formData,
//           userRef: currentUser._id,
//         }),
//       });
//       const data = await res.json();
//       setLoading(false);
//       if(data.success === false){
//         setError(data.message);
//       }
//       navigate(`/listing/${data._id}`)
//     } catch (error) {
//       setError(error.message);
//       setLoading(false);
//     }
//   }
//   return (
//     <main className='p-3 max-w-4xl mx-auto'>
//       <h1 className='text-3xl font-semibold text-center my-7'>Create a Listing</h1>
//       <form className='flex flex-col sm:flex-row gap-4' onSubmit={handleSubmit}> 
//         <div className='flex flex-col gap-4 flex-1'>
//           <input type="text" placeholder='Name' className='border p-3 rounded-lg' id='name' maxLength='62' minLength='10' required onChange={handleChange} value={formData.name} />
//           <textarea type="text" placeholder='Description' className='border p-3 rounded-lg' id='description' required onChange={handleChange} value={formData.description} />
//           <input type="text" placeholder='Address' className='border p-3 rounded-lg' id='address' required onChange={handleChange} value={formData.address} />

//           <div className='flex gap-6 flex-wrap'>
//             <div className="flex gap-2">
//               <input type="checkbox" className='w-5' id="sale" onChange={handleChange} checked={formData.type === "sale"} />
//               <span>Sell</span>
//             </div>
//             <div className="flex gap-2">
//               <input type="checkbox" className='w-5' id="rent" onChange={handleChange} checked={formData.type === 'rent'} />
//               <span>Rent</span>
//             </div>
//             <div className="flex gap-2">
//               <input type="checkbox" className='w-5' id="parking" onChange={handleChange} checked={formData.parking} />
//               <span>Parking spot</span>
//             </div>
//             <div className="flex gap-2">
//               <input type="checkbox" className='w-5' id="furnished" onChange={handleChange} value={formData.furnished} />
//               <span>Furnished</span>
//             </div>
//             <div className="flex gap-2">
//               <input type="checkbox" className='w-5' id="offer" onChange={handleChange} value={formData.offer} />
//               <span>Offer</span>
//             </div>
//           </div>

//           <div className='flex flex-wrap gap-6'>
//             <div className='flex items-ceter gap-2'>
//               <input type="number"  id="bedrooms" min='1' max='10'  required className='p-3 border border-gray-300 rounded-lg' onChange={handleChange} value={formData.bedrooms} />
//               <p>Beds</p>
//             </div>
//             <div className='flex items-ceter gap-2'>
//               <input type="number"  id="bathrooms" min='1' max='5'  required className='p-3 border border-gray-300 rounded-lg'  onChange={handleChange} value={formData.bathrooms}/>
//               <p>Baths</p>
//             </div>
//             <div className='flex items-ceter gap-2'>
//               <input type="number"  id="regularPrice" min='50' max='10000000'  required className='p-3 border border-gray-300 rounded-lg' onChange={handleChange} value={formData.regularPrice} />
//               <div className="flex flex-col items-center">
//                 <p>Regular price</p>
//                 <span className='text-xs'>($ / month)</span>
//               </div>
              
//             </div>
            
//             {formData.offer && (
//               <div className='flex items-ceter gap-2'>
//               <input type="number"  id="discountPrice" min='0' max='1000000'  required className='p-3 border border-gray-300 rounded-lg'  onChange={handleChange} value={formData.discountPrice} />
              
//               <div className="flex flex-col items-center">
//                 <p>Discounted price</p>
//                 <span className='text-xs'>($ / month)</span>
//               </div>
//             </div>
//             )} 

            
//           </div>

//         </div>

//         <div className="flex flex-col flex-1 gap-4">
//           <p className='font-semibold'>Images:
//             <span className='font-normal text-gray-600 ml-2'>The first image will be the cover (max 6)</span>
//           </p>
//           <div className="flex gap-4">
//             <input className='p-3 border-gray-300 rounded w-full' onChange={(e)=> setFiles(e.target.files)} type="file" id='images' accept='image/*' multiple />
//             <button type='button' disabled={uploading} onClick={handleImageSubmit}  className='p-3 text-green-700 border  border-green-700 rounded uppercase hover:shadow-lg disabled: opacity-80'>{uploading ? 'Uploading...':'Upload'}</button>
//           </div>
//           <p className='text-red-700 text-sm'>{imageUploadError && imageUploadError}</p>

//           {
//             formData.imageUrls.length > 0 && formData.imageUrls.map((url, index) => (
//               <div key={url} className="flex justify-between p-3 border items-center">
//                 <img src={url} alt="listing image" className='w-20 h-20 object-contain rounded-lg'/>
//                 <button type='button' onClick={()=>handleRemoveImage(index)}   className='p-3 text-red-700 rounded-lg uppercase hover:opacity-75'>Delete</button>
//               </div>
//             ))
//           }

//           <button disabled={loading || uploading}  className='p-3 bg-slate-700 text-white rounded-lg uppercase hover:opacity-95 disabled:opacity-80'>{loading ?'Creating...' : 'Create listing'}</button>          
//         </div>
//         {error && <p className='text-red-700 text-sm'>{error}</p>}
//       </form>
//     </main>
//   )
// } 

// export default CreateListing;

import React, { useState } from 'react';
import { getDownloadURL, ref, getStorage, uploadBytesResumable } from 'firebase/storage';
import { app } from '../firebase';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

function CreateListing() {
  const { currentUser } = useSelector((state) => state.user);
  const [files, setFiles] = useState([]);
  const [formData, setFormData] = useState({
    imageUrls: [],
    name: '',
    description: '',
    type: 'rent',
    bedrooms: 1,
    bathrooms: 1,
    regularPrice: 50,
    discountPrice: 0,
    offer: false,
    parking: false,
    furnished: false,
  });
  const navigate = useNavigate();
  const [imageUploadError, setImageUploadError] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleImageSubmit = (e) => {
    if (files.length > 0 && files.length + formData.imageUrls.length < 7) {
      setUploading(true);
      setImageUploadError(false);
      const promises = [];

      for (let i = 0; i < files.length; i++) {
        promises.push(storeImage(files[i]));
      }

      Promise.all(promises)
        .then((urls) => {
          setFormData({ ...formData, imageUrls: formData.imageUrls.concat(urls) });
          setImageUploadError(false);
          setUploading(false);
        })
        .catch((err) => {
          setImageUploadError('Image upload failed (2 mb max per image)');
          setUploading(false);
        });
    } else {
      setImageUploadError('You can only upload 6 images per listing');
      setUploading(false);
    }
  };

  const storeImage = async (file) => {
    return new Promise((resolve, reject) => {
      const storage = getStorage(app);
      const fileName = new Date().getTime() + file.name;
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        'state_changed',
        (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log(`upload is ${progress}% done`);
        },
        (error) => {
          reject(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((getDownloadURL) => {
            resolve(getDownloadURL);
          });
        }
      );
    });
  };

  const handleRemoveImage = (index) => {
    setFormData({
      ...formData,
      imageUrls: formData.imageUrls.filter((_, i) => i !== index),
    });
  };

  const handleChange = (e) => {
    if (e.target.id === 'sale' || e.target.id === 'rent') {
      setFormData({
        ...formData,
        type: e.target.id,
      });
    }

    if (e.target.id === 'parking' || e.target.id === 'furnished' || e.target.id === 'offer') {
      setFormData({
        ...formData,
        [e.target.id]: e.target.checked,
      });
    }

    if (e.target.type === 'number' || e.target.type === 'text' || e.target.type === 'textarea') {
      setFormData({
        ...formData,
        [e.target.id]: e.target.value,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (formData.imageUrls.length < 1) return setError('You must upload at least one image');
      if (+formData.regularPrice < +formData.discountPrice)
        return setError('Discount Price must be lower than regular price');
      setLoading(true);
      setError(false);

      const res = await fetch('/api/listing/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          userRef: currentUser._id,
        }),
      });
      const data = await res.json();
      setLoading(false);
      if (data.success === false) {
        setError(data.message);
      }
      navigate(`/listing/${data._id}`);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  return (
    <main className="p-8 max-w-6xl mx-auto bg-white shadow-xl rounded-lg mt-8">
      <h1 className="text-3xl font-semibold text-center mb-8 text-green-800">Create a Listing</h1>
      <form className="flex flex-col md:flex-row gap-8" onSubmit={handleSubmit}>
        {/* Left Form Section */}
        <div className="flex flex-col gap-6 flex-1">
          <div>
            <input
              type="text"
              placeholder="Name"
              className="w-full border p-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
              id="name"
              maxLength="62"
              minLength="10"
              required
              onChange={handleChange}
              value={formData.name}
            />
          </div>
          <div>
            <textarea
              type="text"
              placeholder="Description"
              className="w-full border p-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
              id="description"
              required
              onChange={handleChange}
              value={formData.description}
            />
          </div>
          <div>
            <input
              type="text"
              placeholder="Address"
              className="w-full border p-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
              id="address"
              required
              onChange={handleChange}
              value={formData.address}
            />
          </div>

          <div className="flex flex-wrap gap-6">
            <div className="flex gap-2">
              <input
                type="checkbox"
                className="w-5"
                id="sale"
                onChange={handleChange}
                checked={formData.type === 'sale'}
              />
              <span>Sell</span>
            </div>
            <div className="flex gap-2">
              <input
                type="checkbox"
                className="w-5"
                id="rent"
                onChange={handleChange}
                checked={formData.type === 'rent'}
              />
              <span>Rent</span>
            </div>
            <div className="flex gap-2">
              <input
                type="checkbox"
                className="w-5"
                id="parking"
                onChange={handleChange}
                checked={formData.parking}
              />
              <span>Parking spot</span>
            </div>
            <div className="flex gap-2">
              <input
                type="checkbox"
                className="w-5"
                id="furnished"
                onChange={handleChange}
                checked={formData.furnished}
              />
              <span>Furnished</span>
            </div>
            <div className="flex gap-2">
              <input
                type="checkbox"
                className="w-5"
                id="offer"
                onChange={handleChange}
                checked={formData.offer}
              />
              <span>Offer</span>
            </div>
          </div>

          <div className="flex gap-6">
            <div className="flex flex-col gap-2">
              <input
                type="number"
                id="bedrooms"
                min="1"
                max="10"
                required
                className="p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
                onChange={handleChange}
                value={formData.bedrooms}
              />
              <span>Beds</span>
            </div>
            <div className="flex flex-col gap-2">
              <input
                type="number"
                id="bathrooms"
                min="1"
                max="5"
                required
                className="p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
                onChange={handleChange}
                value={formData.bathrooms}
              />
              <span>Baths</span>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <input
              type="number"
              id="regularPrice"
              min="50"
              max="10000000"
              required
              className="p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
              onChange={handleChange}
              value={formData.regularPrice}
            />
            <span>Regular Price ($ / month)</span>
          </div>
          {formData.offer && (
            <div className="flex flex-col gap-2">
              <input
                type="number"
                id="discountPrice"
                min="0"
                max="1000000"
                required
                className="p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
                onChange={handleChange}
                value={formData.discountPrice}
              />
              <span>Discounted Price ($ / month)</span>
            </div>
          )}
        </div>

        {/* Right Form Section (Image Upload) */}
        
        <div className="flex flex-col gap-6 flex-1">
          <div>
            <p className="font-semibold text-green-700">Images (First one will be the cover)</p>
            <input
              className="p-4 border-gray-300 rounded w-full focus:outline-none focus:ring-2 focus:ring-green-600"
              onChange={(e) => setFiles(e.target.files)}
              type="file"
              id="images"
              accept="image/*"
              multiple
            />
            <button
              type="button"
              disabled={uploading}
              onClick={handleImageSubmit}
              className="p-4 text-green-700 border border-green-700 rounded uppercase hover:shadow-lg disabled:opacity-80"
            >
              {uploading ? 'Uploading...' : 'Upload'}
            </button>
            {imageUploadError && <p className="text-red-700 text-sm">{imageUploadError}</p>}
          </div>

          <div className="flex flex-wrap gap-4">
            {formData.imageUrls.length > 0 &&
              formData.imageUrls.map((url, index) => (
                <div key={url} className="w-32 h-32 bg-gray-100 p-2 rounded-lg relative">
                  <img src={url} alt="listing image" className="w-full h-full object-cover rounded-lg" />
                  <button
                    type="button"
                    onClick={() => handleRemoveImage(index)}
                    className="absolute top-0 right-0 text-red-700 bg-white p-1 rounded-full hover:bg-gray-200"
                  >
                    X
                  </button>
                </div>
              ))}
          </div>

          <button
            disabled={loading || uploading}
            className="p-4 bg-green-700 text-white rounded-lg uppercase hover:opacity-95 disabled:opacity-80"
          >
            {loading ? 'Creating...' : 'Create Listing'}
          </button>
        </div>
      </form>
      {error && <p className="text-red-700 text-sm mt-4">{error}</p>}
    </main>
  );
}

export default CreateListing;

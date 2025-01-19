// import React, { useEffect, useState } from 'react'
// import { Link } from 'react-router-dom'
// import { Swiper, SwiperSlide } from 'swiper/react';
// import 'swiper/css/bundle';
// import {Navigation} from 'swiper/modules';
// import SwiperCore from 'swiper';
// import ListingItem from '../components/ListingItem';
// import Footer from '../components/Footer';

// function Home() {
//   const [offerListings, setOfferListings] = useState([]);
//   const [saleListings, setSaleListings] = useState([]);
//   const [rentListings, setRentListings] = useState([]);
//   SwiperCore.use([Navigation])

//   // console.log(saleListings)
//   console.log(offerListings);

//   useEffect(() => {
//     const fetchOfferListings = async () => {
//       try {
//         const res = await fetch('/api/listing/get?offer=true&limit=4')
//         const data = await res.json(); 
//         setOfferListings(data);
//         fetchRentListings();
//       } catch (error) {
//         console.log(error);
//       }
//     }

//     const fetchRentListings = async() => {
//       try {
//         const res = await fetch('/api/listing/get?type=rent&limit=4')
//         const data = await res.json(); 
//         setRentListings(data);
//         fetchSaleListings();
//       } catch (error) {
//         console.log(error);
//       }
//     }

//     const fetchSaleListings = async() => {
//       try {
//         const res = await fetch('/api/listing/get?type=sale&limit=4')
//         const data = await res.json();
//         setSaleListings(data);
//       } catch (error) {
//         console.log(error);
//       }
//     }
//     fetchOfferListings();
//   }, []);
//   return (
//     <div>
//       {/* top  */}
//         <div className="flex flex-col gap-6 p-28 px-3 max-w-6xl mx-auto">
//           <h1 className='text-slate-700 font-bold text-3xl lg:text-6xl'>
//             Find your next <span className='text-slate-500'>perfect</span> <br /> place with ease
//           </h1>
//           <div className='text-gray-400 textxs sm:text-sm'>
//             Sahand Estate is the best place to find your next perfect place to live.
//             <br />
//             we have a  wide range of properties for you to choose from.
//           </div>
//           <Link to={"/search"} className='text-xs sm:text-sm text-blue-800 font-bold hover:underline'>
//             Let's get Started...
//           </Link>
//         </div>

//       {/* swiper */}
//       <Swiper navigation>
//         {offerListings && offerListings.length > 0 && offerListings.map((listing) => (
//           <SwiperSlide>
//             <div style={{background: `url(${listing.imageUrls[0]}) center no-repeat`, backgroundSize:"cover"}} className="h-[500px]" key={listing._id}></div>
//           </SwiperSlide>
//         ))}
//       </Swiper>
      


//       {/* listing results for offer, sale and rent  */}

//       <div className="max-w-6xl mx-auto p-3 flex flex-col gap-8 my-10">
//         {
//           offerListings && offerListings.length > 0 && (
//             <div className="">
//               <div className="my-3">
//                 <h2 className='text-2xl font-semibold text-slate-600'>Recent offers</h2>
//                 <Link className='text-sm text-blue-800 hover:underline' to={'/search?offer=true'}>
//                   Show more offers
//                 </Link>
//               </div>
//               <div className="flex flex-wrap gap-4">
//                 {
//                   offerListings.map((listing) => (
//                     <ListingItem listing={listing} key={listing._id}/>
//                   ))
//                 }
//               </div>
//             </div>
//           )
//         }
//         {
//           rentListings && rentListings.length > 0 && (
//             <div className="">
//               <div className="my-3">
//                 <h2 className='text-2xl font-semibold text-slate-600'>Recent Places for rent</h2>
//                 <Link className='text-sm text-blue-800 hover:underline' to={'/search?type=rent'}>
//                   Show more places for rent
//                 </Link>
//               </div>
//               <div className="flex flex-wrap gap-4">
//                 {
//                   rentListings.map((listing) => (
//                     <ListingItem listing={listing} key={listing._id}/>
//                   ))
//                 }
//               </div>
//             </div>
//           )
//         }
//         {
//           saleListings && saleListings.length > 0 && (
//             <div className="">
//               <div className="my-3">
//                 <h2 className='text-2xl font-semibold text-slate-600'>Recent Places for Sale</h2>
//                 <Link className='text-sm text-blue-800 hover:underline' to={'/search?type=sale'}>
//                   Show more places for sale
//                 </Link>
//               </div>
//               <div className="flex flex-wrap gap-4">
//                 {
//                   saleListings.map((listing) => (
//                     <ListingItem listing={listing} key={listing._id}/>
//                   ))
//                 }
//               </div>
//             </div>
//           )
//         }
//       </div>
//       <Footer />
//     </div>
//   )  
// }

// export default Home

import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css/bundle';
import {Navigation} from 'swiper/modules';
import SwiperCore from 'swiper';
import ListingItem from '../components/ListingItem';
import videoFile from '../assets/4770380-hd_1920_1080_30fps.mp4';
import Footer  from '../components/Footer'

function Home() {
  const [offerListings, setOfferListings] = useState([]);
  const [saleListings, setSaleListings] = useState([]);
  const [rentListings, setRentListings] = useState([]);
  const [expandedSections, setExpandedSections] = useState([]);
  SwiperCore.use([Navigation])

  // console.log(saleListings)
  console.log(offerListings);

  useEffect(() => {
    const fetchOfferListings = async () => {
      try {
        const res = await fetch('/api/listing/get?offer=true&limit=4')
        const data = await res.json(); 
        setOfferListings(data);
        fetchRentListings();
      } catch (error) {
        console.log(error);
      }
    }

    const fetchRentListings = async() => {
      try {
        const res = await fetch('/api/listing/get?type=rent&limit=4')
        const data = await res.json(); 
        setRentListings(data);
        fetchSaleListings();
      } catch (error) {
        console.log(error);
      }
    }

    const fetchSaleListings = async() => {
      try {
        const res = await fetch('/api/listing/get?type=sale&limit=4')
        const data = await res.json();
        setSaleListings(data);
      } catch (error) {
        console.log(error);
      }
    }
    fetchOfferListings();
  }, []);

  const toggleSection = (sectionIndex) => {
    setExpandedSections((prevState) => {
      if (prevState.includes(sectionIndex)) {
        return prevState.filter((idx) => idx !== sectionIndex);
      } else {
        return [...prevState, sectionIndex];
      }
    });
  };
  const sections = [
  ];
  return (
    <div>
      {/* top  */}
      <div className="relative">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full max-h-[800px] object-cover"
        >
          <source src={videoFile} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div className="absolute inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="text-center text-white">
            <h2 className="text-5xl font-bold mb-4">Explore Our Properties</h2>
            <p className="text-xl mb-8">
              Discover the perfect place to call home with our extensive collection of properties.
            </p>
            <Link
              to="/search"
              className="bg-white text-black px-6 py-3 rounded-md hover:bg-gray-200 transition-colors duration-300"
            >
              Start Exploring
            </Link>
          </div>
        </div>
      </div>

      {/* swiper */}
      {/* <Swiper navigation>
        {offerListings && offerListings.length > 0 && offerListings.map((listing) => (
          <SwiperSlide>
            <div style={{background: url(${listing.imageUrls[0]}) center no-repeat, backgroundSize:"cover"}} className="h-[500px]" key={listing._id}></div>
          </SwiperSlide>
        ))}
      </Swiper> */}
      


      {/* listing results for offer, sale and rent  */}

      <div className="max-w-6xl mx-auto p-3 flex flex-col gap-8 my-10">
        {
          offerListings && offerListings.length > 0 && (
            <div className="">
              <div className="my-3">
                <h2 className='text-2xl font-semibold text-slate-600'>Recent offers</h2>
                <Link className='text-sm text-blue-800 hover:underline' to={'/search?offer=true'}>
                  Show more offers
                </Link>
              </div>
              <div className="flex flex-wrap gap-4">
                {
                  offerListings.map((listing) => (
                    <ListingItem listing={listing} key={listing._id}/>
                  ))
                }
              </div>
            </div>
          )
        }
        {
          rentListings && rentListings.length > 0 && (
            <div className="">
              <div className="my-3">
                <h2 className='text-2xl font-semibold text-slate-600'>Recent Places for rent</h2>
                <Link className='text-sm text-blue-800 hover:underline' to={'/search?type=rent'}>
                  Show more places for rent
                </Link>
              </div>
              <div className="flex flex-wrap gap-4">
                {
                  rentListings.map((listing) => (
                    <ListingItem listing={listing} key={listing._id}/>
                  ))
                }
              </div>
            </div>
          )
        }
        {
          saleListings && saleListings.length > 0 && (
            <div className="">
              <div className="my-3">
                <h2 className='text-2xl font-semibold text-slate-600'>Recent Places for Sale</h2>
                <Link className='text-sm text-blue-800 hover:underline' to={'/search?type=sale'}>
                  Show more places for sale
                </Link>
              </div>
              <div className="flex flex-wrap gap-4">
                {
                  saleListings.map((listing) => (
                    <ListingItem listing={listing} key={listing._id}/>
                  ))
                }
              </div>
            </div>
          )
        }
            
        {/* <div className="container mx-auto">
          <div className="flex flex-col space-y-4">
            {sections.map((section, index) => (
              <div key={index} className="border-b border-gray-300 pb-4">
                <button
                  className="flex justify-between items-center w-full text-left"
                  onClick={() => toggleSection(index)}
                >
                  <h3 className="text-lg font-semibold text-gray-800">{section.title}</h3>
                  <span className={transform transition-transform ${expandedSections.includes(index) ? 'rotate-180' : ''}}>
                    <svg className="w-5 h-5 text-gray-600" viewBox="0 0 20 20" fill="currentColor">
                      <path
                        fillRule="evenodd"
                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </span>
                </button>
                {expandedSections.includes(index) && (
                  <div className="mt-4 text-gray-600">{sections.content}</div>
                )}
              </div>
            ))}
                    </div> */}    
          <div className="container mx-auto">
            <div className="flex flex-col space-y-4">
              {sections.map((section, index) => (
                <div key={index} className="border-b border-gray-300 pb-4">
                  <button
                    className="flex justify-between items-center w-full text-left"
                    onClick={() => toggleSection(index)}
                  >
                    <h3 className="text-lg font-semibold text-gray-800">{section.title}</h3>
                    <span className={`transform transition-transform ${expandedSections.includes(index) ? 'rotate-180' : ''}`}>
                      <svg className="w-5 h-5 text-gray-600" viewBox="0 0 20 20" fill="currentColor">
                        <path
                          fillRule="evenodd"
                          d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </span>
                  </button>
                  {expandedSections.includes(index) && (
                    <div className="mt-4 text-gray-600">{section.content}</div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>


        <Footer />
      </div>
      
    // </div>
  )
}

export default Home
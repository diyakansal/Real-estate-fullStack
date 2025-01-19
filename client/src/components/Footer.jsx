// import React from 'react';
// import { FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa';

// const Footer = () => {
//   return (
//     <footer className="bg-gray-800 py-8">
//       <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
//         <div className="text-white mb-4 md:mb-0">
//           © 2024 WoodlandEscape, Inc.
//         </div>
//         <div className="flex space-x-4">
//           <a
//             href="https://www.facebook.com"
//             target="_blank"
//             rel="noopener noreferrer"
//             className="text-white hover:text-gray-300"
//           >
//             <FaFacebook className="w-6 h-6" />
//           </a>
//           <a
//             href="https://twitter.com"
//             target="_blank"
//             rel="noopener noreferrer"
//             className="text-white hover:text-gray-300"
//           >
//             <FaTwitter className="w-6 h-6" />
//           </a>
//           <a
//             href="https://www.instagram.com/garvit_.pruthi/"
//             target="_blank"
//             rel="noopener noreferrer"
//             className="text-white hover:text-gray-300"
//           >
//             <FaInstagram className="w-6 h-6" />
//           </a>
//         </div>
//         <div className="flex space-x-4 mt-4 md:mt-0">
//           <a
//             href="#"
//             className="text-gray-400 hover:text-white"
//           >
//             Privacy
//           </a>
//           <a
//             href="#"
//             className="text-gray-400 hover:text-white"
//           >
//             Terms
//           </a>
//           <a
//             href="#"
//             className="text-gray-400 hover:text-white"
//           >
//             Sitemap
//           </a>
//           <a
//             href="#"
//             className="text-gray-400 hover:text-white"
//           >
//             Company details
//           </a>
//         </div>
//       </div>
//     </footer>
//   );
// };

// export default Footer;

import React from 'react';
import { FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-[#0a3d2e] py-8"> 
      <div className="container mx-a.uto px-4 flex flex-col md:flex-row justify-between items-center">
        <div className="text-white mb-4 md:mb-0">
          © 2024 EstateSphere, Inc.
        </div>
        <div className="flex space-x-4">
          <a
            href="https://www.facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white hover:text-gray-300"
          >
            <FaFacebook className="w-6 h-6" />
          </a>
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white hover:text-gray-300"
          >
            <FaTwitter className="w-6 h-6" />
          </a>
          <a
            href="https://www.instagram.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white hover:text-gray-300"
          >
            <FaInstagram className="w-6 h-6" />
          </a>
        </div>
        <div className="flex space-x-4 mt-4 md:mt-0">
          <a
            href="#"
            className="text-gray-400 hover:text-white"
          >
            Privacy
          </a>
          <a
            href="#"
            className="text-gray-400 hover:text-white"
          >
            Terms
          </a>
          <a
            href="#"
            className="text-gray-400 hover:text-white"
          >
            Sitemap
          </a>
          <a
            href="#"
            className="text-gray-400 hover:text-white"
          >
            Company details
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;


// import { Button } from '@/components/ui/button';
// import React from 'react'
// import { FaMapLocationDot } from "react-icons/fa6";
// import { Link } from 'react-router-dom';

// function PlaceCardItem({place}) {
//   return (
//   <Link to={`https://www.google.com/maps/search/?api=1&query=`+place.placeName} 
//   target='_blank' className='text-inherit'>
//     <div className='border rounded-xl p-3 mt-2 flex gap-5 hover:scale-105 transition-all hover:shadow-md cursor-pointer'>
//         <img src="/placeholder.png" className='w-[130px] h-[130px] rounded-xl' />
//         <div>
//           <h2 className='font-bold text-lg'>{place.placeName}</h2>
//           <p className='text-sm text-gray-500'>{place.placeDetails}</p>
//           <h2 className='mt-2'>🎟️{place.ticketPricing}</h2>
//         </div>
//     </div>
//   </Link>
//   )
// }

// export default PlaceCardItem




import { Button } from '@/components/ui/button';
import React, { useState, useEffect } from 'react';
import { FaMapLocationDot } from "react-icons/fa6";
import { Link } from 'react-router-dom';
import axios from 'axios';

function PlaceCardItem({place}) {
  const [imageUrl, setImageUrl] = useState("/placeholder.png");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Fetch image from Unsplash API
    const fetchImage = async () => {
      try {
        const response = await axios.get(
          `https://api.unsplash.com/search/photos`, 
          {
            params: {
              query: place.placeName,
              per_page: 1
            },
            headers: {
              Authorization: `Client-ID ${import.meta.env.VITE_UNSPLASH_ACCESS_KEY}`
            }
          }
        );

        if (response.data.results && response.data.results.length > 0) {
          setImageUrl(response.data.results[0].urls.regular);
        }
      } catch (error) {
        console.error("Error fetching image from Unsplash:", error);
      } finally {
        setIsLoading(false);
      }
    };

    if (place && place.placeName) {
      fetchImage();
    }
  }, [place]);

  return (
    <Link 
      to={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(place.placeName)}`} 
      target='_blank' 
      className='text-inherit'
    >
      <div className='border rounded-xl p-3 mt-2 flex gap-5 hover:scale-105 transition-all hover:shadow-md cursor-pointer'>
        <div className="relative w-[130px] h-[130px]">
          {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-gray-900"></div>
            </div>
          )}
          <img 
            src={imageUrl} 
            alt={place.placeName}
            className='w-[130px] h-[130px] rounded-xl object-cover'
            onError={() => setImageUrl("/placeholder.png")}
          />
        </div>
        <div>
          <h2 className='font-bold text-lg'>{place.placeName}</h2>
          <p className='text-sm text-gray-500'>{place.placeDetails}</p>
          <h2 className='mt-2'>🎟️{place.ticketPricing}</h2>
        </div>
      </div>
    </Link>
  );
}

export default PlaceCardItem;
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

function UserTripCardItem({trip}) {
    const [image, setImage] = useState('/placeholder.png');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchTravelImage = async () => {
            try {
                setLoading(true);
                // Use trip?.userSelection?.location safely
                const location = trip?.userSelection?.location || 'travel landscape';
                
                const response = await axios.get('https://api.unsplash.com/photos/random', {
                    params: {
                        query: location,
                        orientation: 'landscape',
                        count: 1
                    },
                    headers: {
                        Authorization: `Client-ID ${import.meta.env.VITE_UNSPLASH_ACCESS_KEY}`
                    }
                });
                
                // Ensure image URL is valid before setting
                if (response.data && response.data[0] && response.data[0].urls && response.data[0].urls.regular) {
                    setImage(response.data[0].urls.regular);
                }
            } catch (error) {
                console.error('Error fetching image:', error);
                // Fallback to placeholder if API call fails
                setImage('/placeholder.png');
            } finally {
                setLoading(false);
            }
        };

        if (trip?.userSelection?.location) {
            fetchTravelImage();
        }
    }, [trip]);


  return (
    <Link to={'/view-trip/'+trip?.id}>
    <div className='hover:scale-105 transition-all'>
      <img src={image} alt="" className='object-cover rounded-xl h-[250px]'/>
      <div>
        <h2 className='font-bold text-lg text-black'>{trip?.userSelection?.location}</h2>
        <h2 className='text-sm text-gray-500'>{trip?.userSelection?.noOfDays} Days trip with {trip?.userSelection?.budget} Budget</h2>
      </div>
    </div>
    </Link>
  )
}

export default UserTripCardItem

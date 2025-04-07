import { Button } from '@/components/ui/button'
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { IoIosSend } from "react-icons/io";

function InfoSection({ trip }) {
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
        <div>
            {loading ? (
                <div className='h-[340px] w-full bg-gray-200 animate-pulse rounded-md flex items-center justify-center'>
                    Loading image...
                </div>
            ) : (
                <img 
                    src={image}  
                    alt={trip?.userSelection?.location || 'Travel destination'} 
                    className='h-[340px] w-full object-cover rounded-md' 
                />
            )}

            <div className='flex justify-between items-center'>
                <div className='my-5 flex flex-col gap-2'>
                    <h2 className='font-bold text-2xl'>{trip?.userSelection?.location}</h2>
                    <div className='flex gap-5'>
                        <h2 className='p-1 px-3 bg-gray-200 rounded-full text-gray-500 text-xs md:text-md'>📆{trip?.userSelection?.noOfDays} Day</h2>
                        <h2 className='p-1 px-3 bg-gray-200 rounded-full text-gray-500 text-xs md:text-md'>💰{trip?.userSelection?.budget} Budget</h2>
                        <h2 className='p-1 px-3 bg-gray-200 rounded-full text-gray-500 text-xs md:text-md'>🥂No. of traveler: {trip?.userSelection?.traveler}</h2>
                    </div>
                </div>
                <Button><IoIosSend /></Button>
            </div>
        </div>
    )
}

export default InfoSection

import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios';

function Hotels({ trip }) {
    const [hotelImages, setHotelImages] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchTravelImages = async () => {
            try {
                // Check if hotels exist before processing
                if (!trip?.tripData?.hotels?.length) {
                    setLoading(false);
                    return;
                }

                // Fetch images for each hotel
                const imagePromises = trip.tripData.hotels.map(async (hotel) => {
                    try {
                        // More specific query to get hotel-specific images
                        const query = `${hotel.hotelName} Hotel`;
                        
                        const response = await axios.get('https://api.unsplash.com/photos/random', {
                            params: {
                                query: query,
                                orientation: 'squarish',
                                count: 1
                            },
                            headers: {
                                Authorization: `Client-ID ${import.meta.env.VITE_UNSPLASH_ACCESS_KEY}`
                            }
                        });
                        
                        // Return hotel name and image URL
                        return {
                            [hotel.hotelName]: response.data && response.data[0]?.urls?.regular 
                                ? response.data[0].urls.regular 
                                : `/placeholders/hotel-${(hotel.hotelName || '').toLowerCase().replace(/\s+/g, '-')}.png`
                        };
                    } catch (error) {
                        console.error(`Error fetching image for ${hotel.hotelName}:`, error);
                        return {
                            [hotel.hotelName]: `/placeholders/hotel-${(hotel.hotelName || '').toLowerCase().replace(/\s+/g, '-')}.png`
                        };
                    }
                });

                // Resolve all image promises
                const images = await Promise.all(imagePromises);
                
                // Convert array of objects to a single object
                const imagesMap = images.reduce((acc, curr) => ({ ...acc, ...curr }), {});
                
                setHotelImages(imagesMap);
            } catch (error) {
                console.error('Error in image fetching process:', error);
            } finally {
                setLoading(false);
            }
        };
    
        // Call the image fetching function
        if (trip?.tripData?.hotels?.length) {
            fetchTravelImages();
        }
    }, [trip]);

    // If no hotels, return null or a message
    if (!trip?.tripData?.hotels?.length) {
        return <div>No hotels found</div>;
    }

    return (
        <div>
            <h2 className='font-bold text-xl mt-5'>Hotel Recommendation</h2>

            <div className='grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-5'>
                {trip?.tripData?.hotels?.map((hotel, index) => (
                    <Link
                        key={`hotel-${hotel?.hotelName}-${index}`}
                        to={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${hotel?.hotelName},${hotel?.hotelAddress}`)}`}
                        target='_blank'
                        className='hover:scale-105 transition-all cursor-pointer text-inherit'
                    >
                        <div>
                            <img
                                src={hotelImages[hotel.hotelName] || '/placeholder.png'}
                                alt={hotel.hotelName || 'Travel destination'}
                                className='rounded-xl h-[250px] w-full object-cover'
                            />
                            <div className='my-2 flex flex-col gap-2'>
                                <h2 className='font-medium'>{hotel.hotelName}</h2>
                                <h2 className='text-xs text-gray-500'>📍{hotel?.hotelAddress}</h2>
                                <h2 className='text-sm'>💰{hotel?.priceRange}</h2>
                                <h2 className='text-sm'>⭐{hotel?.rating}</h2>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    )
}

export default Hotels
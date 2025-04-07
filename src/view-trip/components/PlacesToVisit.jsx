import React from 'react'
import PlaceCardItem from './PlaceCardItem';

function PlacesToVisit({ trip }) {
  const dayKeys = trip?.tripData?.itinerary
    ? Object.keys(trip.tripData.itinerary)
      .filter(key => key.startsWith('day'))
      .sort((a, b) => {
        // Extract numeric part and convert to number
        const numA = parseInt(a.replace('day', ''));
        const numB = parseInt(b.replace('day', ''));
        return numA - numB;
      })
    : [];

  return (
    // <div>
    //   <h2 className='font-bold text-lg'>Places to visit</h2>
    //   <div>
    //     {trip.tripData?.itinerary.map((item, index)=>(
    //         <div>
    //             <h2>{item.day1}</h2>
    //         </div>
    //     ))}
    //   </div>
    // </div>
    <div>
      <h2 className='font-bold text-lg'>Places to visit</h2>
      <div className='mt-5'>
      {dayKeys.map((dayKey) => (
        <div key={dayKey}>
          <h3 className='font-semibold text-md'>{dayKey.toUpperCase()}</h3>
          <div className='grid md:grid-cols-2 gap-5'>
          {trip.tripData.itinerary[dayKey].map((place, index) => (
            <div key={`${dayKey}-place-${index}`} className=''>
              <h2 className='font-medium text-sm text-orange-600'>{place.timeToVisit}</h2>
              {/* <h2 className='font-semibold text-gray-800 '>{place.placeName}</h2> */}
                <PlaceCardItem place={place}/>
            </div>
          ))}
          </div>
        </div>
      ))}
      </div>
    </div>
  )
}

export default PlacesToVisit

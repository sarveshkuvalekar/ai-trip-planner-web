import { useUser } from '@clerk/clerk-react';
import { collection, getDocs, query, where } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { db } from '@/service/firebaseConfig';
import UserTripCardItem from './components/UserTripCardItem';

function MyTrips() {
  const { user, isLoaded } = useUser();
  const navigate = useNavigate();
  const [trips, setTrips] = useState([]);
  const [userTrips, setUserTrips] = useState([]);

  useEffect(() => {
    if (isLoaded) {
      GetUserTrips();
    }
  }, [isLoaded]);

  const GetUserTrips = async() => {
    try {
      // Check if user is authenticated with Clerk
      if (!user) {
        console.log("No Clerk user, redirecting to home");
        navigate('/');
        return;
      }
      
      // Get email from Clerk's useUser hook
      const userEmail = user.primaryEmailAddress?.emailAddress;
      
      console.log("Using email from Clerk:", userEmail);
      
      // Query Firestore with the email from Clerk
      const q = query(collection(db, 'AITrips'), where('userEmail', '==', userEmail));
      const querySnapshot = await getDocs(q);
      
      const userTrips = [];
      setUserTrips([]);
      querySnapshot.forEach((doc) => {
        userTrips.push({ id: doc.id, ...doc.data() });
        console.log(doc.id, " => ", doc.data());
        setUserTrips(prevVal=>[...prevVal, doc.data()])
      });
      
      setTrips(userTrips);
    } catch (error) {
      console.error("Error fetching trips:", error);
    }
  }

  return (
    <div className='sm:px-10 md:px-32 lg:px-56 xl:px-72 px-5 mt-10 pb-20'>
      <h2 className='font-bold text-3xl'>My Trips</h2>

      <div className='grid grid-cols-2 mt-10 md:grid-cols-3 gap-5'>
        {userTrips?.length>0?userTrips.map((trip, index)=>(
           <UserTripCardItem trip={trip} key={index}/>
        ))
        :[1,2,3,4,5,6].map((item,index)=>(
          <div key={index} className='h-[250px] w-full bg-slate-200 animate-pulse rounded-xl'>

          </div>
        ))
        }
      </div>
    </div>
  );
}

export default MyTrips;
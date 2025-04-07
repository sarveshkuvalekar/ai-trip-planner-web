import React from 'react'
import { Button } from '../ui/button'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth, useClerk, useSignIn, useUser } from "@clerk/clerk-react";

function Hero() {
  const { isSignedIn } = useAuth();
  const { openSignIn } = useClerk();
  const { user } = useUser();
  const navigate = useNavigate();

  const handleGetStarted = () => {
    if (user) {
      // User is signed in, navigate to create-trip
      navigate('/create-trip');
    } else {
      // User is not signed in, open the sign-in modal
      openSignIn({ redirectUrl: '/create-trip' });
    }
  };

  return (
    <div className='flex flex-col items-center mx-56 gap-9'>
      <h1 className=' font-extrabold text-[60px] text-center px-28 mt-16'>
        <span className='text-[#08c054] '>AI Meets Travel</span><br /><span className='text-[40px]'>Plan Your Perfect Getaway in Seconds</span></h1>
      <p className='text-xl text-gray-500 text-center'>Say Goodbye to Planning Hassles – DestinAI Handles It All.</p>
      {/* <Link to={'/create-trip'}>
     <Button>Get started, It's free</Button>
    </Link> */}
    <Button onClick={handleGetStarted}>Get started, It's free</Button>

      <img src="/landingg.png" alt="" />
    </div>
  )
}

export default Hero

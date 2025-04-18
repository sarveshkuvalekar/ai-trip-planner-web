import React from 'react'
import { Button } from '../ui/button'
import { useClerk, UserButton, useUser } from '@clerk/clerk-react'

function Header() {
  const { openSignIn } = useClerk()
  const { user } = useUser()

  return (
    <div className='p-2 shadow-sm flex justify-between items-center px-5'>
      <img src="/logo.svg" alt="" />
      {
        user
          ? <div className='flex items-center gap-3'>
            <a href='/create-trip' className='text-inherit'>
              <Button variant="outline" className="rounded-full">+ Create Trip</Button>
            </a>
            <a href='/my-trips' className='text-inherit'>
              <Button variant="outline" className="rounded-full">My Trips</Button>
            </a>
            <p>Hi, {user.firstName}</p>
            <UserButton />
          </div>
          : <div>
            <Button onClick={e => openSignIn()}>Sign In</Button>
          </div>
      }
    </div>
  )
}

export default Header

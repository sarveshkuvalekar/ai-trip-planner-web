import React, { useEffect, useState } from 'react'
import { Input } from "@/components/ui/input"
import { AI_PROMPT, SelectBudgetOptions, SelectTravelsList } from '@/constants/options'
import { Button } from '@/components/ui/button'
import { toast } from 'sonner';
import { chatSession } from '@/service/AImodel';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '@/service/firebaseConfig';
import { useUser } from '@clerk/clerk-react'; // Import the Clerk useUser hook
import { useNavigate } from 'react-router-dom';

function CreateTrip() {
  const [formData, setFormData] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const { user, isSignedIn, isLoaded } = useUser(); // Use Clerk's useUser hook

  const navigate = useNavigate();

  const handleInputChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: value
    });
  }

  useEffect(() => {
    console.log(formData);
  }, [formData]);

  const SaveAiTrip = async (tripData) => {
    try {
      // Check if user is authenticated with Clerk
      if (!isSignedIn || !user) {
        toast.error("Please sign in to save your trip");
        return null;
      }

      const docId = Date.now().toString();
      await setDoc(doc(db, "AITrips", docId), {
        userSelection: formData,
        tripData: JSON.parse(tripData),
        userId: user.id,
        userEmail: user.primaryEmailAddress?.emailAddress,
        userName: `${user.firstName} ${user.lastName}`,
        userImageUrl: user.imageUrl,
        id:docId
      });
      
      toast.success("Trip saved successfully!");
      navigate('/view-trip/'+docId);
      return docId;
      
    } catch (error) {
      console.error("Error saving trip:", error);
      toast.error("Failed to save trip");
      return null;
    }
  }

  const OnGenerateTrip = async () => {
    if (!formData?.location || !formData?.noOfDays || !formData?.budget || !formData?.traveler) {
      toast.error("Please fill all details");
      return;
    }

    try {
      setIsLoading(true);
      
      const FINAL_PROMPT = AI_PROMPT
        .replace('{location}', formData?.location)
        .replace('{totalDays}', formData?.noOfDays)
        .replace('{traveler}', formData?.traveler)
        .replace('{budget}', formData?.budget)
        .replace('{totalDays}', formData?.noOfDays);

      console.log(FINAL_PROMPT);

      const result = await chatSession.sendMessage(FINAL_PROMPT);
      const tripData = await result?.response?.text();
      
      console.log(tripData);
      
      // Save the trip data
      if (tripData) {
        const tripId = await SaveAiTrip(tripData);
        if (tripId) {
          toast.success("Your trip has been generated and saved!");
          // You could navigate to a trip details page here
          // navigate(`/trips/${tripId}`);
        }
      }
    } catch (error) {
      console.error("Error generating trip:", error);
      toast.error("Failed to generate trip");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className='sm:px-10 md:px-32 lg:px-32 xl:px-10 px-5 mt-10 '>
      <h2 className='font-bold text-3xl'>Tell us your travel preferences 🏕️🌴</h2>
      <p className='mt-3 text-gray-500 text-xl'>Just provide some basic information, and our trip planner will generate
        a customized itinerary based on your preferences.</p>

      {isLoaded && isSignedIn && user && (
        <div className="mt-5 p-3 bg-blue-50 rounded-lg">
          <p className="text-blue-700">Planning a trip as {user.firstName} {user.lastName} ({user.primaryEmailAddress?.emailAddress})</p>
        </div>
      )}

      <div className='mt-20 flex flex-col gap-9'>
        <div>
          <h2 className='text-xl my-3 font-medium'>What is destination of choice?</h2>
          <Input type="text" name="destination" placeholder="Enter your desired destination.."
            onChange={(e) => handleInputChange('location', e.target.value)} />
        </div>

        <div>
          <h2 className='text-xl my-3 font-medium'>How many days are you planning your trip</h2>
          <Input type="number" name="days" placeholder="Ex.3" min="1"
            onChange={(e) => handleInputChange('noOfDays', e.target.value)}
          />
        </div>

        <div>
          <h2 className='text-xl my-3 font-medium'>What is Your Budget?</h2>
          <div className='grid grid-cols-3 gap-5 mt-5'>
            {SelectBudgetOptions.map((item, index) => (
              <div key={index}
                onClick={() => handleInputChange('budget', item.title)}
                className={`p-4 border rounded-lg hover:shadow-lg justify-items-center cursor-pointer ${formData?.budget == item.title && 'shadow-lg border-black'}`}>
                <h2 className='text-4xl'>{item.icon}</h2>
                <h2 className='font-bold text-lg'>{item.title}</h2>
                <h2 className='text-sm text-gray-500'>{item.desc}</h2>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h2 className='text-xl my-3 font-medium'>Who do you plan on travelling with on your next adventure?</h2>
          <div className='grid grid-cols-3 gap-5 mt-5'>
            {SelectTravelsList.map((item, index) => (
              <div key={index}
                onClick={() => handleInputChange('traveler', item.people)}
                className={`p-4 border rounded-lg hover:shadow-lg justify-items-center cursor-pointer ${formData?.traveler == item.people && 'shadow-lg border-black'}`}>
                <h2 className='text-4xl'>{item.icon}</h2>
                <h2 className='font-bold text-lg'>{item.title}</h2>
                <h2 className='text-sm text-gray-500'>{item.desc}</h2>
              </div>
            ))}
          </div>
        </div>

      </div>

      <div className='p-20 justify-end flex'>
        {isLoaded && !isSignedIn ? (
          <Button variant="outline" onClick={() => window.location.href = "/sign-in"}>
            Sign in to Create Trips
          </Button>
        ) : (
          <Button onClick={OnGenerateTrip} disabled={isLoading || !isSignedIn}>
            {isLoading ? 'Generating...' : 'Generate Trip'}
          </Button>
        )}
      </div>
    </div>
  )
}

export default CreateTrip
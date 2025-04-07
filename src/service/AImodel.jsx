import { GoogleGenerativeAI } from "@google/generative-ai";

  const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
  const genAI = new GoogleGenerativeAI(apiKey); 
  
  const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash", 
  });
  
  const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 40,
    maxOutputTokens: 8192,
    responseMimeType: "application/json",
  };
  
  
    export const chatSession = model.startChat({
      generationConfig,
      history: [
        {
          role: "user",
          parts: [
            {text: "Generate Travel Plan for Location : Las Vegas, for 3 Days for Couple with a Cheap budget, Give me a Hotels options list with HotelName, Hotel address, Price, hotel image url, geo coordinates, rating, descriptions and suggest itinerary with placeName, Place Details, Place Image Url, Geo Coordinates, ticket Pricing, Time travel each of the location for 3 days with each day plan with best time to visit in only JSON format."},
          ],
        },
        {
          role: "model",
          parts: [
            {text: "```json\n{\n  \"tripName\": \"Las Vegas Budget Trip for Couples (3 Days)\",\n  \"budget\": \"Cheap\",\n  \"travelers\": \"Couple\",\n  \"duration\": \"3 Days\",\n  \"hotels\": [\n    {\n      \"hotelName\": \"Circus Circus Hotel & Casino\",\n      \"hotelAddress\": \"2880 S Las Vegas Blvd, Las Vegas, NV 89109\",\n      \"priceRange\": \"$50-$100 per night (approx.)\",\n      \"hotelImageUrl\": \"https://example.com/circuscircus.jpg\",  \n      \"geoCoordinates\": {\n        \"latitude\": 36.1226,\n        \"longitude\": -115.1722\n      },\n      \"rating\": 3.5,\n      \"description\": \"A classic Vegas hotel with a circus theme, affordable rooms, and some on-site entertainment. Expect a lively atmosphere.\"\n    },\n    {\n      \"hotelName\": \"Excalibur Hotel & Casino\",\n      \"hotelAddress\": \"3850 S Las Vegas Blvd, Las Vegas, NV 89109\",\n      \"priceRange\": \"$60-$120 per night (approx.)\",\n      \"hotelImageUrl\": \"https://example.com/excalibur.jpg\",\n      \"geoCoordinates\": {\n        \"latitude\": 36.0912,\n        \"longitude\": -115.1749\n      },\n      \"rating\": 3.0,\n      \"description\": \"Medieval-themed hotel with affordable rooms, located on the south strip. Offers various entertainment options.\"\n    },\n    {\n      \"hotelName\": \"The LINQ Hotel + Experience\",\n      \"hotelAddress\": \"3545 Las Vegas Blvd S, Las Vegas, NV 89109\",\n      \"priceRange\": \"$80-$150 per night (approx.)\",\n      \"hotelImageUrl\": \"https://example.com/linq.jpg\",\n      \"geoCoordinates\": {\n        \"latitude\": 36.1001,\n        \"longitude\": -115.1731\n      },\n      \"rating\": 4.0,\n      \"description\": \"Modern hotel with a central location on the Strip, offering a mix of affordable and upscale rooms.  Features the LINQ Promenade.\"\n    }\n\n  ],\n  \"itinerary\": {\n    \"day1\": [\n      {\n        \"placeName\": \"Fremont Street Experience\",\n        \"placeDetails\": \"Free walking area with light shows and street performers. Vibrant atmosphere.\",\n        \"placeImageUrl\": \"https://example.com/fremontstreet.jpg\",\n        \"geoCoordinates\": {\n          \"latitude\": 36.1699,\n          \"longitude\": -115.1401\n        },\n        \"ticketPricing\": \"Free\",\n        \"timeToVisit\": \"Evening (for the light shows)\"\n      },\n      {\n        \"placeName\": \"Old Las Vegas Mormon Fort\",\n        \"placeDetails\": \"Historic site, provides a glimpse into Las Vegas' early history.\",\n        \"placeImageUrl\": \"https://example.com/mormonfort.jpg\",\n        \"geoCoordinates\": {\n          \"latitude\": 36.1727,\n          \"longitude\": -115.1365\n        },\n        \"ticketPricing\": \"Nominal entry fee\",\n        \"timeToVisit\": \"Afternoon\"\n      }\n    ],\n    \"day2\": [\n      {\n        \"placeName\": \"The Strip (walking tour)\",\n        \"placeDetails\": \"Explore the iconic Las Vegas Strip, admiring the hotels and atmosphere. Focus on free activities.\",\n        \"placeImageUrl\": \"https://example.com/thestrip.jpg\",\n        \"geoCoordinates\": {\n          \"latitude\": 36.1146,\n          \"longitude\": -115.1729\n        },\n        \"ticketPricing\": \"Free (unless you enter casinos or attractions)\",\n        \"timeToVisit\": \"Daytime\"\n      },\n      {\n        \"placeName\": \"Bellagio Fountains\",\n        \"placeDetails\": \"Free water show with music and lights.\",\n        \"placeImageUrl\": \"https://example.com/bellagiofountains.jpg\",\n        \"geoCoordinates\": {\n          \"latitude\": 36.1117,\n          \"longitude\": -115.1731\n        },\n        \"ticketPricing\": \"Free\",\n        \"timeToVisit\": \"Evening\"\n      }\n    ],\n    \"day3\": [\n      {\n        \"placeName\": \"Seven Magic Mountains\",\n        \"placeDetails\": \"Colorful art installation outside the city (requires transportation)\",\n        \"placeImageUrl\": \"https://example.com/sevenmagicmountains.jpg\",\n        \"geoCoordinates\": {\n          \"latitude\": 35.9878,\n          \"longitude\": -114.9367\n        },\n        \"ticketPricing\": \"Free\",\n        \"timeToVisit\": \"Afternoon\"\n      },\n       {\n        \"placeName\": \"Downtown Container Park\",\n        \"placeDetails\": \"Unique shopping and dining area made from shipping containers.\",\n        \"placeImageUrl\": \"https://example.com/containerpark.jpg\",\n        \"geoCoordinates\": {\n          \"latitude\": 36.1644,\n          \"longitude\": -115.1367\n        },\n        \"ticketPricing\": \"Free entry (prices vary for shopping and dining)\",\n        \"timeToVisit\": \"Late Afternoon\"\n      }\n    ]\n  }\n}\n```\n\n**Note:**  The image URLs are placeholders.  You'll need to replace them with actual image URLs from a reliable source.  Also, hotel and attraction prices are approximate and can vary significantly depending on the season and availability.  Consider using a price comparison website for the most up-to-date pricing.  Finally, factor in transportation costs (taxis, rideshares, or the monorail) when budgeting your trip.  Using public transport or walking where possible will help keep your costs down.\n"},
          ],
        },
      ],
    });
  
    
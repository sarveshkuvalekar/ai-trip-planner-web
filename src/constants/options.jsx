export const SelectTravelsList=[
    {
        id:1,
        title:'Just Me',
        desc:'A sole travels in exploration',
        icon:'🚶‍♂️',
        people:'1 People'
    },
    {
        id:2,
        title:'A Couple',
        desc:'Two travels in tendem',
        icon:'🥂',
        people:'2 People'
    },
    {
        id:3,
        title:'Family',
        desc:'A group of fun loving adv',
        icon:'🏠',
        people:'3 to 5 People'
    },
    {
        id:4,
        title:'Friends',
        desc:'A bunch of thrill-seekes',
        icon:'⛵',
        people:'5 to 10 People'
    },
]

export const SelectBudgetOptions = [
    {
        id:1,
        title:'Cheap',
        desc:'Stay conscious of cost',
        icon:'💴',
    },
    {
        id:2,
        title:'Moderate',
        desc:'Keep cost on average side',
        icon:'💰',
    },
    {
        id:3,
        title:'Luxury',
        desc:'Dont worry about cost',
        icon:'💸',
    },
]

export const AI_PROMPT = 'Generate Travel Plan for Location: {location}, for {totalDays} Days for {traveler} with a {budget} budget, Give me a Hotels options list with HotelName, Hotel address, Price, hotel image url, geo coordinates, rating, descriptions and suggest itinerary with placeName, Place Details, Place Image Url, Geo Coordinates, ticket Pricing, Time travel each of the location for {totalDays} days with each day plan with best time to visit in only JSON format.'
# Casa-Hunt
Real Estate Data Management System

![MixCollage-20-Dec-2023-06-35-PM-7168](https://github.com/waylaidwanderer/DotaBuddy/assets/13198518/d1ffedba-06c8-4d65-a49a-dc228093c230)


## Frontend

1. Page for GET Listings (Done)
2. Page for GET individual listing (Done)
3. Filter & Full text search (in Progress) - BUG : Filter & 
4. Google Maps for finding Nearby Properties (in Progress)
5. State management using Redux(for filters , List<Houses> ..) (Done)

<!-- Filter can be done on Price & Location
Full text search only on title/name  -->


## Backend Endpoints

1. GET /v1/properties: Get a list of all properties. (Done)
2. GET /v1/properties/:id: Get details of a specific property. (Done)
3. GET /v1/search/properties&searchTerm=x&maxPrice=1000000 : Search & Price Filter
(For full text search , indexing on location, desc, title is done, for production use cases ES reverse indexes can be used)
4. POST v1/auth/login (Auth Flow)

## Running the Backend 

1. Open your terminal.
2. Change directory to the backend folder:
   
   ```bash
   cd backend
   npm install
   npm start
   ```
This will serve endpoints at PORT : 3000

## Running the Frontend 

1. Change directory to the backend folder:
   
   ```bash
   cd frontend
   npm install
   npm start
   ```
This will serve endpoints at PORT : 3001



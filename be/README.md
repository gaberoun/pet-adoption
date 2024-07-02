# PET ADOPTION: A BACKEND APP

## User Stories or Tasks
### Authentication
- Users can view pet owner details ('GET /api/v1/users/:userId')
- Users can create an account ('POST /api/v1/users/register')
- Users can log in to their account ('POST /api/v1/users/login')
- Users can change their password if forgotten ('PUT /api/v1/users/:userId)
### Browse Pets
- Users can browse pets for adoption ('GET /api/v1/pets')
- Users can view a pet's details ('GET /api/v1/pets/:petId')
### Put a pet up for adoption
- Users can put own pet up for adoption ('POST /api/v1/pets')
- Users can remove own pet from site ('PUT /api/v1/pets/:petId) *Soft deletion

## Technical Specifications
- Code should use express, dotenv and cors.
- Code should have basic security on the APIs using helmet.
- Code should have at least 4 endpoints.
- Code should have at least one of each of the 4 CRUD basic operations.
- At least one endpoint that uses an optional query parameter.
- Code should implement soft deletion.
- Code should have error handling and proper use of HTTP status codes.
- Code should have a README.
- Use of Uplift Code Camp's code and committing standards.

## Environment variables
- PORT: a port for the local host  
- MONGODB_URI: a MongoDB connection string
- CLOUD_NAME, API_KEY, API_SECRET: Clooudinary credentials
- JWT_SECRET: makes use of uplift's secret key

## Challenges
- Write unit tests using jest (at least 60% code coverage)
- Write documentation/ outline endpoints using Swagger
- Write a blog accessible from the public internet
- Deploy a frontend app connected to the backend

## Future plans
- Routes for deleting account and viewing/editing own profile
- Routes for applying for adoption
- Routes for saving/ liking interesting pets
- Route to see all adopted pets 
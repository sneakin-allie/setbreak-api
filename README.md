# Capstone 1: SETBREAK

This application was made for part of my capstone project for the Bloc/Thinkful Web Development course. It is a concert tracker application that music fans can use to keep track of concerts they've attended. Users can upload details about the concert including artist, venue, date, highlights, and notes. This application was built to meet the specifications laid out by the Bloc/Thinkful course. The project's client-side code can be viewed on its GitHub repository here: https://github.com/sneakin-allie/setbreak-client

## Live Application

This application can be viewed here: https://setbreak-sneakin-allie.vercel.app/

The backend API is currently running here: https://vercel.com/sneakin-allie/setbreak/66RtADMKRviWkg74npPznViTsmSA

Both are hosted on Vercel with the SQL Database hosted on Heroku.

## API Paths

The table below describes the paths and usage of the API:

|   API Path          |   Function    |
| -------------       | ------------- |
| api/users/          | POST: Log in an existing user                                                           |
| api/users/new       | POST: Sign up a new user                                                                |
| api/concerts/       | POST: Create a new concert                                                              |
| api/concerts/:email | GET: List concerts by user email                                                        |
| api/concerts/:id    | GET: List a concert by id, PATCH: Edit a concert by id, DELETE: Delete a concert by id  |
| api/concerts/edit/:id    | PATCH: Edit a concert by id, DELETE: Delete a concert by id  |

## Application Usage

The Home/Landing Page has brief instructions on what the application does and how to get started, as well as Sign Up and Log In forms for new users and existing users respectively. See below:

![Screen Shot 2021-07-13 at 8 00 53 PM](https://user-images.githubusercontent.com/68669789/125540313-7f44c425-b402-453b-8b2e-9560eec979c2.png)

The Concert Collection Page lists a user's concerts with details the user has saved. The top of the page has an "Add New Concert" button for easy access and each concert listed has an "Edit" button so that users can edit all fields as desired. See below:

![Screen Shot 2021-07-13 at 8 49 54 PM](https://user-images.githubusercontent.com/68669789/125543533-e874f7eb-ba28-45b9-97aa-13e8fe9b39f4.png)

The Add New Concert Page displays a form where a user can enter information about a concert, including the artist, venue, date, highlights, and notes. Only the artist and venue are required so that a user can quickly save a concert and return to it later to add details about date, highlights, and notes. See below:

![Screen Shot 2021-07-13 at 8 46 32 PM](https://user-images.githubusercontent.com/68669789/125543310-7125608e-22da-4e2c-849f-432ebca78034.png)

The Edit Concert Page displays a form where a user can update information about a concert that has been saved. The input fields auto-fill with the previously saved information so the user can make accurate edits where desired. At the bottom of the form, there is a "Delete" button that deletes the concert from the collection. See below:

![Screen Shot 2021-07-13 at 8 50 40 PM](https://user-images.githubusercontent.com/68669789/125543577-83217f8d-94e1-4549-bf3b-01132e3d0446.png)

## Technology Used

The back-end of this project was built using Node.js, Express, SQL, Postgres, and Knex. RESTful APIs were used along with middleware including Morgan, Express.json, Helmet, and CORS. CORS was implemented to ensure connection between the front-end application and back-end API.

The front-end of this project was built in React, using Router, class components, state, and props. An API was created that handled all promises necessary to interact with the back-end API database.

/* 
*   IMPORTS 
*/
import cookieParser from 'cookie-parser';  // Middleware for parsing cookies
import cors from 'cors';  // Middleware for enabling Cross-Origin Resource Sharing (CORS)
import dotenv from 'dotenv';  // Load environment variables from a .env file
import express from 'express';  // Import the Express framework
import responseHandler from './ResponseHandler';  // Custom response handling middleware
import authModule from './Modules/Auth/auth.module';  // Custom authentication module
import './db/mysqlConnection';  // Connect to the MySQL database

/* 
* APP CONFIGURATION
*/
dotenv.config();  // Load environment variables from .env files

const app = express();  // Create an Express application instance
app.use(cookieParser());  // Use the cookie-parser middleware to parse cookies

// This line allow us to connect the frontend with the backend
app.use(cors({ origin: 'http://localhost:8080', credentials: true }));  // Enable CORS for requests from 'http://localhost:8080' with credentials

app.use(express.urlencoded({extended: true})); // FORM DATA REQURES
app.use(express.json());  // Parse request bodies as JSON
app.use(express.text());  // Parse request bodies as text
authModule(app);  // Attach the custom authentication module to the Express app
app.use(responseHandler);  // Use the custom response handling middleware

const PORT = parseInt(process.env.PORT || '3001');  // Get the port number from environment variables

/*
*   SERVER LAUNCH
*/
app.listen(PORT, () => console.log('\nServer listening on port ' + PORT + '\n\n\n...'));  // Start the Express server and log a message when it's listening

/*
* TESTING
*/
app.get('/', (req, res) => {
    res.json({message: 'Hola'});
});
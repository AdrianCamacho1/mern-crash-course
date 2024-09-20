import express from "express";
import dotenv from "dotenv";
import path from "path";
//This server.js file serves as the entry point for your Node.js/Express.js application. 
//It sets up the server, configures middleware, defines routes, connects to the database, 
//and starts listening for incoming requests.

import { connectDB } from "./config/db.js";

import productRoutes from "./routes/product.route.js";

dotenv.config();  //Loads environment variables from your .env file.

const app = express(); //Creates an Express application instance.
const PORT = process.env.PORT || 5000; //Sets the port for your server.

const __dirname = path.resolve(); //Gets the absolute path to the current directory

app.use(express.json()); // allows us to accept JSON data in the req.body || Middleware to parse incoming JSON data in the request body (req.body)

app.use("/api/products", productRoutes); //mounts productRoutes to "/api/products || This means any requests starting with /api/products will be handled by the routes defined in your productRoutes." 

if (process.env.NODE_ENV === "production") { //checks NODE_ENV environment set to "production" || only execute when app deployed to a production server
	app.use(express.static(path.join(__dirname, "/frontend/dist"))); //Serves static files (like HTML, CSS, JavaScript) from the frontend/dist
	app.get("*", (req, res) => {
		res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
		//The path.resolve function takes all the path parts (__dirname, "frontend", "dist", "index.html") and creates a complete, absolute path to your index.html file.
		//res.sendFile then takes this absolute path and sends the index.html file as the response to the user's browser.
		//The browser receives this index.html file and starts rendering your front-end application.
	});
}

app.listen(PORT, () => { //Starts the Express server on the specified PORT.
	connectDB(); //Calls your database connection function to establish a connection to MongoDB.
	console.log("Server started at http://localhost:" + PORT);
});

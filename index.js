import express from "express";
import axios from "axios";

//Initiate application constants
const app = express();
const port = 3000;
const API_URL = "https://secrets-api.appbrewery.com/random";

//Set static file
app.use(express.static("public"));

//get secret using public API and display it on page, done on page load
app.get("/", async (req, res) => {
    try {
        const result = await axios.get(API_URL);
        res.render("index.ejs",{

            //set data from API gathered from API to be used in EJS file
            secret: result.data.secret, 
            user: result.data.username
        })
    } catch(error) {
        res.render("index.ejs",{secret: JSON.stringify(error.response.data)});
    }
});

//set up listening on specified port
app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
});
const express = require("express");
const models = require("./models");
const expressGraphQL = require("express-graphql");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const schema = require("./schema/schema");
const cors = require('cors')


const app = express();

// Replace with your Mongo Atlas URI
const MONGO_URI =   "mongodb+srv://julianovie:IMppZyurKdOALn22@graphqlapp.vp2pt6q.mongodb.net/?retryWrites=true&w=majority";
if (!MONGO_URI) {
  throw new Error("You must provide a Mongo Atlas URI");
}

mongoose.Promise = global.Promise;
mongoose.connect(MONGO_URI);
mongoose.connection
  .once("open", () => console.log("Connected to Mongo Atlas instance."))
  .on("error", (error) =>
    console.log("Error connecting to Mongo Atlas:", error)
  );

  const corsOptions = {
    origin: 'http://localhost:5173', // Reemplaza esto con la URL donde se ejecuta GraphiQL
    optionsSuccessStatus: 200 // Algunos navegadores antiguos (IE11) pueden necesitar esto
  };
  
  app.use(cors(corsOptions));
  

app.use(bodyParser.json());
app.use(
  "/graphql",
  expressGraphQL({
    schema,
    graphiql: true
  })
);

app.listen(4000, () => {
  console.log('Listening on port 4000');
});


module.exports = app;

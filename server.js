require("dotenv").config();
const express = require("express");
const app = express();
const port = process.env.PORT || 5000;
const path = require("path");
const fs = require("fs");
const { parse } = require("query-string");
const bodyParser = require("body-parser");
const fetch = require("isomorphic-fetch");

app.use(bodyParser.json());
app.get("/carDetail", function(request, response) {
  fetch(
    `${
      process.env.REACT_APP_API
    }/graphql?query={Publication(id%3A23){ImageGroup{image1}modelName%2Cbrand%2Cobservation}}`
  )
    .then(res => res.json())
    .then(({ data }) => {
      const filePath = path.resolve(__dirname, "./build", "index.html");
      fs.readFile(filePath, "utf8", function(err, htmlData) {
        if (err) {
          return console.log(err);
        }
        const { Publication } = data;
        const { ImageGroup } = Publication;

        htmlData = htmlData.replace(
          /\$OG_TITLE/g,
          `${Publication.brand} - ${Publication.modelName}`
        );
        htmlData = htmlData.replace(
          /\$OG_DESCRIPTION/g,
          Publication.observation === null ? "" : Publication.observation
        );
        result = htmlData.replace(
          /\$OG_IMAGE/g,
          `${process.env.REACT_APP_API}/images/${ImageGroup.image1}`
        );
        response.send(result);
      });
    })
    .catch(err => console.log("error", err));
});
app.use(express.static(path.resolve(__dirname, "./build")));

app.get("*", function(request, response) {
  const filePath = path.resolve(__dirname, "./build", "index.html");
  response.sendFile(filePath);
});
app.listen(port, () => console.log(`Listening on port ${port}`));

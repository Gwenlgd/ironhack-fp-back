//server.js - this is the main file being executed that contains the port configuration for the app and initiates (starts) the server. It imports the configured Express app from app.js. Commonly, this file should not be changed
const app = require("./app");

// ℹ️ Sets the PORT for our app to have access to it. If no env has been set, we hard code it to 5005
const PORT = process.env.PORT || 5005;

app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});

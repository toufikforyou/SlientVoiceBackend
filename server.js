import "dotenv/config";
import connectDB from "./src/database/index.js";
import app from "./src/index.js";

connectDB()
  .then(() => {
    app.listen(process.env.SERVER_PORT || 8000, () => {
      console.log(`Server running on port: ${process.env.SERVER_PORT}`);
    });
  })
  .catch((err) => {
    console.log("Something went wrong!");
  });

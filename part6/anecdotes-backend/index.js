import app from "./app.js";
import "dotenv/config";

app.listen(process.env.PORT, (error) => {
  if (error) throw error;
  console.log("Server running!");
});

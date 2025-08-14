import { express  } from " express";

const app = express();

app.post("/website", (req, res) => {
  
});

app.get("/status/:websiteId", (req, res) => {
  
}); 

app.listen(3000, () => {
  console.log("ButterStack API is running on port 3000");
});
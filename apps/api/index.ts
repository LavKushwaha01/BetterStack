import { promises } from "dns";
import  express  from "express";
import { prisma } from "stores/index.ts";

const app = express();
app.use(express.json());

app.post("/website", async (req, res) => {

  if(!req.body.url) {
    return res.status(401).json({
      error: "URL is required"
    });
  }
const website = await prisma.website.create({
    data: {
      url: req.body.url,
    }
  
})

res.json({
   id: website.id

});

});

app.get("/status/:websiteId", (req, res) => {

  
}); 

app.listen(3000, () => {
  console.log("ButterStack API is running on port 3000");
});
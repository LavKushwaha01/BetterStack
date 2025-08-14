import { promises } from "dns";
import  express  from "express";
import { prisma } from "stores/index.ts";
import { AuthInput } from "./types";
import jwt from "jsonwebtoken"
import { error } from "console";

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
      user: {
        // Replace 'userId' with the actual user ID from the request (e.g., req.body.userId or from auth)
        connect: { id: req.body.userId }
      }
    }
  
})

res.json({
   id: website.id

});

});

app.get("/status/:websiteId", (req, res) => {

  
}); 


app.post("/user/signin", async (req, res) => {
  const data = AuthInput.safeParse(req.body);
  if(!data.success){
      res.status(404).send("")
      return;
  }

let user = await prisma.user.findFirst({
  where: {
    username: data.data.username
  }
});

if(!user || user.password !== data.data.password){
  res.status(404).send("");
  return;
}

const token = jwt.sign({
  sub: user.id
},process.env.JWT_SECRET!)

res.json({
  jwt: token
})

})



app.post("/user/signup", async (req, res) => {
  const data = AuthInput.safeParse(req.body);
  if(!data.success){
    console.log(data.error.toString());
      res.status(404).send("")
      
      return;
  }

try{
  let user = await prisma.user.create({
  data:{
    username: data.data.username,
    password: data.data.password
  }
})
res.json({
  id: user.id
})
} catch(e){
  res.status(404).send("");
}

})

app.listen(3000, () => {
  console.log("ButterStack API is running on port 3000");
});
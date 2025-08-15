
import  express  from "express";
import { prisma } from "stores/index.ts";
import { AuthInput } from "./types";
import jwt from "jsonwebtoken"
import { authMiddleware } from "./middleware";


const app = express();

app.use(express.json());

app.post("/website", authMiddleware, async (req, res) => {

  if(!req.body.url) {
    return res.status(401).json({
      error: "URL is required"
    });
  }
const website = await prisma.website.create({
    data: {
      url: req.body.url,
      time_added: new Date(),
      user_id: req.userId!
    }
  
})

res.json({
   id: website.id

});

});

app.get("/status/:websiteId", authMiddleware, async (req, res) => {
const website = await prisma.website.findFirst({
  where:{
     user_id: req.userId!,
     id: req.params.websiteId,
  },
   include: {
            ticks: {
                orderBy: [{
                    createdAt: 'desc',
                }],
                take: 1
            }
        }
})
 if (!website) {
        res.status(409).json({
            message: "Not found"
        })
        return;
    }

    res.json({
        url: website.url,
        id: website.id,
        user_id: website.user_id
    })
  
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



app.post("/user/signup",  async (req, res) => {
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

app.listen(3001, () => {
  console.log("ButterStack API is running on port 3001");
});
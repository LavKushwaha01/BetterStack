import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken"

export function authMiddleware(req: Request, res: Response, next: NextFunction){
      const header = req.headers.authorization!; 
       if (!header) {
        console.log("header is undefinded")
        return res.status(401).json({ error: "Authorization header missing" });
        
    }
    try {
        let data = jwt.verify(header, process.env.JWT_SECRET!);
        req.userId = data.sub as string;
        next();
    } catch(e) {
        console.log(e);
        res.status(403).send("");
    }
}
import zod from "zod";

 export const AuthInput = zod.object({
   username: zod.string(),
   password: zod.string()
 })
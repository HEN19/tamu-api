//@ts-ignore
import { Application } from "https://deno.land/x/oak/mod.ts"
import authRouter from "./routes/authRoute.ts"
import userRouter from "./routes/userRoute.ts"


const app = new Application()

app.use(authRouter.routes())
app.use(authRouter.allowedMethods())

// Add user routes
app.use(userRouter.routes())
app.use(userRouter.allowedMethods())

console.log("Server is running on http://localhost:8000")
await app.listen({ port: 8000 })

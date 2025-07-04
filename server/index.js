import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import postRoutes from './routes/post.js';
import userRouter from "./routes/user.js";

import { sendEmail } from './controller/sendEmail.js';
import { ForgotPassword } from './controller/forgotPassword.js';

const app = express();
dotenv.config({ path: '../.env' });

app.use(cors());
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));

app.use("/user", userRouter)
app.use('/posts', postRoutes)
app.post('/send-email', sendEmail)
app.post('/forgot-password', ForgotPassword)

const PORT = process.env.SERVER_PORT || 5000;
const CONNECTION_URL = process.env.MOONGO_URI;

mongoose.connect(
    CONNECTION_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}
).then(() => {
    app.listen(PORT, () => console.log(`Server running on port : ${PORT}`));
}).catch((error) => console.log(`${error} did not connect`));

mongoose.set('useFindAndModify', false);
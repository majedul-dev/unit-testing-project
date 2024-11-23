import dotenv from "dotenv"
import connectDB from './db/index.js';
import {app} from "./app.js"

dotenv.config({
    path: "./.env"
})

if (process.env.NODE_ENV !== 'test') {
    connectDB().then(() => {
      app.listen(4000, () => {
        console.log('Server is running on https://4000-majeduldev-unittestingp-y9try0q7hfa.ws-us116.gitpod.io');
      });
    });
  }


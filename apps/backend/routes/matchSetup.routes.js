import express from "express";

import auth from "../middleware/auth.js";
import authorize from "../middleware/authorize.js";

import {

createDraftMatch,

} from "../controllers/matchSetup.controller.js";

const router=express.Router();

router.post(

"/draft",

auth,

authorize(

"admin",

"coach"

),

createDraftMatch

);

export default router;

import express from 'express'
import {getCounts} from "../controllers/categoryCountWarnings.js"

const router = express.Router()

router.get("/count/:ime",getCounts)

export default router

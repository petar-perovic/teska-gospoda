import express from 'express'
import {zadatak2} from "../controllers/five.js"

const router = express.Router()

router.get("/zad2",zadatak2)

export default router
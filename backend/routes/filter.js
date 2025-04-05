import express from 'express'
import {filterZadnji} from "../controllers/filter.js"

const router = express.Router()

router.get("/search",filterZadnji)

export default router

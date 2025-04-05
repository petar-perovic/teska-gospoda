import express from 'express'
import {treciZad} from "../controllers/error.js"

const router = express.Router()

router.get("/error_files",treciZad)

export default router

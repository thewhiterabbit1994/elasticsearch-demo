import express from 'express'
import reportController from 'controllers/report'

const router = express.Router()

router.get('/', (req, res, next) => {
  res.send('report page')
})

router.post('/', reportController.submitReport)

export default router
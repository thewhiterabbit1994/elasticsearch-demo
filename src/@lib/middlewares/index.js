import express from 'express'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import authenticate from './authenticate'

export default app => {
  app.use(cors())
  app.use(express.json())
  app.use(express.urlencoded({
    extended: true
  }));
  app.use(cookieParser())
  app.use(authenticate)
}
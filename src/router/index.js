import viewRouter from './viewRouter'
import reportRouter from './reportRouter'

export default app => {
  app.use('/', viewRouter)
  app.use('/report/', reportRouter)
  app.use((req, res, next) => {
    if (req.url === '/graphql') return next()
    res.send('404')
  })
}
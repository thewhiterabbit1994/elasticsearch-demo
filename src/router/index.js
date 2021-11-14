import viewRouter from './viewRouter'
import reportRouter from './reportRouter'

export default app => {
  app.use('/', viewRouter)
  app.use('/report/', reportRouter)
  app.use((_, res) => res.send('404'))
}
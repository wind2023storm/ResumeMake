/**
 * @flow
 */

import Koa from 'koa'
import bodyParser from 'koa-bodyparser'
import router from './routes'
import { errorHandler } from './middleware'

const app = new Koa()

if (app.env === 'development') {
  app.proxy = true
}

app.use(errorHandler())
app.use(bodyParser())
app.use(router)

export default app

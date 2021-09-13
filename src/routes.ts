import { Router } from 'express'

import MovieController from './controllers/MovieController'
import CharacterController from './controllers/CharacterController'
import CastController from './controllers/CastController'

const movie = new MovieController()
const character = new CharacterController()
const cast = new CastController()

const routes = Router()

routes.get('/movies/:id', movie.show)
routes.post('/movies', movie.create)
routes.get('/movies', movie.index)
routes.patch('/movies/:id', movie.update)
routes.delete('/movies/:id', movie.delete)

routes.get('/characters/:id', character.show)
routes.post('/characters', character.create)

routes.post('/casts', cast.create)
routes.get('/casts/:movie_id', cast.index)

export default routes

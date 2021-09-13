import { Request, Response } from 'express'
import { getRepository } from 'typeorm'
import * as Yup from 'yup'

import { Movie } from '../models/entities/Movie'

type MovieRequest = {
  name: string
  description: string
  price: number
  release_date: Date
}

class MovieController {
  async create(req: Request, res: Response) {
    try {
      const {
        name,
        description,
        price,
        release_date
      } = req.body as MovieRequest

      const moviesRepository = getRepository(Movie)

      const data = {
        name,
        description,
        price,
        release_date
      } as MovieRequest

      const schema = Yup.object().shape({
        name: Yup.string().required(),
        description: Yup.string().required(),
        price: Yup.number().required(),
        release_date: Yup.date().required(),
      })

      await schema.validate(data, { abortEarly: false })

      const movie = moviesRepository.create(data)

      await moviesRepository.save(movie)

      return res.status(201).json(movie)
    } catch ({ errors }) {
      return res.status(400).json({ errors })
    }
  }

  async update(req: Request, res: Response) {
    try {
      const { id } = req.params
      const {
        name,
        description,
        price,
        release_date
      } = req.body as MovieRequest

      const moviesRepository = getRepository(Movie)

      const data = {
        name,
        description,
        price,
        release_date
      } as MovieRequest

      const schema = Yup.object().shape({
        name: Yup.string().required(),
        description: Yup.string().required(),
        price: Yup.number().required(),
        release_date: Yup.date().required(),
      })

      await schema.validate(data, { abortEarly: false })

      const movieUpdate = await moviesRepository.update(id, data)

      if (movieUpdate.affected === 0) {
        return res.status(404).json({ error: 'Movie not found' })
      }

      return res.status(200).json(data)
    } catch ({ errors }) {
      return res.status(400).json({ errors })
    }
  }

  async show(req: Request, res: Response) {
    const { id } = req.params

    const moviesRepository = await getRepository(Movie)

    const movie = await moviesRepository.findOne({
      where: { id },
      relations: ['casts']
    })

    if (!movie) {
      return res.status(404).json({ error: 'Movie not found' })
    }

    return res.status(200).json(movie)
  }

  async index(req: Request, res: Response) {
    const moviesRepository = await getRepository(Movie)

    const movies = await moviesRepository.find()

    return res.status(200).json(movies)
  }

  async delete(req: Request, res: Response) {
    const { id } = req.params

    const moviesRepository = await getRepository(Movie)

    const movie = await moviesRepository.findOne(id)

    if (!movie) {
      return res.status(404).json({ error: 'Movie not found' })
    }

    await moviesRepository.delete(id)

    return res.status(204).send()
  }
}

export default MovieController

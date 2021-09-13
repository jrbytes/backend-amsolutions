import { Request, Response } from 'express'
import { getRepository } from 'typeorm'
import * as Yup from 'yup'

import { Cast } from '../models/entities/Cast'

type CastRequest = {
  movie_id: string
  character_id: string
}

class CastController {
  async create(req: Request, res: Response) {
    try {
      const { movie_id, character_id } = req.body as CastRequest

      const castsRepository = getRepository(Cast)

      const data = {
        movie_id,
        character_id,
      } as CastRequest

      const schema = Yup.object().shape({
        movie_id: Yup.string().required(),
        character_id: Yup.string().required(),
      })

      await schema.validate(data, { abortEarly: false })

      const cast = castsRepository.create(data)

      await castsRepository.save(cast)

      return res.status(201).json(cast)
    } catch ({ errors }) {
      return res.status(400).json({ errors })
    }
  }

  async index(req: Request, res: Response) {
    const { movie_id } = req.params

    const castsRepository = getRepository(Cast)

    const casts = await castsRepository.find({
      where: { movie_id },
    })

    return res.status(200).json(casts)
  }
}

export default CastController

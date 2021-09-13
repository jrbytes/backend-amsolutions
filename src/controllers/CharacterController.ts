import { Request, Response } from 'express'
import { getRepository } from 'typeorm'
import * as Yup from 'yup'

import { Character } from '../models/entities/Character'

type CharacterRequest = {
  name: string
  age: number
}

class CharacterController {
  async create(req: Request, res: Response) {
    try {
      const { name, age } = req.body as CharacterRequest

      const charactersRepository = getRepository(Character)

      const data = {
        name,
        age,
      } as CharacterRequest

      const schema = Yup.object().shape({
        name: Yup.string().required(),
        age: Yup.number().required(),
      })

      await schema.validate(data, { abortEarly: false })

      const character = charactersRepository.create(data)

      await charactersRepository.save(character)

      return res.status(201).json(character)
    } catch ({ errors }) {
      return res.status(400).json({ errors })
    }
  }

  async show(req: Request, res: Response) {
    const { id } = req.params

    const charactersRepository = await getRepository(Character)

    const character = await charactersRepository.findOne(id)

    if (!character) {
      return res.status(404).json({ error: 'Character not found' })
    }

    return res.status(200).json(character)
  }
}

export default CharacterController

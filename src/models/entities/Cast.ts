import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
} from 'typeorm'

import { Movie } from './Movie'
import { Character } from './Character'

@Entity('casts')
export class Cast {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column()
  movie_id: string

  @ManyToOne(() => Movie)
  @JoinColumn({ name: 'movie_id' })
  movie: Movie

  @Column()
  character_id: string

  @ManyToOne(() => Character)
  @JoinColumn({ name: 'character_id' })
  character: Character

  @CreateDateColumn({ type: 'timestamptz' })
  created_at: Date

  @UpdateDateColumn({ type: 'timestamptz' })
  updated_at: Date

  @OneToOne(() => Character, { eager: true })
  @JoinColumn({ name: 'character_id' })
  character_details: Character
}

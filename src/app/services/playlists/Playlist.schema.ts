import {Entity, Column, PrimaryGeneratedColumn} from 'typeorm'

@Entity()
export class Playlist {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  name: string

  @Column()
  likes: number
}

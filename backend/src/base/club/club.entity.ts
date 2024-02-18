import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { StarterLink } from '../starterLink/starterLink.entity';

@ObjectType()
@Entity()
export class Club {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column({ unique: true })
  name: string;

  @Field()
  @Column()
  location: string;

  @OneToMany((type) => StarterLink, (starterLink) => starterLink.club)
  starterLinks: StarterLink[];
}

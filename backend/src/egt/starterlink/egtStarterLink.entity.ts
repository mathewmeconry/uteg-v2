import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { EGTDivision } from '../division/egtDivision.entity';
import { StarterLink } from 'src/base/starterLink/starterLink.entity';

@ObjectType()
@Entity()
export class EGTStarterLink {
  @PrimaryGeneratedColumn()
  @Field(() => ID)
  id: number;

  @ManyToOne(() => EGTDivision)
  division: Promise<EGTDivision>;

  @OneToOne(() => StarterLink)
  @JoinColumn()
  starterLink: Promise<StarterLink>
}

import { Inject, Injectable, forwardRef } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Starter } from './starter.entity';
import { Repository } from 'typeorm';
import { AuthService } from 'src/auth/auth.service';

@Injectable()
export class StarterService {
  @InjectRepository(Starter)
  private starterRepository: Repository<Starter>;

  @Inject(forwardRef(() => AuthService))
  private authService: AuthService;

  async create(starter: Starter): Promise<Starter> {
    starter.password = await this.authService.hash(starter.password);
    return this.starterRepository.save(starter);
  }

  findAll(): Promise<Starter[]> {
    return this.starterRepository.find();
  }

  findOne(id: number): Promise<Starter | null> {
    return this.starterRepository.findOneBy({ id });
  }

  findOneByEmail(email: string): Promise<Starter | null> {
    return this.starterRepository.findOneBy({ email });
  }

  async remove(id: number): Promise<void> {
    await this.starterRepository.delete(id);
  }
}

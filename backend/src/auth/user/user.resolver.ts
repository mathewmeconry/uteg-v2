import { Inject } from '@nestjs/common';
import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { User } from './user.entity';
import { UserService } from './user.service';
import { Public } from 'src/auth/decorators/public.decorator';
import { CreateUserInput } from './user.types';

@Resolver(() => User)
export class UserResolver {
  @Inject()
  private userService: UserService;

  @Query(() => [User], { name: 'users' })
  async findAll(): Promise<User[]> {
    return this.userService.findAll();
  }

  @Public()
  @Mutation(() => User, { name: 'createUser' })
  async create(@Args('user') userData: CreateUserInput): Promise<User> {
    const user = new User();
    user.email = userData.email;
    user.password = userData.password;
    return this.userService.create(user);
  }
}

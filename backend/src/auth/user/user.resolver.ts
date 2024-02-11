import { Inject, NotFoundException } from '@nestjs/common';
import { Resolver, Query, Mutation, Args, Context } from '@nestjs/graphql';
import { User } from './user.entity';
import { UserService } from './user.service';
import { Public } from 'src/auth/decorators/public.decorator';
import { CreateUserInput, UpdateUserInput } from './user.types';
import { AuthService } from '../auth.service';
import { ROLES } from '../types';

@Resolver(() => User)
export class UserResolver {
  @Inject()
  private userService: UserService;

  @Inject()
  private authService: AuthService;

  @Query(() => [User], { name: 'users' })
  async findAll(): Promise<User[]> {
    return this.userService.findAll();
  }

  @Query(() => User, { name: 'currentUser' })
  async currentUser(@Context() ctx: { user: User }): Promise<User> {
    return ctx.user;
  }

  @Mutation(() => User, { name: 'updateUser' })
  async updateUser(
    @Context() ctx: { user: User },
    @Args('data') data: UpdateUserInput,
  ): Promise<User> {
    if (data.id !== ctx.user.id) {
      if (!this.authService.globalAuthorize(ctx.user.id, ROLES.ADMIN)) {
        throw new Error('Unauthorized');
      }
    }

    const user = await this.userService.findOne(data.id);
    if (!user) {
      throw new NotFoundException();
    }

    user.email = data.email;
    user.language = data.language;
    return this.userService.save(user);
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

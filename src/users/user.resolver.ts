import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { UserService } from "./user.service.ts";
import { UseGuards } from "@nestjs/common";
import { GqlAuthGuard } from "../auth/guards/gql.auth.guard.ts";
import { CurrentUser } from "./user.decorator.ts";
import { User } from "./user.schema.ts";

@Resolver()
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @UseGuards(GqlAuthGuard)
  @Query(() => String)
  async hello(
    @CurrentUser() user: User,
  ) {
    return `Hello, ${user.username}`;
  }

  @Mutation(() => String)
  async login(
    @Args('username') username: string,
    @Args('password') password: string
  ) {
    return await this.userService.login(username, password);
  }
}

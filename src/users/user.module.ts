import { Module } from "@nestjs/common";
import { UserService } from "./user.service.ts";
import { UserResolver } from "./user.resolver.ts";
import { MongooseModule } from "@nestjs/mongoose";
import { User, UserSchema } from "./user.schema.ts";
import { AuthModule } from "../auth/auth.module.ts";

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: User.name,
        schema: UserSchema,
      }
    ]),
    AuthModule,
  ],
  providers: [
    UserService,
    UserResolver,
  ],
  exports: []
})
export class UserModule {

}

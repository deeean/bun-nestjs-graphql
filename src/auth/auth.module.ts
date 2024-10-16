import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";
import { MongooseModule } from "@nestjs/mongoose";
import { User, UserSchema } from "../users/user.schema.ts";
import { JwtStrategy } from "./strategies/jwt.strategy.ts";
import { ConfigService } from "@nestjs/config";
import { AuthService } from "./auth.service.ts";

@Module({
  imports: [
    JwtModule.registerAsync({
      inject: [
        ConfigService,
      ],
      useFactory: (
        configService: ConfigService
      ) => ({
        secret: configService.get('JWT_SECRET'),
        signOptions: { expiresIn: '1d' }
      })
    }),
    PassportModule.register({
      defaultStrategy: 'jwt'
    }),
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema }
    ])
  ],
  providers: [
    AuthService,
    JwtStrategy,
  ],
  exports: [
    AuthService,
  ]
})
export class AuthModule {

}

import { Module } from "@nestjs/common";
import { AppService } from "./app.service.ts";
import { AppController } from "./app.controller.ts";
import { GraphQLModule } from "@nestjs/graphql";
import { ApolloDriver, ApolloDriverConfig } from "@nestjs/apollo";
import { MongooseModule } from "@nestjs/mongoose";
import { AuthModule } from "./auth/auth.module.ts";
import { UserModule } from "./users/user.module.ts";
import { ConfigModule } from "@nestjs/config";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: true,
      playground: true,
    }),
    MongooseModule.forRoot("mongodb://root:root@localhost:27017", {
      dbName: 'bun_nestjs_graphql'
    }),
    AuthModule,
    UserModule,
  ],
  controllers: [
    AppController,
  ],
  providers: [
    AppService,
  ],
})
export class AppModule {

}

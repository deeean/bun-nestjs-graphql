import { Module } from "@nestjs/common";
import { AppService } from "./app.service.ts";
import { AppController } from "./app.controller.ts";
import { GraphQLModule } from "@nestjs/graphql";
import { ApolloDriver, ApolloDriverConfig } from "@nestjs/apollo";
import { PetsModule } from "./pets/pets.module.ts";
import { MongooseModule } from "@nestjs/mongoose";

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: true,
      playground: true,
    }),
    MongooseModule.forRoot("mongodb://root:root@localhost:27017", {
      dbName: 'bun_nestjs_graphql'
    }),
    PetsModule,
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

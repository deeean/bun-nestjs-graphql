import { Module } from "@nestjs/common";
import { PetsService } from "./pets.service.ts";
import { PetsResolver } from "./pets.resolver.ts";
import { MongooseModule } from "@nestjs/mongoose";
import { Pet, PetSchema } from "./pets.schema.ts";

@Module({
  imports: [
    MongooseModule.forFeature([{
      name: Pet.name,
      schema: PetSchema,
    }])
  ],
  providers: [
    PetsService,
    PetsResolver,
  ],
  exports: [
    PetsService,
  ]
})
export class PetsModule {

}

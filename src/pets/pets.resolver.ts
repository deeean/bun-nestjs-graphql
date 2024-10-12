import { Query, Resolver } from "@nestjs/graphql";
import { Pet } from "./pets.schema.ts";
import { PetsService } from "./pets.service.ts";

@Resolver(() => Pet)
export class PetsResolver {
  constructor(
    private readonly petsService: PetsService,
  ) {
  }

  @Query(() => [Pet])
  async pets() {
    return this.petsService.pets();
  }
}

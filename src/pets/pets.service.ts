import { Injectable, OnApplicationBootstrap } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Pet } from "./pets.schema.ts";
import { Model } from "mongoose";

@Injectable()
export class PetsService implements OnApplicationBootstrap {
  constructor(
    @InjectModel(Pet.name)
    private readonly petsModel: Model<Pet>,
  ) {
  }

  async onApplicationBootstrap() {
    const numPets = await this.petsModel.countDocuments().exec();

    if (numPets === 0) {
      await this.petsModel.insertMany([
        { name: 'Fluffy' },
        { name: 'Fido' },
        { name: 'Spike' },
        { name: 'Mittens' },
        { name: 'Spot' },
        { name: 'Whiskers' },
        { name: 'Smokey' },
      ])
    }
  }

  async pets() {
    return this.petsModel.find().exec();
  }
}

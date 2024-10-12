import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Field, ID, ObjectType } from "@nestjs/graphql";

@Schema()
@ObjectType()
export class Pet {
  @Field(() => ID)
  _id: string;

  @Prop({ required: true })
  @Field(() => String)
  name: string;
}

export const PetSchema = SchemaFactory.createForClass(Pet);

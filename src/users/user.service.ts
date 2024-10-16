import { Injectable, OnApplicationBootstrap } from "@nestjs/common";
import { Model } from "mongoose";
import { User } from "./user.schema.ts";
import { InjectModel } from "@nestjs/mongoose";
import { AuthService } from "../auth/auth.service.ts";
import * as bcrypt from "bcrypt";

@Injectable()
export class UserService implements OnApplicationBootstrap {
  constructor(
    private readonly authService: AuthService,
    @InjectModel(User.name)
    private readonly userModel: Model<User>
  ) {
  }

  async onApplicationBootstrap() {
    const user = await this.userModel.findOne({ username: 'admin' });
    if (!user) {
      await this.userModel.create({
        username: 'admin',
        password: 'admin',
      });
    }
  }

  async login(username: string, password: string) {
    const user = await this.userModel.findOne({ username });
    if (!user) {
      throw new Error('User not found');
    }

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      throw new Error('Invalid password');
    }

    return await this.authService.generateToken({
      username: user.username,
      sub: user._id,
    });
  }
}

import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
  ) {
  }

  async generateToken(payload: Buffer | object) {
    return this.jwtService.signAsync(payload);
  }
}

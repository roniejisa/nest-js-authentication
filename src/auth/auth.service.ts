import { Injectable } from "@nestjs/common";
import { UserService } from "../users/user.service";
import { JwtService } from "@nestjs/jwt";
import { jwtConstants } from "./constants";
export interface JwtPayload {
  [key: string]: any; // Đảm bảo rằng payload có thể chứa các thuộc tính khác
}
@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.usersService.findByEmail(email);
    if (user && user.password === pass) {
      const { email } = user;
      return { email };
    }
    return null;
  }

  async login(user: any) {
    const payload = { email: user.email, sub: user.id };
    return this.createToken(payload);
  }

  async loginGoogle(user: any) {
    const payload = { email: user.emails[0].value, sub: user.id };
    return this.createToken(payload);
  }

  createToken(payload: JwtPayload) {
    // Loại bỏ 'ext' và 'iat' khỏi payload
    if (payload.exp) delete payload.exp;
    if (payload.iat) delete payload.iat;
    console.log("payload", payload);
    return {
      access_token: this.jwtService.sign(payload),
      refresh_token: this.jwtService.sign(payload, {
        secret: jwtConstants.refreshSecret,
        expiresIn: "7d",
      }),
    };
  }
}

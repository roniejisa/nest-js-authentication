import {
  Controller,
  Get,
  Request,
  Post,
  UseGuards,
  Req,
  Res,
} from "@nestjs/common";
import { JwtAuthGuard } from "./jwt-auth.guard";
import { LocalAuthGuard } from "./local-auth.guard";
import { AuthService } from "./auth.service";
import { GoogleOauthGuard } from "./google-oauth.guard";

@Controller("auth")
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post("login")
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @Get("google")
  @UseGuards(GoogleOauthGuard)
  async googleLogin() {}

  @Get("google/callback")
  @UseGuards(GoogleOauthGuard)
  async callback(@Req() req) {
    return await this.authService.loginGoogle(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Get("profile")
  getProfile(@Request() req) {
    return req.user;
  }
}

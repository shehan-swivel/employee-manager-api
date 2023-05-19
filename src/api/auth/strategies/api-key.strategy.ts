import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { HeaderAPIKeyStrategy } from 'passport-headerapikey';
import { AuthService } from '../auth.service';

@Injectable()
export class ApiKeyStrategy extends PassportStrategy(HeaderAPIKeyStrategy, 'headerapikey') {
  constructor(private readonly authService: AuthService) {
    super({ header: 'X-API-Key', prefix: '' }, false);
  }

  validate(apiKey: string, done: (error: any, user?: any) => void) {
    // Check the validity of API Key
    const isValid = this.authService.validateApiKey(apiKey);

    if (!isValid) {
      // Return unauthorized error when API key is invalid
      done(new UnauthorizedException());
    }

    done(null, isValid);
  }
}

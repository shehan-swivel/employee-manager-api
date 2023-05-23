import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(private configService: ConfigService) {}

  // Validate X-API-KEY
  validateApiKey(apiKey: string): boolean {
    /**
     * API Key(s) storage mechanism (Environment variables, Database, Key-Value store, etc.) can be decide based on the use case.
     * In this scenario, the API key is stored in an environment variable.
     */
    const key = this.configService.get<string>('API_KEY');
    return apiKey === key;
  }
}

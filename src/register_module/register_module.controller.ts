import { Body, Controller, Post } from '@nestjs/common';
import { RegisterModuleService } from './register_module.service';

@Controller('register-module')
export class RegisterModuleController {
  constructor(private readonly registerModuleService: RegisterModuleService) {}

  @Post()
  async registerModule(@Body() body: any) {
    return this.registerModuleService.registerModule(body);
  }
}

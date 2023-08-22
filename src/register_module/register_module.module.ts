import { Module } from '@nestjs/common';
import { RegisterModuleService } from './register_module.service';
import { RegisterModuleController } from './register_module.controller';
import { BrowserModule } from 'src/browser/browser.module';

@Module({
  providers: [RegisterModuleService],
  controllers: [RegisterModuleController],
  exports: [RegisterModuleService],
  imports: [BrowserModule],
})
export class RegisterModuleModule {}

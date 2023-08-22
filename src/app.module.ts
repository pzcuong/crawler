import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LoginController } from './login/login.controller';
import { LoginModule } from './login/login.module';
import { RegisterModuleModule } from './register_module/register_module.module';
import { BrowserService } from './browser/browser.service';
import { BrowserModule } from './browser/browser.module';
import { RegisterModuleController } from './register_module/register_module.controller';

@Module({
  imports: [LoginModule, RegisterModuleModule, BrowserModule],
  controllers: [AppController, LoginController, RegisterModuleController],
  providers: [AppService, BrowserService],
})
export class AppModule {}

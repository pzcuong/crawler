import { Module } from '@nestjs/common';
import { LoginService } from './login.service';
import { BrowserService } from 'src/browser/browser.service';
import { BrowserModule } from 'src/browser/browser.module';

@Module({
  providers: [LoginService],
  exports: [LoginService],
  imports: [BrowserModule],
})
export class LoginModule {}

import { BrowserService } from './../browser/browser.service';
import { Injectable } from '@nestjs/common';
import * as puppeteer from 'puppeteer';

@Injectable()
export class LoginService {
  private readonly usernameSelector = 'input[id*="-field-username__"]';
  private readonly passwordSelector = 'input[id*="-field-password__"]';
  private readonly loginButtonSelector = 'button[type="submit"]';
  private readonly loginFailSelector = '.chakra-alert__title';

  constructor(private readonly BrowserService: BrowserService) {}

  private async checkLoginOutcome(page: puppeteer.Page): Promise<string> {
    const loginFailPromise = page
      .waitForSelector(this.loginFailSelector, { timeout: 3000 })
      .then(() => 'Login Failed');

    const navigationPromise = page
      .waitForNavigation()
      .then(() => 'Login Successful');

    return Promise.race([loginFailPromise, navigationPromise]).catch(
      () => 'Login Failed',
    );
  }
  async login(
    url: string,
    username: string,
    password: string,
  ): Promise<string> {
    const browser = await this.BrowserService.getBrowser();
    const page = await browser.newPage();
    await page.goto(`https://${url}`);

    await page.waitForSelector(this.usernameSelector);

    await page.type(this.usernameSelector, username);
    await page.type(this.passwordSelector, password);
    await page.click(this.loginButtonSelector);

    return await this.checkLoginOutcome(page);
  }
}

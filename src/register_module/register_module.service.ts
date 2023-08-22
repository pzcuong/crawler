import { Injectable } from '@nestjs/common';
import { BrowserService } from 'src/browser/browser.service';
import * as puppeteer from 'puppeteer';

@Injectable()
export class RegisterModuleService {
  constructor(private BrowserService: BrowserService) {}

  async checkCheckboxForCourse(
    page: puppeteer.Page,
    courseId: string,
  ): Promise<void> {
    const rowHandle = await page.evaluateHandle((courseId) => {
      const rows = Array.from(document.querySelectorAll('tr'));
      return rows.find((row) => row.textContent.includes(courseId));
    }, courseId);

    if (rowHandle && !rowHandle.asElement()) {
      console.error('Course ID not found');
      return;
    }

    const checkboxHandle = await rowHandle
      .asElement()
      .$('input[type="checkbox"]');
    if (checkboxHandle) {
      await checkboxHandle.click();
    } else {
      console.error('Checkbox not found');
    }
  }

  async submitRegister(page: puppeteer.Page): Promise<void> {
    await page.evaluate(() => {
      const button = document.querySelector(
        'button[type="button"].chakra-button',
      ) as HTMLElement;
      if (button) {
        button.dispatchEvent(new MouseEvent('click'));
      } else {
        console.error('Submit button not found');
      }
    });
  }

  async registerModule(body: any) {
    const browser = await this.BrowserService.getBrowser();
    const page = await browser.newPage();
    await page.goto('https://dkhp.uit.edu.vn/app/courses-registration');
    console.log('Page loaded');
    await page.waitForSelector('input[type="checkbox"]');

    for (const courseId of body.courseIds) {
      console.log(courseId);
      await this.checkCheckboxForCourse(page, courseId);
    }

    setTimeout(async () => {
      await this.submitRegister(page);
    }, 5000);

    return { message: 'Register successfully' };
  }
}

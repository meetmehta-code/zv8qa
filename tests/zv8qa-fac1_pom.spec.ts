// login-pom.spec.ts
import { test, expect } from '@playwright/test';
import { baseTest } from './baseTest';

test('Smoke Testing for ZV8QA-FAC1', async ({ page }) => {
  const loginPage = new baseTest(page);
  await loginPage.gotoURL();
  await loginPage.acceptCookies();
  await loginPage.login('CZ1QA02', 'Welcome@1');
  expect(await loginPage.verifyLoginSuccess());
  await page.waitForTimeout(2000);

  await loginPage.selectFacility('FCZ1');
  await page.waitForTimeout(2000);


});
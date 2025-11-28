import {test, expect, selectors} from '@playwright/test';

test("Verify Page Title", async ({page}) => {
    
    await page.goto("https://zodiacappqa.zv8.zodiac-cloud.com/zodiac/ui/auth");
    await page.waitForLoadState('networkidle');

    let title : string = await page.title();
    console.log("Page Title is: " + title);

    await expect(page).toHaveTitle(" ");    

});


test("Verify Login Functionality", async ({page}) => {

    await page.goto("https://zodiacappqa.zv8.zodiac-cloud.com/zodiac/ui/auth");
    await page.waitForLoadState('networkidle');

    await page.locator("//*[@id='root']/div[3]/div[2]/button[1]").click();
    await page.locator("//*[@id='user-id']").click();
    await page.locator("//*[@id='user-id']").fill("meet");
    await page.locator("//*[@id='password']").click();    
    await page.locator("//*[@id='password']").fill("Welcome@15");
    await page.locator("//*[@id='login-form']/button").click();
    
    await expect(page).toHaveURL("https://zodiacappqa.zv8.zodiac-cloud.com/zodiac/ui/home");
    await expect(page).toHaveTitle("Home");
    
    }
);
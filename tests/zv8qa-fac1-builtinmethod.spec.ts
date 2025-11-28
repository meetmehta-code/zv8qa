import { test, expect, Locator } from '@playwright/test';
import { Network, NetworkResources } from 'inspector/promises';
import { networkInterfaces } from 'os';

test('Login into ZV8QA', async ({ page }) => {
  
    //Lauch ZV8QA webpage
    await page.goto('https://zodiacappqa.zv8.zodiac-cloud.com/zodiac/um/auth');
    await page.waitForLoadState('networkidle');

    //Handle SSL certificate error page
    const initialPageTitle = await page.title();
    if(initialPageTitle.includes('Privacy error')) 
    {
        const connectionStatus = page.getByText('Your connection is not private');
      
        if (await connectionStatus.isVisible()) 
        {
        await page.click('button:has-text("Advanced")');
        await page.click('text=Proceed to zodiacappqa.zv8.zodiac-cloud.com (unsafe)');
        await page.waitForLoadState('networkidle');
        }   
    }        
    
  //Accept cookies if the prompt is visible
       
    const acceptCookies = page.getByRole('button', { name: 'Accept All Cookies' });
    if (await acceptCookies.isVisible()) 
    {
        await acceptCookies.click();
    }

  //Fetch current header of the page
    const pageTitle : string= await page.title();
    

  //Assert the hearder name
    console.log(pageTitle);
    expect(page).toHaveTitle(" ");
    console.log("Built-in methods on Page and Locator are working fine.");

  //Sign-In functionality
        await page.locator('#user-id').fill('meet');
        await page.locator('#password').fill('Welcome@14');
        //await page.locator('button:has-text("Sign In")').click(); 
        await page.getByRole('button', { name: 'Sign In' }).first().click();

        await page.waitForLoadState('networkidle');
        
        await expect(page).toHaveURL('https://zodiacappqa.zv8.zodiac-cloud.com/zodiac/ui/home');
        await expect(page).toHaveTitle('Home');

});

test("Select Facility", async ({page}) => {
    //Select Facility after login
    await page.locator('//*[@id="root"]/div[2]/div[1]/div[2]/div/div[2]/div[1]').click();
    await page.locator('text=FAC1').click();
    await page.waitForLoadState('networkidle');
    await expect(page).toHaveURL('https://zodiacappqa.zv8.zodiac-cloud.com/zodiac/ui/dashboard');
});
import { test, expect, Locator } from '@playwright/test';
import { Network, NetworkResources } from 'inspector/promises';
import { networkInterfaces } from 'os';

test('Test builtin methods on page and locator', async ({ page }) => {
  
  //Lauch ZV8QA webpage
    await page.goto('https://zodiacappdp2.zv8.zodiac-cloud.com/zodiac/um/auth');
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
    expect(pageTitle).toBe('');
    

  console.log("Built-in methods on Page and Locator are working fine.");

  //Sign-In functionality
        
        await page.locator("//*[@id='user-id']").click();
        
        const username : Locator = page.getByLabel('User ID');
        await username.fill('meet');




        
        const password = page.getByRole('textbox', { name: 'password' });
        await password.fill('Welcome@14');

        //await page.getByLabel('User ID').fill('meet');
        //await page.getByLabel('Password').fill('Welcome@14');
        
        const signinbutton = page.getByRole('button', { name: 'submit' });   
        await signinbutton.click();
        await page.waitForLoadState('networkidle');
        
        await expect(page).toHaveURL('https://zodiacappqa.zv8.zodiac-cloud.com/zodiac/um/home');
        await expect(page).toHaveTitle('Home');







  
});
import { test, expect, Locator, chromium, Page } from '@playwright/test';
import { Network, NetworkResources } from 'inspector/promises';
import { networkInterfaces } from 'os';

test('Login into ZV8QA', async ({ page, context }) => {
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

        // Click the dropdown button (contains text 'FAC1' initially)
        await page.getByText('FAC1', { exact: true }).first().click();
        await page.waitForTimeout(2000); // Wait for 2 seconds to ensure dropdown options are loaded
        
        // Click the FAC1 option from dropdown list
        await page.getByText('FAC1', { exact: true }).nth(1).click(); 
        await page.waitForTimeout(2000); // Wait for 2 seconds to ensure dropdown options are loaded
        

        //Click on handburger menu
        await page.getByAltText('menu').click();
        await page.waitForTimeout(2000); // Wait for 2 seconds to ensure menu is loaded

        await page.getByText('Operation and Planning').click();
        await page.waitForTimeout(2000); // Wait for 2 seconds to ensure submenu is loaded

        await page.getByText('Operation and Planning').nth(1).click();
        await page.waitForTimeout(2000); // Wait for 2 seconds to ensure submenu is loaded


    // Get all pages in the context
        const pages = context.pages();
        //console.log(pages);

    // You can then iterate or filter to find the desired page
        for (const p of pages) {
            if (await p.title() === 'Home') {
                console.log('True.');
            await p.bringToFront(); // Bring the page to the foreground
            await page.waitForTimeout(2000); // Wait for 2 seconds to ensure submenu is loaded
            break;
        }
    }  
    await page.waitForTimeout(2000); // Wait for 2 seconds to ensure submenu is loaded  

    //Click on handburger menu
        await page.getByAltText('menu').click();
        await page.waitForTimeout(2000); // Wait for 2 seconds to ensure menu is loaded

    await page.getByText('Unit').click();
    await page.getByText('Unit Admin').click();

    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(2000); // Wait for 2 seconds to ensure menu is loaded    
    console.log(await page.title());
    await expect(page).toHaveURL(/.*unit-fac-cycle/);
    await expect(page).toHaveTitle('Unit Admin');
    
    await page.waitForTimeout(2000); // Wait for 2 seconds to ensure menu is loaded
    await page.waitForLoadState('networkidle');

    console.log("Navigated to Unit Admin page successfully.");
        
    
    //Create New Unit
    await page.getByText('Actions',{ exact: true }).click();
    await page.waitForLoadState('networkidle');

    await page.getByText('Add Import Container').click();
    await page.waitForLoadState('networkidle');   
    
    await page.locator('//*/div[2]/div/div/div/div/button[@tabindex="0"]').click(); 
    await page.waitForLoadState('networkidle');
    
    await page.getByRole('option', { name: 'IM' }).click();
    await page.waitForLoadState('networkidle');

    await page.waitForTimeout(2000); // Wait for 2 seconds to ensure menu is loaded    
    
    
});



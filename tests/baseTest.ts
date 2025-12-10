import { test, expect, Locator, chromium, Page, selectors } from '@playwright/test';

    export class baseTest {
    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async gotoURL() 
    {
        await this.page.goto('https://zodiacappqa.zv8.zodiac-cloud.com/zodiac/um/auth');
        await this.page.waitForLoadState('networkidle');

        //Handle SSL certificate error page
        const initialPageTitle = await this.page.title();
        if(initialPageTitle.includes('Privacy error')) 
        {
            const connectionStatus = this.page.getByText('Your connection is not private');
        
            if (await connectionStatus.isVisible()) 
            {
            await this.page.click('button:has-text("Advanced")');
            await this.page.click('text=Proceed to zodiacappqa.zv8.zodiac-cloud.com (unsafe)');
            await this.page.waitForLoadState('networkidle');
            }   
        }        
    }

    async acceptCookies() 
    {
        await this.page.waitForLoadState('networkidle');
        //Accept cookies if the prompt is visible
        const acceptCookies = this.page.getByRole('button', { name: 'Accept All Cookies' });
        if (await acceptCookies.isVisible()) 
        {
            await acceptCookies.click();
        }
        await this.page.waitForLoadState('networkidle');
    }

    async login(username: string, password_val: string)
    {
        //Login functionality
        await this.page.locator('#user-id').fill(username);
        await this.page.locator('#password').fill(password_val);
        await this.page.getByRole('button', { name: 'Sign In' }).first().click();
        await this.page.waitForLoadState('networkidle');       

    }

    async verifyLoginSuccess()
    {
        const LoginPageTitle = await this.page.title();
        if(LoginPageTitle.includes('Home')) 
        {
            //Verify successful login
            await expect(this.page).toHaveURL('https://zodiacappqa.zv8.zodiac-cloud.com/zodiac/ui/home');
            await expect(this.page).toHaveTitle('Home');
            await this.page.waitForLoadState('networkidle'); 
        }
        await this.page.waitForLoadState('networkidle');
    }
    
    async selectFacility(facilityName: string)
    {
        //Checking currently selected facility
        const selectedFacility = await this.page.textContent('//*/span[1][@class="facility-name"]')
        console.log('Currently selected facility: ' + selectedFacility);
        await this.page.waitForTimeout(2000);


        if(selectedFacility?.trim() === 'ZV8')
        {
            console.log('Try to select facility: ' + facilityName);
            // Click the dropdown button (contains text 'FAC1' initially)
            await this.page.getByText('ZV8', { exact: true }).click();
            await this.page.waitForTimeout(2000); // Wait for 2 seconds to ensure dropdown options are loaded   

            // Click the FAC1 option from dropdown list
            await this.page.getByText(facilityName, { exact: true }).click(); 
            await this.page.waitForTimeout(2000); // Wait for 2 seconds to ensure dropdown options are loaded
            
            //await this.page.getByRole('alertdialog', { name: 'Warning' }).locator('button').click();
            await this.page.getByRole('button', { name: 'OK' }).click();
            await this.page.waitForLoadState('networkidle');

            
        }
        else if(selectedFacility?.trim() === facilityName)
        {
            console.log('Desired facility is already selected: ' + selectedFacility);
        }
        else
        {
                console.log(await this.page
                        .getByRole('listitem')
                        .filter({ hasText: facilityName})
                        .click());
        }

    }


    async getErrorMessage() 
    {
        return this.page.locator('.error-message');
    }
}
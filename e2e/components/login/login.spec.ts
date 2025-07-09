import {test, expect} from '@playwright/test';



test('Navigate to register page', async ({page}) =>{
    await page.goto('/login')
    await page.getByRole('button',{name: 'Register'}).click()
    await page.waitForURL('/register')
    await expect(page).toHaveURL('/register')
})

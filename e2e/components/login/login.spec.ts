import {test, expect} from '@playwright/test'

test('Navigate to register page', async ({page}) =>{
    await page.goto('/login');
    await page.getByRole('button', { name: 'Register' }).click();
    const registerHeading = page.getByRole('heading', { name: 'Register' })
    const registerValue = await registerHeading.textContent()
    expect(registerValue?.trim()).toBe('Register');
})

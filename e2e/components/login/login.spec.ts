import {test, expect} from '@playwright/test'
import { loginTestUser } from '../../utils/utils';

test('Navigate to register page', async ({page}) =>{
    await page.goto('/login');
    await page.getByRole('button', { name: 'Register' }).click();
    const registerHeading = page.getByRole('heading', { name: 'Register' })
    const registerValue = await registerHeading.textContent()
    expect(registerValue?.trim()).toBe('Register');
})

test('Login', async({page}) => {
    await loginTestUser(page)
    await page.waitForURL('/dashboard')
    const urlSuffix = page.url().split('/')[3]
    expect(urlSuffix).toBe('dashboard')
})
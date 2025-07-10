import { Page } from "@playwright/test"

export const loginTestUser = async (page:Page) => {
    await page.goto('/login')
    await page.getByRole('textbox', {name: 'Username'}).fill('testuser')
    await page.getByRole('textbox', {name: 'Password'}).fill('testpassword')
    await page.getByRole('combobox', {name: 'Server'}).selectOption('1')
    await page.getByRole('button', { name: 'Login'}).click()
}
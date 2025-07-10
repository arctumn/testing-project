import {test,expect} from "@playwright/test";
import { loginTestUser } from "../../utils/utils";

test('Check if the dashboard display the user name', async ({ page }) => {
    await loginTestUser(page);
    await page.waitForURL('/dashboard')
    const userNameElement = page.getByRole('heading', {name: 'Hello, testuser'})
    expect(userNameElement).toBeVisible();
})
test('Check if the dashboard display the server name', async ({page}) => {
    await loginTestUser(page)
    await page.waitForURL('/dashboard')
    await page.waitForTimeout(3000)
    const serverNameElement = page.getByText('You are connected to server Portugal')
    expect(serverNameElement).toBeVisible()
})
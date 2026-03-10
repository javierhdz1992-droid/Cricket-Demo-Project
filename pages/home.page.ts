import { Page, Locator, expect } from "@playwright/test";
import { time } from "node:console";

export class HomePage{
    readonly page: Page
    readonly logo: Locator;
    readonly searchButton: Locator;
    readonly searchInput: Locator;
    readonly listItems: Locator;
    readonly totalRows: Locator;
    readonly gameHub: Locator;

    constructor(page: Page){
        this.page = page;
        this.logo = page.locator('//div[@class="shrink-0 h-[30px] min-w-auto"]');
        this.searchButton = page.locator('//span[@class="font-cta hidden md:inline mr-1"]');
        this.searchInput = page.getByPlaceholder('what are you looking for?');
        this.listItems = page.locator('//div[@class="group relative h-full nav-item-wrapper inline-flex justify-between  "] //a');
        this.totalRows = page.locator('//table[@class="w-full"] //tr //td //a //span');
        this.gameHub = page.getByText('Game HubPlay of the DayPlayer');
    }
    
async goto(path: string = '') {
    await this.page.goto(`https://www.icc-cricket.com/tournaments/mens-t20-world-cup-2026${path}`);
}

    async verifyUrlContains(text: string){
        expect(this.page.url()).toContain(text);
    }

    async performSearch(term: string){
        // Click on Search button.
        await this.searchButton.click();

        // Type the search keyword and press enter.
        await this.searchInput.fill(term);
        await this.searchInput.press('Enter');
    }

    async verifySearchResults(term: string){
        // Verify the url contains cricket.
        await this.verifyUrlContains(`search?q=${term}`);
    }

    async verifyMenuTabs(menuTabs: string[]){
        const actualTabs = await this.listItems.allTextContents();
        expect(actualTabs).toEqual(menuTabs);
    }

    async verifyMenuLinks(expectedTabTextLinks: {text: string, href: string}[]){
        for (const [index, listItem] of expectedTabTextLinks.entries()) {
            const link = this.listItems.nth(index);
            await expect(link).toHaveText(listItem.text, {timeout: 5000});
            await expect(link).toHaveAttribute('href', listItem.href, {timeout: 5000});
        }
    }

    async verifyTableRows(expectedRows: number){
        await expect(this.totalRows).toHaveCount(expectedRows);
    }

    async verifyGameHubDropdown(expectedOptions: string[]){
        await this.gameHub.hover();
        for(const option of expectedOptions){
            await expect(this.page.getByRole('link', { name: option })).toBeVisible();
        }
    }
}
import { Page, Locator, expect } from "@playwright/test";
import { time } from "node:console";

export class HomePage{
    readonly page: Page
    readonly logo: Locator;
    readonly searchButton: Locator;
    readonly searchInput: Locator;

    constructor(page: Page){
        this.page = page;
        this.logo = page.locator('//div[@class="shrink-0 h-[30px] min-w-auto"]');
        this.searchButton = page.locator('//span[@class="font-cta hidden md:inline mr-1"]');
        this.searchInput = page.getByPlaceholder('what are you looking for?');
    }

    async goto(){
        await this.page.goto('https://www.icc-cricket.com/tournaments/mens-t20-world-cup-2026');
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
}
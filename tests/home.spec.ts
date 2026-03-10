import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/home.page';

test('Verify the url and the logo', async ({ page }) => {
    const homePage = new HomePage(page);

    // Open website url.
    //await page.goto('https://www.icc-cricket.com/tournaments/mens-t20-world-cup-2026');
    await homePage.goto();

    // Verify the url contains cricket.
    //expect(page.url()).toContain('cricket');
    await homePage.verifyUrlContains('cricket');

    // Verify the logo is visible.
    //await expect (page.locator('//div[@class="shrink-0 h-[30px] min-w-auto"]')).toBeVisible();
    await expect (homePage.logo).toBeVisible();
})

test('Search and Verify new url', async ({ page }) => {
    const homePage = new HomePage(page);

    // Open Url.
    // await page.goto('https://www.icc-cricket.com/tournaments/mens-t20-world-cup-2026');
    await homePage.goto();
    
    //await page.pause();

    // Click on Search button.
    //await page.locator('//span[@class="font-cta hidden md:inline mr-1"]').click();

    // Type the search keyword and press enter.
    //const searchInput = page.getByPlaceholder('what are you looking for?');
    //await searchInput.fill('India');
    //await searchInput.press('Enter');
    await page.pause();
    await homePage.performSearch('India');
    
    // Hardcoded sleep - WRONG WAY
    //await homePage.page.waitForTimeout(5000);


    // Verify the url contains cricket.
    expect(homePage.page.url()).toContain('India');
    //await homePage.verifySearchResults('India');
})

test('Verify menu tabs text and link', async ({ page }) => {
    // Open website url.
    //await page.goto('https://www.icc-cricket.com/tournaments/mens-t20-world-cup-2026');

    const homePage = new HomePage(page);
    await homePage.goto();

    // Verify menu Tabs
    const menuTabs = [
        "Home",
        "Matches",
        "Standings",
        "News",
        "Videos",
        "Stats",
        "Tracker",
        "Game Hub",
        "Play of the Day",
        // "Your Call",
        // "Predictor",
        // "Player of the Match",
        "Player of the Tournament",
        "Polls",
        "More",
        "Official Broadcasters",
        "Teams",
        "Venues",
        "Captain's Day",
        "Warm-Ups",
        "Tickets",
        "Shop",
        "India T&Cs",
        "Sri Lanka T&Cs",
        "Playing Conditions",
        "ICC.tv",
        "Terms of Service",
        "Privacy Policy",
        "Careers",
        "Related Sites",
        "about"
    ];

    // Object with all list items text and links.
    //const listItems = page.locator('//div[@class="group relative h-full nav-item-wrapper inline-flex justify-between  "] //a');
    console.log(await homePage.listItems.count());

    // for (const el of await listItems.elementHandles()) {
    //     console.log(await el.textContent());
    //     console.log(await el.getAttribute('href'));
    // }

    // Verify the menu tabs text.
    //expect(await listItems.allTextContents()).toEqual(menuTabs);
    await homePage.verifyMenuTabs(menuTabs);

    // New array with all list items text and links.
    const expectedTabTextLinks = [
        { text: "Home", href: "/tournaments/mens-t20-world-cup-2026" },
        { text: "Matches", href: "/tournaments/mens-t20-world-cup-2026/matches" },
        { text: "Standings", href: "/tournaments/mens-t20-world-cup-2026/standings" },
        { text: "News", href: "/tournaments/mens-t20-world-cup-2026/news" },
        { text: "Videos", href: "/tournaments/mens-t20-world-cup-2026/videos" },
        { text: "Stats", href: "/tournaments/mens-t20-world-cup-2026/stats" },
        { text: "Tracker", href: "/tournaments/mens-t20-world-cup-2026/stats-tracker" },
        { text: "Game Hub", href: "#nolink" },
        { text: "Play of the Day", href: "/tournaments/mens-t20-world-cup-2026/potd" },
        // { text: "Your Call", href: "/tournaments/mens-t20-world-cup-2026/your-call" },
        // { text: "Predictor", href: "/tournaments/mens-t20-world-cup-2026/predictor" },
        // { text: "Player of the Match", href: "/tournaments/mens-t20-world-cup-2026/potm" },
        { text: "Player of the Tournament", href: "/tournaments/mens-t20-world-cup-2026/pott" },
        { text: "Polls", href: "/tournaments/mens-t20-world-cup-2026/polls" },
        { text: "More", href: "#nolink" },
        { text: "Official Broadcasters", href: "/tournaments/mens-t20-world-cup-2026/official-broadcasters" },
        { text: "Teams", href: "/tournaments/mens-t20-world-cup-2026/teams" },
        { text: "Venues", href: "/tournaments/mens-t20-world-cup-2026/venues" },
        { text: "Captain's Day", href: "/tournaments/mens-t20-world-cup-2026/captains-day" },
        { text: "Warm-Ups", href: "/tournaments/mens-t20-world-cup-2026/warm-up-matches" },
        { text: "Tickets", href: "https://tickets.cricketworldcup.com/" },
        { text: "Shop", href: "https://sparkfabric.co/space/icc" },
        { text: "India T&Cs", href: "https://images.icc-cricket.com/image/upload/prd/j37arbrbrh6kuxbzbp6p.pdf" },
        { text: "Sri Lanka T&Cs", href: "https://images.icc-cricket.com/image/upload/prd/hhwq2mubyupsbcaprcfj.pdf" },
        { text: "Playing Conditions", href: "https://images.icc-cricket.com/image/upload/prd/yyt7m8uh9c1uehrbvuwb.pdf" },
        { text: "ICC.tv", href: "https://www.icc-cricket.com/icc-tv" },
        { text: "Terms of Service", href: "/about/the-icc/legal-notices/website-terms-of-use" },
        { text: "Privacy Policy", href: "/about/the-icc/legal-notices/privacy-policy" },
        { text: "Careers", href: "/about/the-icc/working-at-icc/jobs-and-recruitment" },
        { text: "Related Sites", href: "/about/contact-us/social-media" },
        { text: "about", href: "/about/index" }
    ];

    // Varify the menu text and links match with new array.
    await homePage.verifyMenuLinks(expectedTabTextLinks);
})

test('Verify table number of rows', async ({ page }) => {
    // Open website url.
    const homePage = new HomePage(page);
    await homePage.goto('/standings');

    // Count the total number of rows in the standings table.
    //const totalRows = page.locator('//table[@class="w-full"] //tr //td //a //span');
    //await expect(totalRows).toHaveCount(4);
    await homePage.verifyTableRows(4);

    // Get all the rows text content and print in console.
    // for (const el of await totalRows.elementHandles()) {
    //     console.log(await el.textContent());
    // }
})

test('Verify gameHub hover dropdown menu', async ({ page }) => {
    const homePage = new HomePage(page);
    
    // Open website url.
    //await page.goto('https://www.icc-cricket.com/tournaments/mens-t20-world-cup-2026');
    await homePage.goto();

    // Click on the link and wait for the new tab to get triggered.
    // await homePage.gameHub.hover();
    // await expect(page.getByRole('link', { name: 'potd' })).toBeVisible();
    // await expect(page.getByRole('link', { name: 'pott' })).toBeVisible();
    // await expect(page.getByRole('link', { name: 'polls' })).toBeVisible();
    const gameHubMenuoptions = ["potd", "pott", "polls"];

    await homePage.verifyGameHubDropdown(gameHubMenuoptions);
})

test('Verify new tab and assert title', async ({ page }) => {
    // Open website url.
    await page.goto('https://www.icc-cricket.com/tournaments/mens-t20-world-cup-2026');

    // Click on the link and wait for the new tab to get triggered.
    const [newPage] = await Promise.all([
        page.waitForEvent('popup'),
        page.locator('//div[@class="group relative h-full nav-item-wrapper inline-flex justify-between  "] //a[@text="game-hub"]').click()
    ]);

    // Wait for the new page to load completely.
    await newPage.waitForLoadState();

    // Assertion
    await expect(newPage).toHaveTitle(/Gaming/);

    // Close the new tab.
    await newPage.close();
})
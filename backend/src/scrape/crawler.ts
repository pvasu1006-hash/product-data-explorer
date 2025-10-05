import { PlaywrightCrawler, Dataset } from 'crawlee';
const concurrency = Number(process.env.CRAWLEE_MAX_CONCURRENCY || 2);
export async function scrapeProduct(url: string) {
  return new Promise(async (resolve, reject) => {
    try {
      const crawler = new PlaywrightCrawler({
        maxConcurrency: concurrency,
        launchContext: { launchOptions: { headless: true } },
        handlePageFunction: async ({ page, request }) => {
          await page.waitForLoadState('networkidle');
          const title = await page.locator('h1').first().innerText().catch(()=>'');
          const price = await page.locator('[data-price], .price').first().innerText().catch(()=>'');
          const image = await page.locator('img').first().getAttribute('src').catch(()=>'');
          const description = await page.locator('body').innerText().catch(()=>'');
          await Dataset.pushData({ source_url: request.url, title, price, image, description, scraped_at: new Date().toISOString() });
        }
      });
      await crawler.run([{ url }]);
      const ds = await Dataset.open();
      const data = await ds.getData();
      resolve(data);
    } catch (err) {
      reject(err);
    }
  });
}

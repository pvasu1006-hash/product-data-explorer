import axios from "axios";
import * as cheerio from "cheerio";

export async function scrapeProduct(url: string) {
  try {
    const { data: html } = await axios.get(url, {
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)"
      },
      timeout: 15000,
    });

    const $ = cheerio.load(html);
    const title = $("h1").first().text().trim() || $("title").text().trim();
    const price = $(".price, [data-price]").first().text().trim();
    const image = $("img").first().attr("src");
    const description =
      $("meta[name='description']").attr("content") ||
      $("p").first().text().trim();

    return [
      {
        title,
        price,
        image,
        description,
        source_url: url,
        scraped_at: new Date().toISOString(),
      },
    ];
  } catch (err) {
    console.error("Scrape failed:", err);
    return [{ title: "", price: "", image: "", description: "", source_url: url }];
  }
}

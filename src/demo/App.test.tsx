import puppeteer from "puppeteer";

class PageObject {
  async launch() {
    let browser = await puppeteer.launch({
      headless: false
    });

    const page = await browser.newPage();

    await page.goto("http://localhost:3030");
    await page.waitForSelector(".App");

    return { page, browser };
  }
}

const App = new PageObject();

describe("selecting items", () => {
  test("it can select items when in the component area", async () => {
    const { page, browser } = await App.launch();

    await page.mouse.move(80, 80);
    await page.mouse.down();
    await page.mouse.move(90, 220);

    let selected = await page.$$(".selected");

    expect(selected.length).toBe(2);

    await page.mouse.up();

    selected = await page.$$(".selected");

    expect(selected.length).toBe(0);

    browser.close();
  }, 16000);

  test("it can't select items when in the component area", async () => {
    const { page, browser } = await App.launch();

    await page.mouse.move(20, 80);
    await page.mouse.down();
    await page.mouse.move(90, 220);

    const selected = await page.$$(".selected");

    expect(selected.length).toBe(0);

    browser.close();
  }, 16000);
});

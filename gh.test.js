const { clickElement, getText} = require("./lib/commands.js");
let page;
beforeEach(async () => {
  let day = 3;
  page = await browser.newPage();
  await page.goto("https://qamid.tmweb.ru/client/index.php"); 
  await clickElement(page, `body > nav > a:nth-child(${day}) > span.page-nav__day-week`);
  await clickElement(page, "[data-seance-id='156']");
}, 30000);

afterEach(() => {
  page.close();
});
describe("Booking",() => {
  test("Booking one ticket", async () => {
    let row = 4;
    let place1 = 4;
    await clickElement(page,`div.buying-scheme__wrapper > div:nth-child(${row}) > span:nth-child(${place1})`);
    await clickElement(page,".acceptin-button");
    const actual = await getText(page,"h2");
    const expected = "Вы выбрали билеты:";
    expect(actual).toContain(expected);
  }, 30000);

  test("Booking two tickets", async () => {
    let row = 3;
    let place2 = 5;
    let place3 = 6;
    await clickElement(page,`div.buying-scheme__wrapper > div:nth-child(${row}) > span:nth-child(${place2})`);
    await clickElement(page,`div.buying-scheme__wrapper > div:nth-child(${row}) > span:nth-child(${place3})`);
    await clickElement(page,".acceptin-button");
    const actual = await getText(page,"h2");
    const expected = "Вы выбрали билеты:";
    expect(actual).toContain(expected);
  }, 30000);

  test("Booking someone else's seat", async () => {
    let row = 2;
    let place4 = 3;
    let day = 3;
    await clickElement(page,`div.buying-scheme__wrapper > div:nth-child(${row}) > span:nth-child(${place4})`);
    await clickElement(page,".acceptin-button");
    await clickElement(page,".acceptin-button");
    await page.goto("https://qamid.tmweb.ru/client/index.php"); 
    await clickElement(page, `body > nav > a:nth-child(${day}) > span.page-nav__day-week`);
    await clickElement(page, "[data-seance-id='156']");
    const button = await page.$eval(".acceptin-button",(el) => el.disabled
    );
    expect(button).toEqual(true);
  }, 30000);
})

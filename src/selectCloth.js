import { openBrowser } from "./openBrowser.js";

const color = 1 //顏色
const size = 3  //尺寸
const num = 1  //數量

const selectCloth = async () => {
    const [page, browser] = await openBrowser(clothUrl)
}

const delay = (milliseconds) => new Promise((resolve) => setTimeout(resolve, milliseconds));

export const autoSelectCloth = async (page) => {
    
    //顏色
    await page.click(`.Variation-container > div:nth-child(${color})`)

    //尺寸
    await page.click(`.variation-label-select__label-container > div:nth-child(${size})`)

    delay(500)

    //數量
    let searchInput = await page.$('.input-group > input');
    await searchInput.press('Backspace')
    await page.type('.input-group > input', `${num}`)

    //立即購買按鈕，等待browser loading ...
    //await page.click('.btn-buy-now')

    await Promise.all([page.click('.btn-buy-now'), page.waitForNavigation({waitUntil:'networkidle2'})])

}
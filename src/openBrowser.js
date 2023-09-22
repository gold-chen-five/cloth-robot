import puppeteer from "puppeteer"

export const openBrowser = async (url) => {
    // 開啟網頁
    const browser = await puppeteer.launch({userDataDir: '../tmp/myChromeSession',headless: false})
    const page = await browser.newPage()
    await page.goto(url)
  
    // Set screen size
    await page.setViewport({width: 1920, height: 1080})
  
    return [page, browser]
}
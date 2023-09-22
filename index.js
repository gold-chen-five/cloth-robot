import puppeteer from "puppeteer"
import * as cheerio from 'cheerio';
import fs from 'fs'

const signinUrl = 'https://www.shop.outdoorman.co/users/sign_in'
const clothUrl = 'https://www.shop.outdoorman.co/products/good-on-gost701' //網址
const email = 'e8715565@gmail.com'
const password = 'pig12345'
const color = 1 //顏色
const size = 2  //尺寸
const num = 1  //數量

const openBrowser = async() => {
  // 開啟網頁
  const browser = await puppeteer.launch({headless: false})
  const page = await browser.newPage()
  await page.goto(clothUrl)

  // Set screen size
  await page.setViewport({width: 1920, height: 1080})

  return [page, browser]
}

const signinPage = async (page) => {
  await page.type('#field-1', `${email}`)
  await page.type('#field-2', `${password}`)
  //await page.click('.chakra-button')
  await Promise.all([page.click('.chakra-button'), page.waitForNavigation({waitUntil:'networkidle2'})])
}

const getCookie = async (page) => {
  const cookies = await page.cookies('https://www.shop.outdoorman.co');
  const cookieJson = JSON.stringify(cookies, null, 2);
  fs.writeFileSync('./cookies.json', cookieJson);
}

const setCookie = async (page) => {
  const cookieJson = fs.readFileSync('./cookies.json');
  const cookies = JSON.parse(cookieJson);
  
  await page.setCookie(...cookies);
}

const selectCloth = async (page) => {

  //顏色
  await page.click(`.Variation-container > div:nth-child(${color})`)

  //尺寸
  await page.click(`.variation-label-select__label-container > div:nth-child(${size})`)
  
  //數量
  let searchInput = await page.$('.input-group > input');
  await searchInput.press('Backspace')
  await page.type('.input-group > input', `${num}`)

  //立即購買按鈕
  //await page.click('.btn-buy-now')

  await Promise.all([page.click('.btn-buy-now'), page.waitForNavigation({waitUntil:'networkidle2'})])

}

const checkOut = async (page) => {
  await page.waitForNavigation({waitUntil:'networkidle2'})
  //page.click('#checkout_button')
}

const main = async () => {
  const [page, browser] = await openBrowser()
  await selectCloth(page)
  await signinPage(page)
  

  //browser.close()
  //await checkOut(page)
  //
  //getCookie(page)
}

main()

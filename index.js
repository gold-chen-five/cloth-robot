import fs from 'fs'
import { openBrowser } from "./src/openBrowser.js";
import { autoSelectCloth } from './src/selectCloth.js';

const cartUrl = 'https://www.shop.outdoorman.co/cart'
const checkoutUrl = 'https://www.shop.outdoorman.co/checkout'
const clothUrl = 'https://www.shop.outdoorman.co/products/good-on-gost701'

const checkOut = async (page) => {
  await page.goto(checkoutUrl)
}

const paymentSelect = async (page) => {
  await page.select('#order-payment-method','620c6cd96c09c1002c52ec0c')
}

//提交
const submitBtn = async (page) => {
  //const r = await page.$('#place-order-recaptcha')
  await page.click('#place-order-recaptcha')
  //console.log(r)
}

const main = async () => {
  const [page, browser] = await openBrowser(clothUrl)
  await autoSelectCloth(page)
  await paymentSelect(page)
  await checkOut(page)
  submitBtn(page)
}

main()

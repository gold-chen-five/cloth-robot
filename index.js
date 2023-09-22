import fs from 'fs'
import { openBrowser } from "./src/openBrowser.js";
import { autoSelectCloth } from './src/selectCloth.js';

const cartUrl = 'https://www.shop.outdoorman.co/cart'
const checkoutUrl = 'https://www.shop.outdoorman.co/checkout'
const clothUrl = 'https://www.shop.outdoorman.co/products/good-on-gost701'
//const clothUrl = 'https://www.shop.outdoorman.co/products/goopimade-fd-g4'

const checkOut = async (page) => {
  await page.goto(checkoutUrl)
}

const paymentSelect = async (page) => {
  await page.select('#order-payment-method','620c6cd96c09c1002c52ec0c')
}

const ageInput = async (page) => {
  await page.click('.control-label > input')
}

//提交
const submitBtn = async (page) => {
  await page.click('#place-order-recaptcha')
}

const main = async () => {
  const [page, browser] = await openBrowser(clothUrl)
  await autoSelectCloth(page)
  await paymentSelect(page)
  await checkOut(page)
  await ageInput(page)
  await submitBtn(page)
}

main()

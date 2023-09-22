import { openBrowser } from "./openBrowser.js"

const signinUrl = 'https://www.shop.outdoorman.co/users/sign_in'
const email = 'e8715565@gmail.com'
const password = 'pig12345'

const signin = async (page) => {
    await page.type('#field-1', `${email}`)
    await page.type('#field-2', `${password}`)
    //await page.click('.chakra-button')
    //await Promise.all([page.click('.chakra-button'), page.waitForNavigation({waitUntil:'networkidle2'})])
}

const login = async () => {
    const [ page, browser ] = await openBrowser(signinUrl)
    await signin(page)

}

login()
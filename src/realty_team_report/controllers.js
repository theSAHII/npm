"use strict"

const ejs = require("ejs"),
    Cryptr = require("cryptr"),
    CONFIG = require("./config"),
    cryptr = new Cryptr(CONFIG.cookie.secretKey),
    { getRange, setRange, appendData } = require("./lib/googleapis"),
    { validateToken } = require("./lib/firebaseAuth")


// page
function loginPage(req, res, next) {
    ejs.renderFile("./pages/login.ejs", (err, str) => res.send(str).end())
}

function dashboard(req, res, next) {

    if (!req.cookies.token) res.redirect("/")
    let email = cryptr.decrypt(req.cookies.token)
    if (!CONFIG.users[email]) res.redirect("/")

    ejs.renderFile("./pages/dashboard.ejs", {
        admin: ((CONFIG.users[email]).type == "admin") ? true : false,
        username: (CONFIG.users[email]).name
    }, (err, str) => {
        if (err) {
            res.status(404).end()
            return
        }
        res.send(str).end()
    })
}

// AUTH
async function auth(req, res, next) {
    await validateToken(req.body.idToken)
        .then(result => {

            let { name, email, email_verified } = result
            if (!email_verified || !CONFIG.users[email]) res.redirect("/")

            let encryptedCookie = cryptr.encrypt(email)

            req.cookies.token = `${encryptedCookie}`
            res.cookie("token", `${encryptedCookie}`, {
                expires: new Date(Date.now() + 12 * 60 * 60 * 1000),
                path: './*',
            })

            res.redirect(`/${(CONFIG.users[email]).type}`)
        })
}
// 

// GOOGLE SHEET API
async function getDataForAdmin(req, res, next) {
    res.json(await getRange("Data")).end()
}

async function getDataForUser(req, res, next) {
    let name = req.params.username,
        data = await getRange("Data")

    data = data.filter((item, index) => {
        let nameMatches = (item[4]).toUpperCase() == name.toUpperCase()
        if (nameMatches || index == 0) {
            return item
        }
    })
    res.json(data).end()
}

function updateStatus(req, res, next) {
    // console.log(req.body)
    setRange(`Data!I${req.body.id}`, [[req.body.status]])
        .then(result => {
            res.send(result).end()
        })
}

async function addData(req, res, next) {

    let lastID = parseInt(((await getRange("CONST!B1"))[0])[0]),
        newID = lastID + 1,
        now = new Date()

    res.json(
        await appendData(`Data!A${newID}:I${newID}`, [[
            newID,
            now.getDate(),
            now.getMonth() + 1,
            now.getFullYear(),
            req.body.username,
            req.body.visits,
            req.body.bookings,
            req.body.value,
            0
        ]])
            .then(result => {
                return { result, newID }
            })
    ).end()
}
// 

module.exports = {
    loginPage,
    dashboard,
    auth,
    getDataForAdmin,
    getDataForUser,
    updateStatus,
    addData
}

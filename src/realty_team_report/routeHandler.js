"use strict"

const express = require("express"),
    route = express.Router(),
    ejs = require("ejs"),
    CONTROLLER = require("./controllers")

route
    .get("/", CONTROLLER.loginPage)
    .get("/:type", CONTROLLER.dashboard)

    .post("/validateUser", CONTROLLER.auth)

    .get("/api/admin", CONTROLLER.getDataForAdmin)
    .get("/api/user/:username", CONTROLLER.getDataForUser)

    .post("/api/admin", CONTROLLER.updateStatus)
    .post("/form", CONTROLLER.addData)


route.use(function (req, res, next) {
    res.status(404);

    if (req.accepts('html'))    // respond with html page
        ejs.renderFile("./pages/404.ejs", (err, str) => res.send(str))
    else if (req.accepts('json'))   // respond with json
        res.json({ error: 'Not found' })
    else    // default to plain-text. send()
        res.type('txt').send('Not found')
    return
});


module.exports = route

"use strict"

console.clear()

const express = require("express"),
    app = express(),
    cors = require("cors"),
    cookieParser = require("cookie-parser")

const router = require("./routeHandler")

app
    .set("view engine", "ejs")
    .use(express.static("./public"))
    .use(cors())
    .use(express.json())
    .use(express.urlencoded({ extended: true }))
    .use(cookieParser())
    .use(router)

app.listen(4500)


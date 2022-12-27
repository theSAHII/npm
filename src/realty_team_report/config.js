"use strict"

const CONFIG = {
    users: {
        "infinityknight024@gmail.com": {
            type: "admin",
            name: "SIRU"
        },
        "dharm@sahii.com": {
            type: "admin",
            name: "SIRU"
        }
    },
    cookie: {
        secretKey: "Firefly"
    }
}

module.exports = {
    CONFIG,
    ...CONFIG
}

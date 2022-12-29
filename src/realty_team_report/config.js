"use strict"

const CONFIG = {
    users: {
        "infinityknight024@gmail.com": {
            type: "user",
            name: "SIRU"
        },
        "it@sahii.com": {
            type: "admin",
            name: "IT"
        },
        "dharm@sahii.com": {
            type: "admin",
            name: "DHARMENDAR"
        },
        "inam@sahii.com": {
            type: "user",
            name: "INAM"
        },
        "jyoti@sahii.com": {
            type: "user",
            name: "JYOTI"
        },
        "ahesan@sahii.com": {
            type: "user",
            name: "AHESAN"
        },
        "ruksar@sahii.com": {
            type: "user",
            name: "RUKSAR"
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

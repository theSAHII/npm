"use strict"

const { join } = require("path")

const admin = require("firebase-admin"),
    serviceAccount = require(join(__dirname, "./auth-a6787-firebase-adminsdk.json"));

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://auth-a6787-default-rtdb.firebaseio.com"
});

async function validateToken(token) {
    return await admin.auth().verifyIdToken(token)
        .then(response => {
            let { name, email, email_verified } = response
            return { name, email, email_verified }
        })
}

module.exports = {
    validateToken
}

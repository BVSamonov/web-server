import express from "express";
// import { usersRouter } from "../routers/users/index.js"

const PORT = 9000;
const app = express();

/**
 * * Simple code
 * ------------------------------------------- */

/**
 * * This is middleware. It allows to distribute logic between different methods
 *
// const callback = (res, req, next) => {
// 	console.log("This is middleware. It was executing before logic of GET method")

// 	next()
// }

// app.all("/hello", (req, res, next) => {
// 	// This is the all method, which allows to set some logic before GET(/hello)
// 	console.log("This is the all method, which executed before next method GET")

// 	// This is next method which allows to start next method
// 	next()
// })

/**
 * * Notes
 *
 * * We can pass the regExp or multiple form of string like path
 * * Examples:
 *
 * * /hel?lo - optional symbol, valid strings like - hello, helo
 * * /hel+lo - an unlimited amount of symbols between l и l, valid strings like hello, hellllllo
 * * /hel*lo - an unlimited amount of symbols between l и l, valid strings like hello, helfsfsf--42lo
 * * /he(ll)?o - This records allow to handle groups
 */
// app.get("/hel*lo", callback, (req, res) => {
// 	res.send("Hello!")
// })

/** Router
 * -------------------------------------------------- */

// app.use("/users", usersRouter)

// app.listen(PORT, () => {
// 	console.log(`Server started at the http://localhost:${PORT}`)
// })

const dotenv = require("dotenv")

dotenv.config()

const express = require("express")
const cors = require("cors")
const routes = require("./src/routes/index")

const app = express()

app.use(express.urlencoded({extended: false}))
app.use(express.json())
app.use(cors({origin: "*"}))

app.use(routes)

app.get("/", (req, res) => {
    res.status(200).json({
        message: "Unofficial Manhwalist APIs",
        developed_by: "ZeroneDoo",
        github: "https://github.com/ZeroneDoo",
        data: {
            manhwalist_url:"https://manhwalist.xyz/"
        }
    })
})

module.exports = app
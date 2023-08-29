const dotenv = require("dotenv")

dotenv.config()

const express = require("express")
const cors = require("cors")
const routes = require("./src/routes/index")
const morgan = require("morgan")

const app = express()

app.use(express.urlencoded({extended: false}))
app.use(express.json())
app.use(morgan('tiny'))
app.use(cors({origin: "*"}))

app.use(routes)

app.get("/", (req, res) => {
    res.status(200).json({
        message: "Unofficial Manhwalist & Komiku APIs",
        developed_by: "ZeroneDoo",
        github: "https://github.com/ZeroneDoo",
        data: {
            manhwalist_url:"https://manhwalist.xyz/",
            komiku_url:"https://komiku.com/",
        }
    })
})

module.exports = app
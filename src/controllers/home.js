const axios = require("axios")
const {
    scrapePopular,
    scrapeProjectUpdate,
    scrapeLatestUpdate,
    scrapeDetailComic,
    scrapeGenres,
    scrapeDetailGenre,
    scrapeChapters,
    scrapeSearch
} = require("../scrappers/home")

const popularToday = async (req, res) => {
    try {
        const axiosRequest = await axios.get(`${process.env.MANHWALIST_URL}`, {
            headers: {
                'User-Agent': "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Safari/537.36",
                "Referer": 'https://manhwalist.xyz/?__cf_chl_tk=.ePvKp.KzPYFZS8l5b53JE5sz.3rvcA1JYbWUhwHOP8-1692319596-0-gaNycGzNCns'
            }
        })

        const datas = await scrapePopular(req, axiosRequest)

        res.status(200).json({
            message: "success",
            datas: datas
        })
    } catch (e) {
        console.log(e)

        res.json({
            message: `Error: ${e}` 
        })
    }
}

const projectUpdate = async (req, res) => {
    try {
        const axiosRequest = await axios.get(`${process.env.MANHWALIST_URL}`)
        
        const datas = await scrapeProjectUpdate(req, axiosRequest)

        res.status(200).json({
            message:"success",
            datas: datas
        })
    } catch (e) {
        console.log(e)

        res.json({
            message: `Error: ${e}` 
        })
    }
}

const latestUpdate = async (req, res) => {
    try {
        const axiosRequest = await axios.get(`${process.env.MANHWALIST_URL}`)
        
        const datas = await scrapeLatestUpdate(req, axiosRequest)

        res.status(200).json({
            message:"success",
            datas: datas
        })
    } catch (e) {
        console.log(e)

        res.json({
            message: `Error: ${e}` 
        })
    }
}

const detailComic = async (req, res) => {
    try {
        const { endpoint } = req.params

        if(!endpoint) return res.json({ message: "Endpoint \"/manga/:endpoint\" cant null" })

        const axiosRequest = await axios.get(`${process.env.MANHWALIST_URL}/manga/${endpoint}`)

        const data = await scrapeDetailComic({ endpoint }, axiosRequest)

        res.status(200).json({
            message: "success",
            data
        })
    } catch (e) {
        console.log(e)

        res.json({
            message: `Error: ${e}` 
        })
    }
}

const genres = async (req, res) => {
    try {
        const axiosRequest = await axios.get(`${process.env.MANHWALIST_URL}/genre`)

        const datas = await scrapeGenres(req, axiosRequest)

        res.status(200).json({
            message:"success",
            datas
        })
    } catch (e) {
        console.log(e)

        res.json({
            message: `Error: ${e}` 
        })
    }
}

const detailGenre = async (req, res) => {
    try {
        const { endpoint } = req.params
        const { page = 1 } = req.query

        const axiosRequest = await axios.get(`${process.env.MANHWALIST_URL}/genres/${endpoint}/page/${page}`)

        const datas = await scrapeDetailGenre({ endpoint, page }, axiosRequest)
        
        res.status(200).json(datas)
    } catch (e) {
        console.log(e)

        res.json({
            message: `Error: ${e}` 
        })
    }
}

const chapters = async (req, res) => {
    try {
        const { endpoint } = req.params

        const axiosRequest = await axios.get(`${process.env.MANHWALIST_URL}/${endpoint}`)

        const data = await scrapeChapters({ endpoint }, axiosRequest)

        res.status(200).json(data)
    } catch (e) {
        console.log(e)

        res.json({
            message: `Error: ${e}` 
        })
    }
}

const search = async (req, res) => {
    try {
        const { query, page = 1 } = req.query

        const axiosRequest = await axios.get(`${process.env.MANHWALIST_URL}/page/${page}?s=${query}`)
        
        const datas = await scrapeSearch({ query, page }, axiosRequest)

        res.status(200).json({ 
            message: "success",
            keyword: query,
            page: parseInt(page),
            datas
        })
    } catch (e) {
        console.log(e)

        res.json({
            message: `Error: ${e}` 
        })
    }
}

module.exports = {
    popularToday,
    projectUpdate,
    latestUpdate,
    detailComic,
    genres,
    detailGenre,
    chapters,
    search
}
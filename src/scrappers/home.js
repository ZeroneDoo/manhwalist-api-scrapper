const axios = require("axios")
const cheerio = require("cheerio")
const { PopularToday, ProjectUpdate, LatestUpdate } = require("../util")

const scrapePopular = async (req, res) => {
    const $ = cheerio.load(res.data)
    const datas = []

    $("div.mainholder > div#content")
    .find("div.wrapper > div.hotslid > div.bixbox.hothome.full > div.listupd > div.bs ")
    .each((i, e) => {
        const dataObject = {}

        const parent = $(e).find("div.bsx")

        const title = $(parent).find("a").attr("title")
        const newestChapter = $(parent).find("a > div.bigor > div.adds > div.epxs").text() 
        const thumbnail = $(parent).find("div.limit > img").attr("src")
        const linkEndpoint = $(parent).find("a").attr("href")
        const endpoint = linkEndpoint.substring(linkEndpoint.indexOf("/manga/") + 7, linkEndpoint.length)

        dataObject.title = title
        dataObject.newest_chapter = newestChapter
        dataObject.thumbnail = thumbnail
        dataObject.endpoint = endpoint
        
        datas.push(dataObject)
    })

    return datas
}

const scrapeProjectUpdate = async (req, res) => {
    const $ = cheerio.load(res.data)
    const datas = []

    const wrap = $("div.mainholder > div#content")
    .find("div.wrapper > div.postbody > div.bixbox")[0]

    $(wrap)
    .find("div.listupd > div.bs.styletere.stylefiv")
    .each((i, e) => {
        const dataObject = {}
        dataObject.title = null
        dataObject.thumbnail = null
        dataObject.endpoint = null
        dataObject.chapters = []

        const title = $(e).find("div.bsx > a").attr("title")
        const thumbnail = $(e).find("div.bsx > a > div.limit > img").attr("src")
        const linkEndpoint = $(e).find("div.bsx > a").attr("href")
        const endpoint = linkEndpoint.substring(linkEndpoint.indexOf("/manga/") + 7, linkEndpoint.length)
        
        dataObject.title = title
        dataObject.thumbnail = thumbnail
        dataObject.endpoint = endpoint
        
        $(e)
        .find("div.bsx > div.bigor")
        .find("ul.chfiv > li")
        .each((i, e2) => {
            const linkEndpoint = $(e2).find("li > a").attr("href")
            
            dataObject.chapters.push({
                title: $(e2).find("a").text(),
                endpoint: linkEndpoint.substring(linkEndpoint.indexOf(`${process.env.MANHWALIST_URL}/`) + process.env.MANHWALIST_URL.length + 1, linkEndpoint.length),
                updated_at: $(e2).find("li > span").text(),
            })
        })

        datas.push(dataObject)
    })

    return datas
}

const scrapeLatestUpdate = async (req, res) => {
    const $ = cheerio.load(res.data)
    const datas = []

    const wrap = $("div.mainholder > div#content")
    .find("div.wrapper > div.postbody > div.bixbox")[1]

    $(wrap)
    .find("div.listupd > div.bs.styletere.stylefiv")
    .each((i, e) => {
        const dataObject = {}
        dataObject.title = null
        dataObject.thumbnail = null
        dataObject.endpoint = null
        dataObject.chapters = []

        const title = $(e).find("div.bsx > a").attr("title")
        const thumbnail = $(e).find("div.bsx > a > div.limit > img").attr("src")
        const linkEndpoint = $(e).find("div.bsx > a").attr("href")
        const endpoint = linkEndpoint.substring(linkEndpoint.indexOf("/manga/") + 7, linkEndpoint.length)
        
        dataObject.title = title
        dataObject.thumbnail = thumbnail
        dataObject.endpoint = endpoint

        $(e)
        .find("div.bsx > div.bigor")
        .find("ul.chfiv > li")
        .each((i, e2) => {
            const linkEndpoint = $(e2).find("li > a").attr("href")
            
            dataObject.chapters.push({
                title: $(e2).find("a").text(),
                endpoint: linkEndpoint.substring(linkEndpoint.indexOf(`${process.env.MANHWALIST_URL}/`) + process.env.MANHWALIST_URL.length + 1, linkEndpoint.length),
                updated_at: $(e2).find("li > span").text(),
            })
        })

        datas.push(dataObject)
    })

    return datas
}

const scrapeDetailComic = async (req, res) => {
    const { endpoint } = req
    const $ = cheerio.load(res.data)
    const data = {}
    data.title = null
    data.endpoint = null
    data.thumbnail = null
    data.title_alt = null
    data.synopsis = null
    data.status = null
    data.type = null
    data.released = null
    // data.author = null
    // data.artist = null
    data.updated_at = null
    data.genres = []
    data.chapter_list = []

    const parent = $("div.mainholder > div#content > div.wrapper > div.postbody.full > article > div.main-info")

    const left = $(parent).find("div.info-left > div.info-left-margin")
    const title = $(left).find("div.thumb > img").attr("title")
    const thumbnail = $(left).find("div.thumb > img").attr("src")

    const detailLeft = $(left).find("div.tsinfo.bixbox > div.imptdt")
    const status = $(detailLeft[0]).find("i").text()
    const type = $(detailLeft[1]).find("a").text()
    const released = $(detailLeft[2]).find("i").text()
    // const author = $(detailLeft[3]).find("i").text()
    // const artist = $(detailLeft[4]).find("i").text()
    const updated_at = $(detailLeft[detailLeft.length - 1]).find("i > time").text()

    const rigth = $(parent).find("div.info-right")
    const titleAlt = $(rigth).find("div.info-desc.bixbox > div#titledesktop > div#titlemove > span").text()
    const synopsis = $(rigth).find("div.info-desc.bixbox > div.wd-full > div.entry-content.entry-content-single > p").text()

    data.title = title
    data.endpoint = endpoint
    data.thumbnail = thumbnail
    data.title_alt = titleAlt
    data.synopsis = synopsis
    data.status = status
    data.type = type
    data.released = released
    // data.author = author
    // data.artist = artist
    data.updated_at = updated_at

    // genres
    $(rigth)
    .find("div.info-desc.bixbox > div.wd-full > span.mgen > a")
    .each((i, e) => {
        const linkEndpoint = $(e).attr("href")
        data.genres.push({
            title: $(e).text(),
            endpoint: linkEndpoint.substring(linkEndpoint.indexOf("/genres/") + 8, linkEndpoint.length)
        })
    })

    // chapterList 
    $(rigth)
    .find("div.bixbox.bxcl.epcheck > div#chapterlist > ul > li")
    .each((i, e) => {
        const linkEndpoint = $(e).find("div.chbox > div.eph-num > a").attr("href")
        data.chapter_list.push({
            title: $(e).find("div.chbox > div.eph-num > a > span.chapternum").text(),
            data_index: $(e).attr("data-num"),
            endpoint: linkEndpoint.substring(linkEndpoint.indexOf(process.env.MANHWALIST_URL) + process.env.MANHWALIST_URL.length + 1, linkEndpoint.length),
            updated_at: $(e).find("div.chbox > div.eph-num > a > span.chapterdate").text()
        })
    })

    return data
}

const scrapeGenres = async (req, res) => {
    const $ = cheerio.load(res.data)
    const datas = []

    $("div.mainholder > div#content > div.wrapper > div.postbody > div.bixbox > div.page > ul > li")
    .each((i, e) => {
        const dataObject = {}

        const title = $(e).find("a > span").text()
        const linkEndpoint = $(e).find("a").attr("href")
        const endpoint = linkEndpoint.substring(linkEndpoint.indexOf("/genres/") + 8, linkEndpoint.length)
        const count = parseInt($(e).find("a > i").text())
        
        dataObject.title = title
        dataObject.endpoint = endpoint
        dataObject.count = count

        datas.push(dataObject)
    })

    return datas
}

const scrapeDetailGenre = async (req, res) => {
    const { endpoint, page } = req
    const $ = cheerio.load(res.data)
    const dataGenre = {}
    const datas = []

    const parent = $("div.mainholder > div#content > div.wrapper > div.postbody.full > div.bixbox")
    const titleGenre = $(parent).find("div.releases > h1").text()

    dataGenre.title_genre = titleGenre
    dataGenre.endpoint = endpoint
    dataGenre.page = parseInt(page)

    $(parent)
    .find("div.listupd > div.bs > div.bsx > a")
    .each((i, e) => {
        const dataObject = {}

        const title = $(e).attr('title')
        const thumbnail = $(e).find("div.limit > img").attr("src")
        const linkEndpoint = $(e).attr("href")
        const endpoint = linkEndpoint.substring(linkEndpoint.indexOf("/manga/") + 7, linkEndpoint.length)
        const newestChapter = $(e).find("div.bigor > div.adds > div.epxs").text()

        dataObject.title = title
        dataObject.thumbnail = thumbnail
        dataObject.newest_chapter = newestChapter
        dataObject.endpoint = endpoint

        datas.push(dataObject)
    })

    dataGenre.datas = datas

    return dataGenre
    
}

const scrapeChapters = async (req, res) => {
    const { endpoint } = req
    const $ = cheerio.load(res.data)
    const dataChapter = {}
    const datas = []

    const parent = $("div.mainholder > div#content > div.wrapper > div.chapterbody > div.postarea > article")
    const title = $(parent).find("div.headpost > h1").text()
    const titleComic = $(parent).find("div.headpost > div.allc > a").text()
    const linkEndpointComic = $(parent).find("div.headpost > div.allc > a").attr("href")
    const endpointComic = linkEndpointComic.substring(linkEndpointComic.indexOf("/manga/") + 7, linkEndpointComic.length)
    const audio = $(parent).find("div.entry-content.entry-content-single.maincontent > div.kln > audio > source").attr("src")

    dataChapter.title = title
    dataChapter.title_comic = titleComic 
    dataChapter.endpoint_comic = endpointComic
    dataChapter.audio = audio || null 
    
    const noscript = $(parent).find("div.entry-content.entry-content-single.maincontent > div#readerarea > noscript").html()

    const noscript$ = cheerio.load(noscript) // change content from noscript to cheerio
    
    noscript$("img[decoding='async']") // search tag img with attribute decoding
    .each((i, e) => {
        datas.push({
            src: $(e).attr("src")
        })
    })

    dataChapter.datas = datas

    return dataChapter
}

const scrapeSearch = async (req, res) => {
    const { query, page } = req
    const $ = cheerio.load(res.data)
    const datas = []

    const parent = $("div.mainholder > div#content > div.wrapper > div.postbody > div.bixbox")

    $(parent)
    .find("div.listupd > div.bs > div.bsx")
    .each((i, e) => {
        const dataObject = {}

        const title = $(e).find("a").attr("title")
        const newestChapter = $(e).find("a > div.bigor > div.adds > div.epxs").text()
        const thumbnail = $(e).find("a > div.limit > img").attr("src")
        const linkEndpoint = $(e).find("a").attr("href")
        const endpoint = linkEndpoint.substring(linkEndpoint.indexOf("/manga/") + 7, linkEndpoint.length)

        dataObject.title = title
        dataObject.newest_chapter = newestChapter
        dataObject.thumbnail = thumbnail
        dataObject.endpoint = endpoint

        datas.push(dataObject)
    })

    return datas
}
module.exports = {
    scrapePopular,
    scrapeProjectUpdate,
    scrapeLatestUpdate,
    scrapeDetailComic,
    scrapeGenres,
    scrapeDetailGenre,
    scrapeChapters,
    scrapeSearch
}
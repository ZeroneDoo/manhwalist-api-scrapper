const { Router } = require("express")

const {
    popularToday,
    projectUpdate,
    latestUpdate,
    detailComic,
    genres,
    detailGenre,
    chapters,
    search
} = require("../controllers/home")

const router = Router()

// manhwalist
router.get("/manhwalist/home", popularToday)
router.get("/manhwalist/home/project-update", projectUpdate)
router.get("/manhwalist/home/latest-update", latestUpdate)
router.get("/manhwalist/manga/:endpoint", detailComic)
router.get("/manhwalist/genres", genres)
router.get("/manhwalist/genres/:endpoint", detailGenre)
router.get("/manhwalist/chapter/:endpoint", chapters)
router.get("/manhwalist/search", search)


module.exports = router
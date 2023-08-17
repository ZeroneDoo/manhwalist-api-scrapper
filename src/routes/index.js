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

router.get("/home", popularToday)
router.get("/home/project-update", projectUpdate)
router.get("/home/latest-update", latestUpdate)
router.get("/manga/:endpoint", detailComic)
router.get("/genres", genres)
router.get("/genres/:endpoint", detailGenre)
router.get("/chapter/:endpoint", chapters)
router.get("/search", search)

module.exports = router
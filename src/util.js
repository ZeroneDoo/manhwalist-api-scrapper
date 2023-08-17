const PopularToday = {
    title: null,
    newest_chapter: null,
    thumbnail: null,
    endpoint:null
}

const ProjectUpdate = {
    title: null,
    thumbnail: null,
    endpoint: null,
    chapters: [
        {
            chapter: null,
            updated_at: null
        }
    ]
}

const LatestUpdate = {
    title: null,
    thumb: null,
    endpoint: null,
    chapters: [
        {
            chapter: null,
            updated_at: null
        }
    ]
}

const Genres = {
    title: null,
    endpoint: null
}

const DetailComic = {
    title: null,
    thumbnail: null,
    alt_title: null,
    synopsis: null,
    status: null,
    type: null,
    released: null,
    author: null,
    updated_at: null,
    genres: [],
    chapter_list:[
        {
            title: null,
            endpoint: null,
            created_at: null
        }
    ]
} 

const Chapters = {
    title: null,
    title_comic: null,
    audio:null,
    images: [
        {
            index: null,
            src: null
        }
    ]
}

module.exports = {
    PopularToday,
    ProjectUpdate,
    LatestUpdate,
    Genres,
    DetailComic,
    Chapters
}
import {csnaCrawlSongService as crawlSongService} from '../../../services/default'

export default {
    namespaced: true,
    state: () => ({
        crawlSongs: [],
        crawlSong: {},
    }),
    getters: {
        crawlSongs: state => state.crawlSongs,
        crawlSong: state => state.crawlSong,
    },
    mutations: {
        setCrawlUrl(state, {crawlSong}) {
            state.crawlSong = crawlSong
        },
    },
    actions: {
        search({state}, {params, doneCallback, errorCallback, alwaysCallback}) {
            crawlSongService().index(params, (data) => {
                state.crawlSongs = data.models
                doneCallback(data.pagination)
            }, errorCallback, alwaysCallback)
        },

        export(store, {params, doneCallback, errorCallback, alwaysCallback}) {
            crawlSongService().export(params, doneCallback, errorCallback, alwaysCallback)
        },

        import(store, {file, doneCallback, errorCallback, alwaysCallback}) {
            crawlSongService().import(file, doneCallback, errorCallback, alwaysCallback)
        },

        create({state}, {params, doneCallback, errorCallback, alwaysCallback}) {
            crawlSongService().store(params, (data) => {
                state.crawlSong = data.model
                doneCallback(data)
            }, errorCallback, alwaysCallback)
        },

        getById({state}, {id, doneCallback, errorCallback, alwaysCallback}) {
            if (state.crawlSong.id && state.crawlSong.id == id) {
                doneCallback()
                return
            }
            crawlSongService().show(id, (data) => {
                state.crawlSong = data.model
                doneCallback()
            }, errorCallback, alwaysCallback)
        },

        edit({state}, {id, params, doneCallback, errorCallback, alwaysCallback}) {
            crawlSongService().update(id, params, (data) => {
                state.crawlSong = data.model
                doneCallback()
            }, errorCallback, alwaysCallback)
        },

        delete(store, {ids, doneCallback, errorCallback, alwaysCallback}) {
            crawlSongService().bulkDestroy(ids, {}, doneCallback, errorCallback, alwaysCallback)
        },

        destruct({state}) {
            state.crawlSongs = []
            state.crawlSong = {}
        },
    },
}

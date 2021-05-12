import {csnaCrawlFileService as crawlFileService} from '../../../services/default'

export default {
    namespaced: true,
    state: () => ({
        crawlFiles: [],
        crawlFile: {},
    }),
    getters: {
        crawlFiles: state => state.crawlFiles,
        crawlFile: state => state.crawlFile,
    },
    mutations: {
        setCrawlUrl(state, {crawlFile}) {
            state.crawlFile = crawlFile
        },
    },
    actions: {
        search({state}, {params, doneCallback, errorCallback, alwaysCallback}) {
            crawlFileService().index(params, (data) => {
                state.crawlFiles = data.models
                doneCallback(data.pagination)
            }, errorCallback, alwaysCallback)
        },

        export(store, {params, doneCallback, errorCallback, alwaysCallback}) {
            crawlFileService().export(params, doneCallback, errorCallback, alwaysCallback)
        },

        import(store, {file, doneCallback, errorCallback, alwaysCallback}) {
            crawlFileService().import(file, doneCallback, errorCallback, alwaysCallback)
        },

        create({state}, {params, doneCallback, errorCallback, alwaysCallback}) {
            crawlFileService().store(params, (data) => {
                state.crawlFile = data.model
                doneCallback(data)
            }, errorCallback, alwaysCallback)
        },

        getById({state}, {id, doneCallback, errorCallback, alwaysCallback}) {
            if (state.crawlFile.id && state.crawlFile.id == id) {
                doneCallback()
                return
            }
            crawlFileService().show(id, (data) => {
                state.crawlFile = data.model
                doneCallback()
            }, errorCallback, alwaysCallback)
        },

        edit({state}, {id, params, doneCallback, errorCallback, alwaysCallback}) {
            crawlFileService().update(id, params, (data) => {
                state.crawlFile = data.model
                doneCallback()
            }, errorCallback, alwaysCallback)
        },

        delete(store, {ids, doneCallback, errorCallback, alwaysCallback}) {
            crawlFileService().bulkDestroy(ids, {}, doneCallback, errorCallback, alwaysCallback)
        },

        destruct({state}) {
            state.crawlFiles = []
            state.crawlFile = {}
        },
    },
}

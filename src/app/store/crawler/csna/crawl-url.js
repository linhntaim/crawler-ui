import {csnaCrawlUrlService as crawlUrlService} from '../../../services/default'

export default {
    namespaced: true,
    state: () => ({
        crawlUrls: [],
        crawlUrl: {},
    }),
    getters: {
        crawlUrls: state => state.crawlUrls,
        crawlUrl: state => state.crawlUrl,
    },
    mutations: {
        setCrawlUrl(state, {crawlUrl}) {
            state.crawlUrl = crawlUrl
        },
    },
    actions: {
        search({state}, {params, doneCallback, errorCallback, alwaysCallback}) {
            crawlUrlService().index(params, (data) => {
                state.crawlUrls = data.models
                doneCallback(data.pagination)
            }, errorCallback, alwaysCallback)
        },

        export(store, {params, doneCallback, errorCallback, alwaysCallback}) {
            crawlUrlService().export(params, doneCallback, errorCallback, alwaysCallback)
        },

        import(store, {file, doneCallback, errorCallback, alwaysCallback}) {
            crawlUrlService().import(file, doneCallback, errorCallback, alwaysCallback)
        },

        create({state}, {params, doneCallback, errorCallback, alwaysCallback}) {
            crawlUrlService().store(params, (data) => {
                state.crawlUrl = data.model
                doneCallback()
            }, errorCallback, alwaysCallback)
        },

        getById({state}, {id, doneCallback, errorCallback, alwaysCallback}) {
            if (state.crawlUrl.id && state.crawlUrl.id == id) {
                doneCallback()
                return
            }
            crawlUrlService().show(id, (data) => {
                state.crawlUrl = data.model
                doneCallback()
            }, errorCallback, alwaysCallback)
        },

        edit({state}, {id, params, doneCallback, errorCallback, alwaysCallback}) {
            crawlUrlService().update(id, params, (data) => {
                state.crawlUrl = data.model
                doneCallback()
            }, errorCallback, alwaysCallback)
        },

        delete(store, {ids, doneCallback, errorCallback, alwaysCallback}) {
            crawlUrlService().bulkDestroy(ids, {}, doneCallback, errorCallback, alwaysCallback)
        },

        destruct({state}) {
            state.crawlUrls = []
            state.crawlUrl = {}
        },
    },
}

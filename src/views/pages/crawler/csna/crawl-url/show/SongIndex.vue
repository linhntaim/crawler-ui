<template lang="pug">
    .card.shadow.mb-4
        .card-body.has-control
            .table-responsive
                table.table.table-bordered
                    thead
                        tr
                            th.text-center #
                            th {{ $t('pages._crawler._csna.artist') }}
                            th {{ $t('pages._crawler._csna.title') }}
                            th {{ $t('pages._crawler._csna.album') }}
                            th {{ $t('pages._crawler._csna.date') }}
                    tfoot
                        tr
                            th.text-center #
                            th {{ $t('pages._crawler._csna.artist') }}
                            th {{ $t('pages._crawler._csna.title') }}
                            th {{ $t('pages._crawler._csna.album') }}
                            th {{ $t('pages._crawler._csna.date') }}
                    tbody
                        tr(v-if="crawlSongs.length <= 0")
                            td.text-center.py-4.text-gray-500(colspan="5")
                                span(v-if="loading") {{ $t('actions.loading') }}
                                span(v-else) {{ $t('pages.no_items') }}
                        tr(v-for="(crawlSong, index) in crawlSongs")
                            td.text-center {{ paginator.pagination.items.from + index }}
                            td.nowrap {{ crawlSong.meta.artist }}
                            td.nowrap {{ crawlSong.meta.title }}
                            td.nowrap {{ crawlSong.meta.album }}
                            td.nowrap {{ crawlSong.meta.date }}
            .clearfix
                paginator-component(v-if="crawlSongs.length" :disabled="loading" :paginator="paginator" @pageChanged="searchByPaginator")
</template>

<script>
import {storeHandler} from '../../../../../../app/utils'
import {mapActions, mapGetters} from '@linhntaim/vue-uses'
import {DataPlot, Paginator} from '@linhntaim/vue-utils'
import {ITEMS_PER_PAGE_LIST} from '../../../../../../app/config'
import PaginatorComponent from '../../../../../components/Paginator'

export default {
    name: 'SongIndex',
    components: {PaginatorComponent},
    data() {
        return {
            loading: false,

            paginator: new Paginator(ITEMS_PER_PAGE_LIST, storeHandler),
            params: new DataPlot(),
        }
    },
    computed: {
        ...mapGetters({
            crawlUrl: 'csnaCrawlUrl/crawlUrl',
            crawlSongs: 'csnaCrawlSong/crawlSongs',
        }),
    },
    methods: {
        ...mapActions({
            crawlSongSearch: 'csnaCrawlSong/search',
        }),
        init() {
            this.searchByPaginator()
        },
        plotPaginator() {
            this.params.plot('paginator', {
                page: this.paginator.pagination.current,
                items_per_page: this.paginator.pagination.itemsPerPage,
            })
        },
        searchByPaginator() {
            this.plotPaginator()
            this.search()
        },
        ifPageEmpty() {
            if (this.crawlSongs.length <= 0) {
                if (this.paginator.pagination.current > 1) {
                    this.paginator.setPage(1)
                    this.searchByPaginator()
                    return true
                }
            }
            return false
        },
        search() {
            this.loading = true
            const params = this.params.data()
            params.from_crawl_url = this.crawlUrl.id
            this.crawlSongSearch({
                params: params,
                doneCallback: (pagination) => {
                    this.paginator.parsePagination(pagination)
                    if (!this.ifPageEmpty()) {
                        this.loading = false
                    }
                },
                errorCallback: err => {
                    this.loading = false
                    this.$bus.emit('error', {messages: err.getMessages(), extra: err.getExtra()})
                },
            })
        },
    },
}
</script>

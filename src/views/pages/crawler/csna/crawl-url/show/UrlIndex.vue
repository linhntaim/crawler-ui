<template lang="pug">
    .card.shadow.mb-4
        .card-body.has-control
            .btn-blocks.block-left
                button.btn.btn-success(:disabled="loading" @click="onExportClicked")
                    i.fas.fa-file-export.mr-2
                    | {{ $t('actions.export') }}
            .table-responsive
                table.table.table-bordered
                    thead
                        tr
                            th.text-center #
                            th URL
                            th.text-center {{ $t('pages._crawler._csna.status') }}
                            th.text-center {{ $t('actions.actions') }}
                    tfoot
                        tr
                            th.text-center #
                            th URL
                            th.text-center {{ $t('pages._crawler._csna.status') }}
                            th.text-center {{ $t('actions.actions') }}
                    tbody
                        tr(v-if="crawlUrls.length <= 0")
                            td.text-center.py-4.text-gray-500(colspan="4")
                                span(v-if="loading") {{ $t('actions.loading') }}
                                span(v-else) {{ $t('pages.no_items') }}
                        tr(v-for="(crawlUrl, index) in crawlUrls")
                            td.text-center {{ paginator.pagination.items.from + index }}
                            td.nowrap
                                a(:href="crawlUrl.url" target="_blank") {{ crawlUrl.url }}
                            td.text-center
                                crawl-url-status-badge(:status="crawlUrl.status")
                            td.text-center
                                button.btn.btn-link.btn-sm.nowrap(v-if="crawlUrl.status !== statusDefs.completed" :disabled="loading" @click.prevent="onCrawlClicked(crawlUrl)")
                                    | {{ $t('actions.crawl') }}
                                button.btn.btn-link.btn-sm.nowrap(v-else :disabled="loading" @click.prevent="onViewClicked(crawlUrl)")
                                    | {{ $t('actions.view') }}
            .clearfix
                paginator-component(v-if="crawlUrls.length" :disabled="loading" :paginator="paginator" @pageChanged="searchByPaginator")
</template>

<script>
import {storeHandler} from '../../../../../../app/utils'
import {mapActions, mapGetters, mapMutations} from '@linhntaim/vue-uses'
import {DataPlot, Paginator} from '@linhntaim/vue-utils'
import {CSNA_STATUS_DEF, ITEMS_PER_PAGE_LIST} from '../../../../../../app/config'
import CrawlUrlStatusBadge from '../CrawlUrlStatusBadge'
import PaginatorComponent from '../../../../../components/Paginator'

export default {
    name: 'UrlIndex',
    components: {CrawlUrlStatusBadge, PaginatorComponent},
    data() {
        return {
            loading: false,

            paginator: new Paginator(ITEMS_PER_PAGE_LIST, storeHandler),
            params: new DataPlot(),

            statusDefs: CSNA_STATUS_DEF,
        }
    },
    computed: {
        ...mapGetters({
            crawlUrl: 'csnaCrawlUrl/crawlUrl',
            crawlUrls: 'csnaCrawlUrl/crawlUrls',
        }),
    },
    methods: {
        ...mapMutations({
            crawlUrlSet: 'csnaCrawlUrl/setCrawlUrl',
        }),
        ...mapActions({
            crawlUrlSearch: 'csnaCrawlUrl/search',
            crawlUrlExport: 'csnaCrawlUrl/export',
            crawlUrlCreate: 'csnaCrawlUrl/create',
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
            if (this.crawlUrls.length <= 0) {
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
            this.crawlUrlSearch({
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
        onCrawlClicked(crawlUrl) {
            this.loading = true
            this.crawlUrlCreate({
                params: {
                    url: crawlUrl.url,
                },
                doneCallback: () => {
                    this.loading = false
                    this.$emit('crawled')
                },
                errorCallback: err => {
                    this.loading = false
                    this.$bus.emit('error', {messages: err.getMessages(), extra: err.getExtra()})
                },
            })
        },
        onViewClicked(crawlUrl) {
            this.crawlUrlSet({
                crawlUrl: crawlUrl,
            })
            this.$emit('viewed')
        },
        onExportClicked() {
            this.$bus.emit('export', {
                name: 'crawl_url_' + this.crawlUrl.id,
                exportCallback: (doneCallback, errorCallback) => this.crawlUrlExport({
                    params: this.params.data(),
                    doneCallback,
                    errorCallback,
                }),
            })
        },
    },
}
</script>

<template lang="pug">
    .card.shadow.mb-4
        .card-body.has-control
            .table-responsive
                table.table.table-bordered
                    thead
                        tr
                            th.text-center #
                            th URL
                    tfoot
                        tr
                            th.text-center #
                            th URL
                    tbody
                        tr(v-if="crawlFiles.length <= 0")
                            td.text-center.py-4.text-gray-500(colspan="3")
                                span(v-if="loading") {{ $t('actions.loading') }}
                                span(v-else) {{ $t('pages.no_items') }}
                        tr(v-for="(crawlFile, index) in crawlFiles")
                            td.text-center {{ paginator.pagination.items.from + index }}
                            td
                                a(:href="crawlFile.meta.file_url" target="_blank") {{ crawlFile.meta.file_url }}
            .clearfix
                paginator-component(v-if="crawlFiles.length" :disabled="loading" :paginator="paginator" @pageChanged="searchByPaginator")
</template>

<script>
import {storeHandler} from '../../../../../../app/utils'
import {mapActions, mapGetters} from '@linhntaim/vue-uses'
import {DataPlot, Paginator} from '@linhntaim/vue-utils'
import {ITEMS_PER_PAGE_LIST} from '../../../../../../app/config'
import PaginatorComponent from '../../../../../components/Paginator'

export default {
    name: 'FileIndex',
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
            crawlFiles: 'csnaCrawlFile/crawlFiles',
        }),
    },
    methods: {
        ...mapActions({
            crawlFileSearch: 'csnaCrawlFile/search',
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
            if (this.crawlFiles.length <= 0) {
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
            params.crawl_url = this.crawlUrl.id
            this.crawlFileSearch({
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

<template lang="pug">
    .row(v-if="!loading && crawlUrl.id")
        .col-12
            .card.shadow.mb-4
                .card-header.py-3
                    h6.m-0.font-weight-bold.text-primary
                        span.mr-2 Chiasenhac.vn
                        a(href="https://chiasenhac.vn" target="_blank")
                            i.fas.fa-external-link-square-alt
                .card-body.has-control
                    .form-group.row
                        label.col-form-label.col-md-4.col-lg-2 URL
                        .col-md-8.col-lg-10
                            .form-control-plaintext
                                a(:href="crawlUrl.url" target="_blank") {{ crawlUrl.url }}
                    .form-group.row
                        label.col-form-label.col-md-4.col-lg-2 {{ $t('pages._crawler._csna.status') }}
                        .col-md-8.col-lg-10
                            .form-control-plaintext
                                crawl-url-status-badge(:status="crawlUrl.status")
                    .form-group.row(v-if="crawlUrl.status === statusDefs.completed || crawlUrl.status === statusDefs.uncompleted")
                        label.col-form-label.col-md-4.col-lg-2 {{ $t('pages._crawler._csna.crawled_at') }}
                        .col-md-8.col-lg-10
                            .form-control-plaintext
                                | {{ crawlUrl.sd_st_created_at }}
            url-index(ref="urls" @crawled="onCrawled" @viewed="onViewed")
            song-index(ref="songs")
            file-index(ref="files")
</template>

<script>
import {headTitle, timeoutCaller} from '../../../../../app/utils'
import {mapActions, mapGetters} from '@linhntaim/vue-uses'
import FileIndex from './show/FileIndex'
import SongIndex from './show/SongIndex'
import UrlIndex from './show/UrlIndex'
import CrawlUrlStatusBadge from './CrawlUrlStatusBadge'
import {CSNA_STATUS_DEF} from '../../../../../app/config'

export default {
    name: 'Show',
    components: {CrawlUrlStatusBadge, FileIndex, SongIndex, UrlIndex},
    data() {
        return {
            loading: false,

            id: parseInt(this.$route.params.id),

            statusDefs: CSNA_STATUS_DEF,
        }
    },
    computed: {
        ...mapGetters({
            crawlUrl: 'csnaCrawlUrl/crawlUrl',
        }),
    },
    watch: {
        '$route'() {
            this.id = parseInt(this.$route.params.id)
            this.init()
        },
    },
    head: {
        title() {
            return {
                inner: headTitle(
                    this.$t('pages._crawler._csna._url._show._', {url: this.crawlUrl.url}),
                    this.$t('pages._crawler._csna._'),
                ),
            }
        },
    },
    mounted() {
        this.init()
    },
    methods: {
        ...mapActions({
            crawlUrlGetById: 'csnaCrawlUrl/getById',
        }),
        init() {
            this.initById()
        },
        initById() {
            this.loading = true
            this.crawlUrlGetById({
                id: this.id,
                doneCallback: () => {
                    this.loading = false

                    timeoutCaller.register(() => {
                        this.$refs.urls.init()
                        this.$refs.songs.init()
                        this.$refs.files.init()
                    })
                },
                errorCallback: err => {
                    this.loading = false
                    this.$bus.emit('error', {messages: err.getMessages(), extra: err.getExtra()})
                },
            })
        },
        onCrawled() {
            this.goCurrent()
        },
        onViewed() {
            this.goCurrent()
        },
        goCurrent() {
            this.$router.push({
                name: 'crawler_csna_url___show',
                params: {
                    id: this.crawlUrl.id,
                },
            })
        },
    },
}
</script>

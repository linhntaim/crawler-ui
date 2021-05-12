<template lang="pug">
    .row
        .col-xl-3.col-lg-2
        .col-xl-6.col-lg-8
            .card.shadow.mb-4
                .card-header.py-3
                    h6.m-0.font-weight-bold.text-primary
                        span.mr-2 Chiasenhac.vn
                        a(href="https://chiasenhac.vn" target="_blank")
                            i.fas.fa-external-link-square-alt
                form(@submit.prevent="onSubmitted()")
                    .card-body.has-control
                        .form-group
                            label.required(for="inputUrl") URL
                            input#inputUrl.form-control(v-model="url" type="text" required placeholder="https://chiasenhac.vn/...")
                    .card-footer.clearfix
                        button.btn.btn-primary.float-right(:disabled="loading || disabled" type="submit")
                            i.fas.fa-circle-notch.fa-spin(v-if="loading")
                            span(v-else) {{ $t('actions.crawl') }}

</template>

<script>
import {mapActions, mapGetters} from '@linhntaim/vue-uses'
import {headTitle} from '../../../../app/utils'

export default {
    name: 'Index',
    data() {
        return {
            loading: false,

            url: '',
        }
    },
    computed: {
        ...mapGetters({
            crawlUrl: 'csnaCrawlUrl/crawlUrl',
        }),
        disabled() {
            const url = this.url.trim()
            return !url || !/^https?:\/\/(|.+\.)chiasenhac.vn/.test(url)
        },
    },
    head: {
        title() {
            return {
                inner: headTitle(this.$t('pages._crawler._csna._')),
            }
        },
    },
    methods: {
        ...mapActions({
            crawlUrlCreate: 'csnaCrawlUrl/create',
        }),
        onSubmitted() {
            this.loading = true
            this.crawlUrlCreate({
                params: {
                    url: this.url,
                },
                doneCallback: () => {
                    this.loading = false
                    this.$router.push({
                        name: 'crawler_csna_url___show',
                        params: {
                            id: this.crawlUrl.id,
                        },
                    })
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
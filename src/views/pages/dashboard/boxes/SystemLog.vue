<template lang="pug">
    .card.shadow.mb-4
        .card-header.py-3
            h6.m-0.text-primary {{ $t('pages._dashboard._boxes._system_log._') }}
        form(@submit.prevent="onSubmitted()")
            .card-body
                div(v-for="systemLog in systemLogs")
                    a(:href="authUrl(systemLog.url)" target="_blank") {{ systemLog.name }}
            .card-footer.text-right
                button.btn.btn-primary(:disabled="loading" type="submit")
                    i.fas.fa-circle-notch.fa-spin(v-if="loading")
                    span(v-else) {{ $t('actions.refresh') }}
</template>

<script>
/**
 * Base - Any modification needs to be approved, except the space inside the block of TODO
 */

import {mapGetters} from '@linhntaim/vue-uses'
import {adminSystemLogService} from '../../../../app/services/default'
import {AuthUrl} from '../../../../app/utils'

export default {
    name: 'SystemLog',
    props: {
        id: Number,
    },
    data() {
        return {
            loading: false,

            systemLogs: [],
        }
    },
    computed: {
        ...mapGetters({
            accountAuthorizationParams: 'account/authorizationParams',
        }),
    },
    mounted() {
        this.init()
    },
    methods: {
        init() {
            this.onSubmitted()
        },
        onSubmitted() {
            this.loading = true
            adminSystemLogService().index(
                {},
                data => {
                    this.loading = false
                    this.systemLogs = data.models
                },
                err => {
                    this.loading = false
                    this.$bus.emit('error', {messages: err.getMessages(), extra: err.getExtra()})
                },
            )
        },
        authUrl(url) {
            return new AuthUrl(url, this.accountAuthorizationParams).get()
        },
    },
}
</script>

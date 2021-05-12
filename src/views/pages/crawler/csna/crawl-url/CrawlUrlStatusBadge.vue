<template lang="pug">
    .badge(:class="badgeClass") {{ badgeText }}
</template>

<script>
import {CSNA_STATUS, CSNA_STATUS_DEF} from '../../../../../app/config'

export default {
    name: 'CrawlUrlStatusBadge',
    props: {
        status: Number,
    },
    computed: {
        badgeClass() {
            switch (this.status) {
                case CSNA_STATUS_DEF.crawling:
                    return 'badge-primary'
                case CSNA_STATUS_DEF.failed:
                    return 'badge-damger'
                case CSNA_STATUS_DEF.uncompleted:
                    return 'badge-warning'
                case CSNA_STATUS_DEF.completed:
                    return 'badge-success'
                case CSNA_STATUS_DEF.fresh:
                default:
                    return 'badge-info'
            }
        },
        badgeText() {
            return this.$t('pages._crawler._csna.def.status.' + CSNA_STATUS[this.status].text)
        },
    },
}
</script>
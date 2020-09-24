export default {
    object: {
        same(v1, v2) {
            let isV1Object = typeof v1 === 'object'
            let isV2Object = typeof v2 === 'object'
            if (isV1Object && isV2Object) {
                if ((typeof v1.length !== 'undefined' && typeof v2.length !== 'undefined' && v1.length === v2.length)
                    || (typeof v1.length === 'undefined' && typeof v2.length === 'undefined' && Object.keys(v1).length === Object.keys(v2).length)) {
                    for (let i in v1) {
                        if (!this.same(v1[i], v2[i])) {
                            return false
                        }
                    }
                    return true
                } else return false
            } else if (isV1Object || isV2Object) return false

            return v1 == v2
        },

        clone(v) {
            if (Array.isArray(v)) {
                let v1 = []
                for (let i in v) {
                    v1.push(this.clone(v[i]))
                }
                return v1
            }
            if (typeof v === 'object') {
                return Object.assign({}, v)
            }
            return v
        },

        only(keys, v) {
            let v1 = {}
            keys.forEach(key => {
                v1[key] = v[key]
            })
            return v1
        },

        merge(v1, v2) {
            for (let i in v2) {
                v1[i] = v2[i]
            }
            return v1
        },

        keyExisted(key, o) {
            return Object.keys(o).indexOf(key) !== -1
        },

        valueExisted(value, o) {
            return Object.values(o).indexOf(value) !== -1
        },

        isEmpty(o) {
            return o ? !Object.keys(o).length : true
        },
    },
    string: {
        startWith(s, w) {
            return s.indexOf(w) === 0
        },
        repeat(s, times) {
            let r = s
            for (let i = 1; i < times; ++i) {
                r += s
            }
            return r
        },
        fill(text, length, char) {
            let textLength = text.length
            return textLength >= length ?
                text : this.repeat(char, length - textLength) + text
        },
        fillFollow(text, followText, char) {
            return this.fill(text, followText.length, char)
        },
        trim(s, chars = ' \t\n\r\0\x0B') {
            chars = chars.replace(' ', '\\s')
            return s.replace(new RegExp('^[' + chars + ']|[' + chars + ']$', 'g'), '')
        },
        splitByLine(s) {
            return s.split('\n').map(i => {
                i = this.trim(i)
                if (i) return i
            }).filter(i => {
                return i
            })
        },
        ucFirst(s) {
            return s.charAt(0).toUpperCase() + s.substr(1)
        },
    },
    array: {
        range(start, end, step = 1) {
            let r = []
            if (start <= end) {
                if (step < 0) step = -step
                for (let i = start; i <= end; i += step) {
                    r.push(i)
                }
            } else {
                if (step < 0) step = -step
                for (let i = start; i >= end; i -= step) {
                    r.push(i)
                }
            }
            return r
        },
    },
    int: {
        random(min, max) {
            return Math.floor(Math.random() * (max - min + 1)) + min
        },
    },
}

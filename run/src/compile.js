import {parseEnv} from 'dotenv-packed'
import CssBuilder from './classes/css-builder'

parseEnv()

new CssBuilder().build([
    'style',
], [
    // TODO: Stable CSS Files
    './public/vendor/startbootstrap-sb-admin-2/css/sb-admin-2.min.css',
])

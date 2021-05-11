/**
 * Base - Any modification needs to be approved, except the space inside the block of TODO
 */

import {BaseCrawlerService} from '../crawler-base'

export class BaseCsnaService extends BaseCrawlerService {
    constructor(basePath) {
        super('csna/' + basePath)
    }
}

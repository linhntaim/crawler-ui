import {CrawlerService} from '../crawler'

export class Csna extends CrawlerService {
    constructor(basePath) {
        super('csna/' + basePath)
    }
}
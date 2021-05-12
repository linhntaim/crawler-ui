/**
 * Base - Any modification needs to be approved, except the space inside the block of TODO
 */

import account from './account'
import device from './device'
import prerequisite from './prerequisite'
// TODO:
//  Import modules
import accountNotification from './account-notification'
import activityLog from './activity-log'
import appOption from './app-option'
import dataExport from './data-export'
import role from './role'
// TODO
// TODO:
import csnaCrawlUrl from './crawler/csna/crawl-url'
import csnaCrawlSong from './crawler/csna/crawl-song'
import csnaCrawlFile from './crawler/csna/crawl-file'

// TODO

export const store = {
    prerequisite,
    device,
    account,
    // TODO:
    //  Store modules
    accountNotification,
    appOption,
    dataExport,
    activityLog,
    role,
    // TODO
    // TODO:
    csnaCrawlUrl,
    csnaCrawlSong,
    csnaCrawlFile,

    // TODO
}
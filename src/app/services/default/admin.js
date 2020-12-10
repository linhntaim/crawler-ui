/**
 * Base - Any modification needs to be approved, except the space inside the block of TODO
 */

import DefaultService from '@/app/services/default-service'

export default class AdminService extends DefaultService {
    constructor(basePath) {
        super('admin/' + basePath)
    }
}

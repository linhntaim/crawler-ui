import {AuthAdminService} from './admin-auth'

export class PasswordAdminService extends AuthAdminService {
    constructor() {
        super('password')
    }

    forgot(email, appResetPasswordPath, doneCallback = null, errorCallback = null, alwaysCallback = null) {
        return this.post(
            '',
            {
                _forgot: 1,
                email: email,
                app_reset_password_path: appResetPasswordPath,
            },
            doneCallback,
            errorCallback,
            alwaysCallback,
        )
    }

    getReset(params, doneCallback = null, errorCallback = null, alwaysCallback = null) {
        return this.get(
            '',
            this.appendParams(params, {
                _reset: 1,
            }),
            doneCallback,
            errorCallback,
            alwaysCallback,
        )
    }

    reset(params, doneCallback = null, errorCallback = null, alwaysCallback = null) {
        return this.post(
            '',
            this.appendParams(params, {
                _reset: 1,
            }),
            doneCallback,
            errorCallback,
            alwaysCallback,
        )
    }
}

export const passwordAdminService = () => new PasswordAdminService()

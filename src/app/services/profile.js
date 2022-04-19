import KERI from './keri';

class Profile {
    static _isLead = false
    static _identifiers = []

    constructor() {
    }


    static get isLead() {
        return this._isLead
    }

    static
    set isLead(lead) {
        this._isLead = lead
    }

    static
    get identifiers() {
        return this._identifiers;
    }

    static loadIdentifiers() {
        KERI.listIdentifiers()
            .then((identifiers) => {
                this._identifiers = identifiers;
            })
            .catch((err) => {
                this._identifiers = []
                console.log('listIdentifiers', err);
            });
    }

    static clearDefaultAID() {
        sessionStorage.removeItem('defaultAID');
        sessionStorage.removeItem('defaultAlias');
    }

    static setDefaultAID(aid) {
        sessionStorage.setItem('defaultAID', aid.prefix);
        sessionStorage.setItem('defaultAlias', aid.name);
    }

    static getDefaultAID() {
        let aid = sessionStorage.getItem("defaultAID")
        let name = sessionStorage.getItem("defaultAlias")
        if (aid === null || name == null) {
            return null
        }

        return {aid: aid, name: name}
    }
}

module.exports = Profile;

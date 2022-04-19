import m from 'mithril';
import {SendChallengeForm} from '../../../forms';
import responseMessage from "../../../src/assets/img/response-message.png";

class CopyChallengePanel {

    constructor() {
    }

    view(vnode) {
        return (
            <>
                <img src={responseMessage} style={{width: '240px', margin: '1.5rem 0 2rem 0'}}/>
                <h3>Paste Challenge Message in Video Call</h3>
                <p class="p-tag" style={{margin: '2rem 0 2rem 0'}}>
                    Generate a message for each participant then direct message everyone in the video call.
                    <br/>
                    <br/>
                    <strong>
                        Important! Don't use a challenge message from another session, it should be unique to this
                        session
                        taking place today.
                    </strong>
                </p>
                <SendChallengeForm/>

            </>
        )
    }
}

module.exports = CopyChallengePanel
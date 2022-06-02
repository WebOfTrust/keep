import m from 'mithril';

class CredentialList {
    // handleClick = () => {};
    view(vnode) {
        return (
            <>
                <div
                    class="flex flex-justify-between divider"
                    style={{
                        alignItems: 'center',
                        margin: '.2rem 0 .2rem 0',
                        height: '40px',
                        padding: '25px 0 25px 0',
                        cursor: 'pointer',
                    }}
                    onclick={() => {
                        vnode.attrs.setCredential(vnode.attrs.credential);
                    }}
                >
                    <div class="flex" style={{ alignItems: 'center' }}>
                        <div class="flex flex-column">
                            <p style={{ margin: '0 0 0 1rem', fontSize: '90%' }}>{vnode.attrs.schema['title']}</p>
                        </div>
                    </div>
                </div>
            </>
        );
    }
}

module.exports = CredentialList;

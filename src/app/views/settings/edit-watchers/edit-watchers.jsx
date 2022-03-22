import m from 'mithril';
import githubLogo from '../../../../assets/img/github-logo.png';
import { Button, Select, TextField } from '../../../components';
import configureIdentifier from '../../../../assets/img/configure-identifier.png'
class EnterWatcherURLs {
  view(vnode) {
    return (
      <>
        <h1>Profile</h1>
    
          <img src={configureIdentifier} style={{ width: '35%' }} />
         <h3>Enter Watcher URLs</h3>
        <p class='p-tag'>Enter your watchers URLs below or continue on with the default watchers.</p>
        <div>
       <TextField filled fluid placeholder='Watcher URL 1' style={{margin: '2rem 0 2rem 0'}} />
       <TextField filled fluid placeholder='Watcher URL 2' style={{margin: '2rem 0 2rem 0'}} />
       <div class='flex flex-justify-center' style={{width: '50%', backgroundColor: '#f5f5f5', height: '3rem', borderRadius: '4px', alignItems: 'center'}}><p>+ Add New</p></div>
        </div>
        <div class="flex flex-justify-between" style={{ margin: '4rem 0 0 0' }}>
        <Button class="button--gray-dk button--big button--no-transform" raised label="Go Back" />
          <Button class="button--big button--no-transform" raised label="Save" onclick={vnode.attrs.continue} />
        </div>
      </>
    );
  }
}

class EditWatcherURLs {
  view(vnode) {
    return (
      <>
        <h1>Profile</h1>
    
          <img src={configureIdentifier} style={{ width: '35%', borderRadius: '50%' }} />
         <h3>Edit Watcher URLs</h3>
        <p class='p-tag'>Below are your current WatcherURLs, if you would like to change them, click to edit.</p>
        <div>
       <p class='p-tag' style={{margin: '2rem 0 2rem 2rem', fontSize: '110%', color: 'black'}}>Watcher URL 1</p>
       <p class='p-tag' style={{margin: '2rem 0 2rem 2rem', fontSize: '110%', color: 'black'}}>Watcher URL 2</p>
        </div>
        <div class="flex flex-justify-between" style={{ margin: '4rem 0 0 0' }}>
        <Button class="button--gray-dk button--big button--no-transform" raised label="Go Back" />
          <Button class="button--big button--no-transform" raised label="Edit" onclick={vnode.attrs.continue} />
        </div>
      </>
    );
  }
}

class EditWatchers {
  constructor() {
    this.currentState = 'enter-watcher-urls';
  }
  view(vnode) {
    return (
      <>
        {this.currentState === 'enter-watcher-urls' && (
          <EnterWatcherURLs 
            continue={() => {
              this.currentState = 'edit-watcher-urls';
            }}
          />
        )}
        {this.currentState === 'edit-watcher-urls' && <EditWatcherURLs />}
      </>
    );
  }
}

module.exports = EditWatchers;


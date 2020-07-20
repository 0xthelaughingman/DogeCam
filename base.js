let Animator
var s = document.createElement('script');
// TODO: add "script.js" to web_accessible_resources in manifest.json
s.src = browser.runtime.getURL('combined.js');
(document.head || document.documentElement).appendChild(s);
s.onload = function(){
    // dispatch an update for extension's first run on the tab(s), regardless of changes.
    storage_get_params()
}

/** 
 * Get data and dispatch message which our render.js/combined.js receives.
 */
function storage_get_params(){
    browser.storage.sync.get(['DogeCamConfiguration'], function(items) {
        var DogeCamConfiguration = items.DogeCamConfiguration

        /*
            Detect if Firefox, and if so clone the object so that the receiver can have access permissions to it...
            https://stackoverflow.com/questions/18744224,
            https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Errors/Property_access_denied
            Detection: https://stackoverflow.com/questions/9847580/how-to-detect-safari-chrome-ie-firefox-and-opera-browser
        */
        if(typeof InstallTrigger !== 'undefined'){
            console.log("is MOZ")
            var DogeCamConfigurationClone = cloneInto(DogeCamConfiguration, window.document);
            document.dispatchEvent(new CustomEvent('config-update', { detail: DogeCamConfigurationClone }));
        }
        else{
            document.dispatchEvent(new CustomEvent('config-update', { detail: DogeCamConfiguration }));
        }
    })    
}


/** 
 * Listener for changes to the draw_type from the popup!
 */
browser.storage.onChanged.addListener(async function(changes, namespace) {
    for(key in changes) {
        if(key === 'DogeCamConfiguration') {
            storage_get_params()
            return
        }
    }
});

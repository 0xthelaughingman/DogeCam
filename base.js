let Animator
var s = document.createElement('script');
// TODO: add "script.js" to web_accessible_resources in manifest.json
s.src = chrome.runtime.getURL('combined.js');
(document.head || document.documentElement).appendChild(s);
s.onload = function(){
    // dispatch an update for extension's first run on the tab(s), regardless of changes.
    storage_get_params()
}

/** 
 * Get data and dispatch message which our render.js/combined.js receives.
 */
function storage_get_params(){
    chrome.storage.sync.get(['DogeCamConfiguration'], function(items) {
        var DogeCamConfiguration = items.DogeCamConfiguration
        document.dispatchEvent(new CustomEvent('config-update', { detail: DogeCamConfiguration }));
    })    
}


/** 
 * Listener for changes to the draw_type from the popup!
 */
chrome.storage.onChanged.addListener(async function(changes, namespace) {
    for(key in changes) {
        if(key === 'DogeCamConfiguration') {
            storage_get_params()
            return
        }
    }
});

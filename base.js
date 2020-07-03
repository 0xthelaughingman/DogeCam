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
    chrome.storage.sync.get(['draw_type', 'draw_param'], function(items) {
        var data = {draw_type: items.draw_type, draw_param: items.draw_param}
        document.dispatchEvent(new CustomEvent('config-update', { detail: data }));
    })    
}


/** 
 * Listener for changes to the draw_type from the popup!
 */
chrome.storage.onChanged.addListener(async function(changes, namespace) {
    for(key in changes) {
        if(key === 'draw_type' || key === 'draw_param') {
            storage_get_params()
            return
        }
    }
});

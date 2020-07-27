/*
    Switching the API based on browser.
    Detection: https://stackoverflow.com/questions/9847580/how-to-detect-safari-chrome-ie-firefox-and-opera-browser
*/

let api_base = null

if(typeof InstallTrigger !== 'undefined'){
    api_base = browser
}
else{
    api_base = chrome
}

var s = document.createElement('script');

/*
    If MS Teams, switch to render_teams, it doesn't have tfjs modules/exports.
*/
if(window.location.href.indexOf("teams.microsoft.com") > -1){
    s.src = api_base.runtime.getURL('render_teams.js');
}
else{
    s.src = api_base.runtime.getURL('combined.js');
}

(document.head || document.documentElement).appendChild(s);
s.onload = function(){
    // dispatch an update for extension's first run on the tab(s), regardless of changes.
    storage_get_params()
}

/** 
 * Get data and dispatch message which our render.js/combined.js receives.
 */
function storage_get_params(){
    api_base.storage.sync.get(['DogeCamConfiguration'], function(items) {
        var DogeCamConfiguration = items.DogeCamConfiguration
        if(DogeCamConfiguration.draw_type==="video-playback"){
            set_playback_element()
        }
        else{
            unset_playback_element()
        }
        /*
            Detect if Firefox, and if so clone the object so that the receiver can have access permissions to it...
            https://stackoverflow.com/questions/18744224,
            https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Errors/Property_access_denied
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
api_base.storage.onChanged.addListener(async function(changes, namespace) {
    if(changes.hasOwnProperty('DogeCamConfiguration')){
        storage_get_params()
    }
});

/* 
    Functions for maintaining our playback video asset/element which will be used in the render/combined.js 
*/
function set_playback_element(){
    try{
        var video_path = api_base.runtime.getURL("videos/sample.mp4")
        console.log(video_path)
        var playback_video = document.createElement('video')
        playback_video.id = "playback_video"
        playback_video.style.position = "absolute"
        playback_video.width = 1280
        playback_video.height = 720
        playback_video.style.right = -1280

        //  Div that keeps the content out of the viewport, disables overflow so no scrollbars!
        var playback_div = document.createElement("div")
        playback_div.id = "playback_div"
        playback_div.style.position= "relative"
        playback_div.style.right = "0"
        playback_div.style.bottom = "0px"
        playback_div.style.overflow= "hidden"
        playback_div.appendChild(playback_video)
        playback_div.style.zIndex= 0

        playback_video.src = video_path
        playback_video.muted = true
        playback_video.loop = true
        
        playback_video.play()

        document.body.appendChild(playback_div)
        console.log("playback div added")
    }
    catch(error){
        console.log("Static Video playback failed", error)
    }
    
}

function unset_playback_element(){
    var dyn = document.getElementById("playback_div")
    if(dyn){
        document.body.removeChild(dyn)
    }
}
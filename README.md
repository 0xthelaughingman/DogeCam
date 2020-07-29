# DogeCam
 A browser extension to make your video calls Doge-y!

 **Do go through**: https://github.com/Cruzo007/ChromeExtensionTutorial as a basic tutorial of what all has been discussed/attempted.
 
 **Available on**: Chrome & Mozilla FireFox

# Testing/Installing Locally:

* Steps to install this project as your ***CHROME*** extension:
  1. Open the Extension Management page by navigating to chrome://extensions.
  2. The Extension Management page can also be opened by clicking on the Chrome menu, hovering over More Tools then selecting Extensions.  
  3. Enable Developer Mode by clicking the toggle switch next to Developer mode.
  4. Click the 'LOAD UNPACKED' button and select this directory.

* Steps for ***Mozilla FireFox***:
  1. Open the Add-ons Management page by navigating to about:addons .
  2. The Extension Management page can also be opened by clicking on the FireFox menu, and then selecting Add-ons.  
  3. Click the "Tools for all add-ons" button and click "debug Add-ons", or navigate to about:debugging#/runtime/this-firefox.
  4. Click the 'LOAD TEMPORARY ADD-ON' button and select the archive/zip of the directory.
 
 **PUBLISHING WARNING**: The manifest required a new key "browser_specific_settings" to support FireFox compatibility and testing, this should ideally be removed on the release branch.

# Further Enhancements/Ideas/TODOs:

* ***Voice Modifiers***: Allow for users to apply voice modifiers to their Audio input/streams.
    
    
# Notes/Known Issues:

1. ***TFJS performance issues***: The TFJS draw_mode is way too compute intensive. Botches the UI responsiveness. Possible approaches:
    * Worker.js & OffScreenCanvas: Do all the drawing computes with the OffScreenCanvas and in a seperate web 'worker'.
  
2. ***Persistent Storage & Reads***: Since our combined.js is technically not a content script but an injected script, it doesn't have the exposure to chrome APIs.
    * To overcome that drawback, we pass the messages on update/onchange from the base.js(content script) to combined.js.
    * base.js and the popup have all the access to chrome/broswer APIs.

3. ***Microsoft Teams***: Can't manage to load TFJS/Bodypix modules on Teams due to a module name error in their 'almond.js' check/module management. Tried Workarounds/Fixes: 
    * ***Loading render_teams.js without the TFJS src/modules***: This allows our script to load up and we can continue with the standard 2D filters. We should probably attempt to include TFJS for Teams still.
    



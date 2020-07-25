# DogeCam
 A browser extension to make your video calls Doge-y!

 **Do go through**: https://github.com/Cruzo007/ChromeExtensionTutorial as a basic tutorial of what all has been discussed/attempted.
 **Available on**: Chrome & Mozilla FireFox

# Testing/Installing Locally:

* Steps to install this project as your **_CHROME_** extension:
  1. Open the Extension Management page by navigating to chrome://extensions.
  2. The Extension Management page can also be opened by clicking on the Chrome menu, hovering over More Tools then selecting Extensions.  
  3. Enable Developer Mode by clicking the toggle switch next to Developer mode.
  4. Click the 'LOAD UNPACKED' button and select this directory.

* Steps for **_Mozilla FireFox_**:
  1. Open the Add-ons Management page by navigating to about:addons .
  2. The Extension Management page can also be opened by clicking on the FireFox menu, and then selecting Add-ons.  
  3. Click the "Tools for all add-ons" button and click "debug Add-ons", or navigate to about:debugging#/runtime/this-firefox.
  4. Click the 'LOAD TEMPORARY ADD-ON' button and select the archive/zip of the directory.
 
 **PUBLISHING WARNING**: The manifest required a new key "browser_specific_settings" to support FireFox compatibility and testing, this should ideally be removed on the release branch.


# Notes/Known Issues:

1. _**TFJS performance issues**_: The TFJS draw_mode is way too compute intensive. Botches the UI responsiveness. Possible approaches:
    * Worker.js & OffScreenCanvas: Do all the drawing computes with the OffScreenCanvas and in a seperate web 'worker'.
  
2. _**Persistent Storage & Reads**_: Since our combined.js is technically not a content script but an injected script, it doesn't have the exposure to chrome APIs.
    * To overcome that drawback, we pass the messages on update/onchange from the base.js(content script) to combined.js.
    * base.js and the popup have all the access to chrome APIs.

3. _**Microsoft Teams**_: Can't manage to load TFJS/Bodypix modules on Teams due to a module name error in their 'almond.js' check/module management. Tried Workarounds/Fixes 
    * **[DOESN'T WORK]** _**Removing tfjs/body-pix src from combined.js**_: This allows our script to load up and we can see the override method's logs, but doesn't seem like our script handles the stream hand over at all. Could be an underlying timing issue w.r.t the override?
    
4. **[HIGH PRIORITY]** _**Override Fails for Teams/JioMeet**_: The getUserMedia overrides fail for Teams/JioMeet at the moment. Both use a variety of plugins and add-on scripts to handle the stream. The same design if adopted by the supported apps, would lead to them not being supported by the extension too!
    * Figure out a way to override the stream handover for either of the 2, assumption is the solution for one should be readily applicable for the other or atmost with minimal tweaks


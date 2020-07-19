# DogeCam
 A chrome extension to make your video calls Doge-y!

 **Do go through**: https://github.com/Cruzo007/ChromeExtensionTutorial as a basic tutorial of what all has been discussed/attempted.


# Testing Locally:

Steps to install this project as your chrome extension:
1. Clone or download this project.
2. Open the Extension Management page by navigating to chrome://extensions.
3. The Extension Management page can also be opened by clicking on the Chrome menu, hovering over More Tools then selecting Extensions.
4. Enable Developer Mode by clicking the toggle switch next to Developer mode.
5. Click the 'LOAD UNPACKED' button and select this directory.


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

# TODOs

1. _**Mozilla/FireFox Compatibility**_: Incorporate the compatibility for Mozilla Firefox. Current Assumption: Only the Storage R/W functions would need to be switched dynamicallly based on the browser running the code, everything else should remain consistent across the browsers. The manifest/concepts of content_scripts,etc. all look exactly the same.

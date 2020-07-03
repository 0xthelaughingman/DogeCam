# DogeCam
 A chrome extension to make your video calls Doge-y!

 Do go through https://github.com/Cruzo007/ChromeExtensionTutorial as a basic tutorial of what all has been discussed/attempted.


# Testing Locally:

Steps to install this project as your chrome extension:
1. Clone or download this project.
2. Open the Extension Management page by navigating to chrome://extensions.
3. The Extension Management page can also be opened by clicking on the Chrome menu, hovering over More Tools then selecting Extensions.
4. Enable Developer Mode by clicking the toggle switch next to Developer mode.
5. Click the 'LOAD UNPACKED' button and select this directory.


# Notes/Known Issues:

1. TFJS performance issues: The TFJS draw_mode is way too compute intensive. Botches the UI responsiveness. Possible approaches:
  * Worker.js & OffScreenCanvas: Do all the drawing computes with the OffScreenCanvas and in a seperate web 'worker'.
  
2. *Persistent Storage & Reads*: Since our combined.js is technically not a content script but an injected script, it doesn't have the exposure to chrome APIs.
  * To overcome that drawback, we pass the messages on update/onchange from the base.js(content script) to combined.js.
  * base.js and the popup have all the access to chrome APIs.
  * [TODO]: Update popup on-load with last saved config.

3. Microsoft Teams: Can't manage to load TFJS/Bodypix modules on Teams due to a module name error in their 'almond.js' check/module management. Tried Workarounds/Fixes 
  * [DOESN't WORK] Removing tfjs/body-pix src from combined.js: This allows our script to load up and we can see the override method's logs, but doesn't seem like our script handles the stream hand over at all. Could be an underlying timing issue w.r.t the override?

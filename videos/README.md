# DogeCam - Setting up Video Playback asset
To be able to use the feature, the end-user must first configure the asset/file they want to play. The file must be in mp4 format.
The process will involve copying the file to the extension's directory as per the browser.

**NOTE**: FireFox is currently ***NOT*** supported for this feature!

***DISCLAIMER***
*The feature should be used responsibly. The User should use this feature at their own discretion.*

# 1. Chrome File setup
Preferably, ***only enable the mode after configuring the playback asset/file***. Try and limit the file size/duration, the playback is going to be looped anyway.

1. In the browser, navigate to: chrome://version/
2. Copy the Profile Path value and open the folder in Explorer/Finder/Navigator. 
3. From the folder open Extensions folder.
4. Here, the folder to open will depend on the Extension's identifier/ID. Check DogeCam's ID as on Chrome's extensions page: chrome://extensions/
5. Open the folder-> And it's version subfolder. Now you are at the extension's root. Simply navigate to videos folder and replace sample.mp4 with a version of your choice.

***NOTE***: The filename **should** remain ***sample.mp4*** 

# 2. Chrome Warning/Corruption
If you modify an extension's file contents Chrome's safety measures render the extension as "corrupt" and automatically disable it.<br>
There are ***2 approaches*** to solve this issue as of now:

 *  Open DogeCam's Chrome Store page.<br>
    There will be a popup/notification at the very top of the page that will state the extension has been disabled.<br>
    You can click the "enable" option on the notification to temporarily enable the extension. <br>
    ***WARNING***: This only keeps the extension enabled temporarily, it might get disabled mid-call/stream, leaving the page/call in an irrecovareable state.<br>
    <br>
    ***OR***<br>
    <br>
 *  Run the extension as a local/development extension.<br>
    ***Far easier to avoid the disabling and not worry about the call/video being disrupted with this approach.***<br>
    Simply clone the master/latest release branch to your desktop and follow the steps here:<br>
    https://github.com/Cruzo007/DogeCam#testinginstalling-locally<br>

# Known Issues/Troubleshooting
* At times, *due to timing issues and page load delays*, the playback video may not work if you launch the app/page with the playback mode selected. ***Ideally, keep the 2D/no-filter mode on and switch to the the video-playback mode once the call/app has fully loaded.***

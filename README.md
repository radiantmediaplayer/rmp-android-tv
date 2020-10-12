# rmp-android-tv
A sample Apache Cordova application for Android TV using Radiant Media Player

## Usage instructions
Create a cordova application for Android. Note you must have browserify install globally for the browserify part.
```bash
git clone https://github.com/radiantmediaplayer/rmp-android-tv.git
cd rmp-android-tv
npm install
```
Enter your license key in www/js/player.js, then
```bash
browserify www/js/index.js -o www/js/prod.js -t [ babelify ]
cordova platform add android
cordova prepare android
```

Then open [Android studio](https://developer.android.com/studio). 

Select "Open an existing Android Studio project" > rmp-android-tv/platforms/android and choose to run the app on your Android TV device. 

Note that because this is a video app, running the app in a virtual device may not render the app correctly.

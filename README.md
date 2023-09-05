# rmp-android-tv

A sample [Apache Cordova](https://cordova.apache.org/) video application for Android TV using [Radiant Media Player](https://www.radiantmediaplayer.com).

## Usage instructions

This demo app makes use of [cordova-plugin-rmpandroidtv](https://github.com/radiantmediaplayer/cordova-plugin-rmpandroidtv) a Cordova pluing we developed to prepare an Android app built with Cordova for Android TV deployment. First install it with [Apache Cordova](https://cordova.apache.org/#getstarted).

```bash
git clone https://github.com/radiantmediaplayer/rmp-android-tv.git
cd rmp-android-tv
npm install
```

Enter your license key in www/js/player.js, then

```bash
cordova platform add android
cordova prepare android
```

Open [Android studio](https://developer.android.com/studio). Select "Open" > rmp-android-tv/platforms/android and choose to run the app on your Android TV device.


## Support notes
- [cordova-android](https://github.com/apache/cordova-android) 12+ is required for this app to run properly
- This is a demo app, it shows [some of the features](https://www.radiantmediaplayer.com/docs/latest/android-tv.html#android-tv-app-supported-features) Radiant Media Player has to offer in Android TV 
- This app has been tested on Android TV 9 (Xiaomi Mibox 4) and Android TV 12 (ADT-3 Developer Kit)

## License for rmp-android-tv
rmp-android-tv is released under MIT.

## License for Radiant Media Player
Radiant Media Player is a commercial HTML5 media player, not covered by the above MIT license. 

Radiant Media Player license can be found here: [https://www.radiantmediaplayer.com/terms-of-service.html](https://www.radiantmediaplayer.com/terms-of-service.html). 

You may request a free trial for Radiant Media Player at: [https://www.radiantmediaplayer.com/free-trial.html](https://www.radiantmediaplayer.com/free-trial.html).

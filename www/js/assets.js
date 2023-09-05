const AVAILABLE_STREAMS = {
  liveHls: {
    uri: 'https://5b44cf20b0388.streamlock.net:8443/live/ngrp:live_all/playlist.m3u8',
    title: 'Android TV Demo App - HLS Live',
    ads: false,
    hls: true
  },
  vodHls: {
    uri: 'https://www.radiantmediaplayer.com/media/v1/avc-mp4/hls/playlist.m3u8',
    title: 'Android TV Demo App - HLS VOD',
    ads: false,
    hls: true
  },
  vodDash: {
    uri: 'https://www.radiantmediaplayer.com/media/v1/avc-mp4/dash/manifest.mpd',
    title: 'Android TV Demo App - DASH VOD',
    ads: false,
    dash: true
  },
  liveDash: {
    uri: 'https://5b44cf20b0388.streamlock.net:8443/live/ngrp:live_all/manifest.mpd',
    title: 'Android TV Demo App - DASH Live',
    ads: false,
    dash: true
  },
  vodHlsAdsIma: {
    uri: 'https://www.radiantmediaplayer.com/media/v1/avc-mp4/hls/playlist.m3u8',
    title: 'Android TV Demo App - HLS VOD with IMA ads',
    ads: true,
    hls: true,
    adParser: 'ima',
    adTagUrl: 'https://www.radiantmediaplayer.com/vast/tags/inline-linear-1.xml'
  },
  vodHlsAdsRmpVast: {
    uri: 'https://www.radiantmediaplayer.com/media/v1/avc-mp4/hls/playlist.m3u8',
    title: 'Android TV Demo App - HLS VOD with rmp-vast ads',
    ads: true,
    hls: true,
    adParser: 'rmp-vast',
    adTagUrl: 'https://www.radiantmediaplayer.com/vast/tags/inline-linear-1.xml'
  },
  vodDashHevc: {
    uri: 'https://www.radiantmediaplayer.com/media/v1/hevc/dash/manifest.mpd',
    title: 'Android TV Demo App - DASH VOD HEVC',
    ads: false,
    dash: true,
  },
  vodDashAv1: {
    uri: 'https://www.radiantmediaplayer.com/media/v1/av1-mp4/dash/manifest.mpd',
    title: 'Android TV Demo App - DASH VOD AV1',
    ads: false,
    dash: true,
  },
  vodDashDrm: {
    uri: 'https://media.axprod.net/TestVectors/v7-MultiDRM-SingleKey/Manifest.mpd',
    title: 'Android TV Demo App - DASH VOD with Widevine DRM',
    ads: false,
    dash: true,
    drm: true,
    licenseDrmUri: 'https://drm-widevine-licensing.axtest.net/AcquireLicense',
    licenseHeaders: {
      'X-AxDRM-Message': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ2ZXJzaW9uIjoxLCJjb21fa2V5X2lkIjoiYjMzNjRlYjUtNTFmNi00YWUzLThjOTgtMzNjZWQ1ZTMxYzc4IiwibWVzc2FnZSI6eyJ0eXBlIjoiZW50aXRsZW1lbnRfbWVzc2FnZSIsImtleXMiOlt7ImlkIjoiOWViNDA1MGQtZTQ0Yi00ODAyLTkzMmUtMjdkNzUwODNlMjY2IiwiZW5jcnlwdGVkX2tleSI6ImxLM09qSExZVzI0Y3Iya3RSNzRmbnc9PSJ9XX19.4lWwW46k-oWcah8oN18LPj5OLS5ZU-_AQv7fe0JhNjA'
    }
  },
  vodDashDrm2: {
    uri: 'https://storage.googleapis.com/shaka-demo-assets/sintel-widevine/dash.mpd',
    title: 'Android TV Demo App - DASH VOD with Widevine DRM Sample 2',
    ads: false,
    dash: true,
    drm: true,
    licenseDrmUri: 'https://cwip-shaka-proxy.appspot.com/header_auth',
    licenseHeaders: {
      'CWIP-Auth-Header': 'VGhpc0lzQVRlc3QK'
    }
  }
};

export default AVAILABLE_STREAMS;

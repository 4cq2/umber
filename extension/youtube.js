'use strict';

async function youTube() {
   const ref = new URL(this.href);
   const body = {
      context: {
         client: {clientName: 'ANDROID', clientVersion: '16.05'}
      },
      videoId: ref.searchParams.get('v')
   };
   const req = {
      body: JSON.stringify(body),
      headers: {'X-Goog-API-Key': 'AIzaSyAO_FJ2SlqU8Q4STEHLGCilw_Y9_11qcW8'},
      method: 'POST'
   };
   const res = await fetch('https://www.youtube.com/youtubei/v1/player', req);
   const play = await res.json();
   const msg = {
      poster: this.querySelector('img').src,
      title: play.videoDetails.author + ' - ' + play.videoDetails.title
   };
   if (play.playabilityStatus.status == 'OK') {
      play.streamingData.adaptiveFormats.sort(
         (a, b) => b.bitrate - a.bitrate
      );
      for (const form of play.streamingData.adaptiveFormats) {
         // some videos do not offer WebM: 6_lMeEMMbyY
         if (form.audioQuality == 'AUDIO_QUALITY_MEDIUM') {
            msg.src = form.url;
            break;
         }
      }
   } else {
      msg.src = '';
      msg.title += ' - ' + play.playabilityStatus.reason;
   }
   browser.runtime.sendMessage(msg);
}

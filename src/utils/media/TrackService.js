import React from 'react'
import { Player } from '@react-native-community/audio-toolkit'
import TrackPlayer, { useTrackPlayerEvents, TrackPlayerEvents, STATE_PLAYING } from 'react-native-track-player';

import { ReadTracks } from './functions'
import { firebase, database, auth, trimWWWString } from '../../utils'
import { useStore } from '../store'
const tracksPath = `/mediaTracks`
const favsPath = `/favorites/`

// Subscribing to the following events inside MyComponent
const events = [
  TrackPlayerEvents.PLAYBACK_STATE,
  TrackPlayerEvents.PLAYBACK_ERROR,
  TrackPlayerEvents.PLAYBACK_QUEUE_ENDED

];

function TrackService() {
  if (!auth) return
  const [storeState, storeDispatch] = useStore()
  const { tracks, queued, currentTrack } = storeState

  useTrackPlayerEvents(events, async (event) => {
    switch (event.type) {
      case TrackPlayerEvents.PLAYBACK_ERROR:
        console.warn('An error occurred while playing the current track.');
        return
      case TrackPlayerEvents.PLAYBACK_STATE:
        const isPlaying = event.state === 'playing'
        const isLoading = event.state === 'loading'
        const isIdle = event.state === 'idle'
        if (isPlaying) {
          storeDispatch.setPlaying(true)
        } else {
          storeDispatch.setPlaying(false)
        }
        return
      case TrackPlayerEvents.PLAYBACK_QUEUE_ENDED:
        console.log(currentTrack.acid, 'has ended')
        TrackPlayer.reset()
        storeDispatch.setQueued([])
        storeDispatch.setPlaying(false)
        return
      default:
        console.log('?? useTrackPlayerEvents State', event.type)
        return
    }
  });

  React.useEffect(() => {
    if (auth && !tracks.length)
      getTracks(result => storeDispatch.setTracks(result))
    return () => { }
  }, [])

  React.useEffect(() => {
    if (storeState.tracks.length && storeDispatch.isPlaying) {
      const trkChange = TrackPlayer.addEventListener('playback-track-changed', async (data) => {
        const track = await TrackPlayer.getTrack(data.nextTrack);
        console.log('[TODO] send track change listener data to store')
      })
      const queueEnd = TrackPlayer.addEventListener('playback-queue-ended', async (data) => {
        console.log(`[TRACKSERVICE] Your playlist has ended`);
        TrackPlayer.removeUpcomingTracks()
        storeDispatch.setQueued([])
        storeDispatch.setPlaying(false)
      })
    }
    return () => { }
  }, [storeDispatch.isPlaying])


  const setup = () => {
    TrackPlayer.setupPlayer().then(() => {
      // Player setup with options
      TrackPlayer.updateOptions({
        capabilities: [
          TrackPlayer.CAPABILITY_PLAY,
          TrackPlayer.CAPABILITY_PAUSE,
          TrackPlayer.CAPABILITY_STOP,
          TrackPlayer.CAPABILITY_SKIP_TO_NEXT,
          TrackPlayer.CAPABILITY_SKIP_TO_PREVIOUS,
        ],
      })
    })
  }

  const addAllToQueue = async () => {
    TrackPlayer.add(state.tracks.map((trk) => {
      return {
        id: trk.acid,
        title: trk.title,
        artist: trk.artist,
        url: trimWWWString(trk.song),
        artwork: trimWWWString(trk.art_link)
      }
    }))
      .then(res => {
        TrackPlayer.play()
          .then(r => r.json())
          .then(r => console.log(r))
          .catch(e => console.log(e))
      })
      .catch(err => console.warn('error', err))
  }

  const getTracks = cb => ReadTracks(cb)


  return { setup, addAllToQueue, getTracks }
}

export default TrackService
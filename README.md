# Groundpound

![User Page](https://i.imgur.com/yiSK3w6.png)
![Track Show](https://i.imgur.com/R0F5S7c.png)

## Summary
[Groundpound Live Link](http://groundpound.herokuapp.com)

Groundpound is a web application designed to replicate the experience of [Soundcloud](https://soundcloud.com). The back end was created with Ruby on Rails and the front end with React/Redux. The features currently available to explore include:
* Account creation, login, and guest/demo login
* Continuous audio playback across pages
* Track uploads and deletion
* Commenting on tracks
* User profile pages
* Liking and reposting tracks
* Following users

## Languages, Frameworks, Libraries
* Ruby on Rails
* PostgreSQL
* React
* Redux
* jQuery
* JavaScript
* wavesurfer.js

## User Authentication

For session login/user authentication, Groundpound uses BCrypt to hash and salt so that the database only stores hashed passwords (and not the passwords themselves). Login credentials are verified in the backend and the current user's ID is bootstrapped to the front end so that features unique to logged in users don't require constant calls to the server.

![Account Login](https://i.imgur.com/TwCwVsX.png)

## Continuous Play

In order to style the playback bar at the bottom, I needed to have DOM elements refer to the status of the `<audio>` HTML5 element which actually controlled the audio buffer. The following code exemplifies how I used React state to update a track's progress bar (including song duration, current time, and progress percentage to be used as width in CSS styling). This method is the callback for `onTimeUpdate`:

```javascript
  updateTime(e) {
    const audioEl = this.audioRef.current;

    if (audioEl.ended) {
      this.nextTrack();
      return;
    }

    const decimalPercentage = audioEl.currentTime / audioEl.duration;
    const progPercentage = decimalPercentage * 100;
    this.setState({
      curTrackTime: audioEl.currentTime,
      trackLength: audioEl.duration,
      progPercentage: `${progPercentage}%`
    });
  }
```

## wavesurfer.js

To represent audio waveforms visually (as seen on Soundcloud) I used a library called wavesurfer.js. One of the challenges that I encountered while implementing components with the waveform was making sure that seeking through a track from either the playbar on the bottom or the waveform itself resulted in predictable, synchronized behavior. To do this, I have both components hold a local seek value and a reference to a global seek value from the Redux store. When the global seek value changes and differs from the local seek value, I update the local value and seek to that point in the waveform/audio playbar. In the event that a currently playing waveform ever mounts to the page and its corresponding track is currently playing, I also make sure to seek to that point in the waveform without changing the global or local seek value. 

![Stream Page](https://i.imgur.com/VQjWVjx.png)

## Upcoming Features
* Timestamped comments and sub-comments
* Scheduled uploads
* Live A/B comparisons of tracks
* User statistics
* Playlists
* Download gates

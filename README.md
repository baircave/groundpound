# Groundpound

![Track Show](https://i.imgur.com/OUaUWAe.png)

## Summary
[Groundpound Live Link](http://groundpound.herokuapp.com)

Groundpound is a web application designed to replicate the experience of [Soundcloud](https://soundcloud.com). The back end was created with Ruby on Rails and the front end with React/Redux. The features currently available to explore include:
* Account creation, login, and guest/demo login
* Continuous audio play across pages
* Track uploads and deletion
* Commenting on tracks
* User profile pages

## Languages, Frameworks, Libraries
* Ruby on Rails
* PostgreSQL
* React
* Redux
* jQuery
* JavaScript

## User Authentication

For session login/user authentication, Groundpound uses BCrypt to hash and salt so that the database only stores hashed passwords (and not the passwords themselves). Login credentials are verified in the backend and the current user's ID is bootstrapped to the front end so that features unique to logged in users don't require constant calls to the server.

![Account Login](https://i.imgur.com/TwCwVsX.png)

## Continuous Play

In order to style the playback bar at the bottom, I needed to have DOM elements refer to the status of the `<audio>` HTML5 element which actually controlled the audio buffer. The following code exemplifies how I used React state to update a track's progress bar (including song duration, current time, and progress percentage to be used as width in CSS styling). This method is the callback for `onTimeUpdate`: 

```
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

![Stream Page](https://i.imgur.com/w4ISL3i.png)

## Upcoming Features
* Waveforms
* Timestamped comments and sub-comments
* Liking/reposting tracks
* Following users
* Scheduled uploads
* Live A/B comparisons of tracks
* User statistics
* Playlists
* Download gates

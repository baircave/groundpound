import React from 'react';

export const trackAgeFromMs = (ms) => {
  const minutes = Math.floor(ms / 60000.0);
  const hours = Math.floor(minutes / 60.0);
  const days = Math.floor(hours / 24.0);
  const months = Math.floor(days / 30.416);
  const years = Math.floor(months / 12.0);
  if (minutes >= 60) {
    if (hours >= 24) {
      if (days >= 30.416) {
        if (months >= 12) {
          if (years >= 1) {
            if (years === 1) {
              return `${years} year ago`;
            } else {
              return `${years} years ago`;
            }
          }
        } else {
          if (months === 1) {
            return `${months} month ago`;
          } else {
            return `${months} months ago`;
          }
        }
      } else {
        if (days === 1) {
          return `${days} day ago`;
        } else {
          return `${days} days ago`;
        }
      }
    } else {
      if (hours === 1) {
        return `${hours} hour ago`;
      } else {
        return `${hours} hours ago`;
      }
    }
  } else {
    if (minutes === 1) {
      return `${minutes} minute ago`;
    } else if (minutes > 1) {
      return `${minutes} minutes ago`;
    } else {
      return 'less than a minute ago';
    }
  }
};

export function generateRGB() {
  function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
  }
  return `rgba(${getRandomInt(255)}, ${getRandomInt(255)}, ${getRandomInt(255)}, 1.000)`;
}

export function secondsToTimeString(seconds) {
  //for formatting into a time string
  function addZeroChar(int) {
    if (int < 10) {
      return `0${int}`;
    }
    return `${int}`;
  }
  const hours = Math.floor(seconds / 3600);
  const hoursRemainder = seconds % 3600;
  const minutes = Math.floor(hoursRemainder / 60);
  const minutesRemainder = Math.floor(hoursRemainder % 60);
  if (hours > 0) {
    return `${hours}:${addZeroChar(minutes)}:${addZeroChar(minutesRemainder)}`;
  } else if (minutes > 0) {
    return `${minutes}:${addZeroChar(minutesRemainder)}`;
  } else {
    return `0:${addZeroChar(minutesRemainder)}`;
  }
}

export function getMouse(e) {
  let element = e.currentTarget, offsetX = 0, offsetY = 0, mx, my;

  while (element.offsetParent) {
    offsetX += element.offsetLeft;
    offsetY += element.offsetTop;
    element = element.offsetParent;
  }

  mx = e.pageX - offsetX;
  my = e.pageY - offsetY;

  return {x: mx, y: my};
}

export function playPauseTrack() {
  const track = this.props.track;
  const playbar = this.props.playbar;
  if (playbar.currentlyPlayingId === track.id.toString()) {
    this.props.togglePlayPause(!playbar.playing);
  } else {
    this.props.receiveCurTrack(track.id.toString());
    if (!playbar.playing) {
      this.props.togglePlayPause(true);
    }
  }
}

export function imageLoaded() {
  this.setState({opacityClass: "opacity-on"});
}

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
    } else {
      return `${minutes} minutes ago`;
    }
  }
};

export function generateRGB() {
  function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
  }
  return `rgba(${getRandomInt(255)}, ${getRandomInt(255)}, ${getRandomInt(255)}, 1.000)`;
}

export function makeGradient() {
  const canvas = this.canvasRef.current;
  const ctx = canvas.getContext('2d');
  let grd;

  grd = ctx.createLinearGradient(0.000, 150.000, 300.000, 150.000);

  grd.addColorStop(0.000, generateRGB());
  grd.addColorStop(1.000, generateRGB());

  ctx.fillStyle = grd;
  ctx.fillRect(0, 0, 300.000, 300.000);
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
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

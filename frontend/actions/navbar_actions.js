export const SHOW_NAVBAR = 'SHOW_NAVBAR';
export const REMOVE_NAVBAR = 'REMOVE_NAVBAR';

export const showNavbar = () => {
  return {
    type: SHOW_NAVBAR
  };
};

export const removeNavbar = () => {
  return {
    type: REMOVE_NAVBAR
  };
};

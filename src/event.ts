const activeModalUpdateEvent = new Event('activemodalupdate');

export const collectEvent = () => {
  dispatchEvent(activeModalUpdateEvent);
};

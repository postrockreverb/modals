export const activeModalUpdateEventName = 'activemodalupdate';

const activeModalUpdateEvent = new Event(activeModalUpdateEventName);

export const collectEvent = () => {
  dispatchEvent(activeModalUpdateEvent);
};

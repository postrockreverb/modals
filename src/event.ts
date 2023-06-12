export const ACTIVE_MODAL_UPDATE_EVENT_NAME = 'activemodalupdate';

const activeModalUpdateEvent = new Event(ACTIVE_MODAL_UPDATE_EVENT_NAME);

export const collectEvent = () => {
  dispatchEvent(activeModalUpdateEvent);
};

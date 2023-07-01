import { Modal } from './types';
import { getActiveStack } from './stack';

export const pushHistoryState = (currentStateModal: Modal | null, newStateModal: Modal | null) => {
  if (currentStateModal || newStateModal) {
    const { data, url } = buildState(currentStateModal, newStateModal);
    window.history.pushState(data, '', url);
  }
};

export const replaceHistoryState = (currentStateModal: Modal | null, newStateModal: Modal | null) => {
  if (currentStateModal || newStateModal) {
    const { data, url } = buildState(currentStateModal, newStateModal, true);
    window.history.replaceState({ ...window.history.state, ...data }, '', url);
  }
};

function buildState(currentStateModal: Modal | null, newStateModal: Modal | null, skipAdd = false) {
  let searchParams = new URLSearchParams(window.location.search);

  if (currentStateModal) {
    searchParams = removeModalFromSearchParams(searchParams, currentStateModal);
  }

  if (newStateModal && !skipAdd) {
    searchParams = addModalToSearchParams(searchParams, newStateModal);
  }

  const url = buildUrl(searchParams);
  const data = {
    modals: getActiveStack(),
  };

  return { url, data };
}

function buildUrl(urlSearchParams: URLSearchParams) {
  const path = window.location.pathname.toString();
  const search = urlSearchParams.toString() ? '?' + urlSearchParams.toString() : '';
  const hash = window.location.hash.toString() ? '#' + window.location.hash.toString() : '';
  return '' + path + search + hash;
}

function removeModalFromSearchParams(urlSearchParams: URLSearchParams, modal: Modal) {
  urlSearchParams.delete('modal');
  for (const key in modal.params) {
    urlSearchParams.delete(key);
  }
  return urlSearchParams;
}

function addModalToSearchParams(urlSearchParams: URLSearchParams, modal: Modal) {
  const modalParams = { modal: modal.id, ...modal.params };
  for (const key in modalParams) {
    urlSearchParams.append(key, modalParams[key as keyof typeof modalParams].toString());
  }
  return urlSearchParams;
}

import { Modal } from '../types';

export const getModalFromUrl = (): Modal | null => {
  const urlSearchParams = new URLSearchParams(window.location.search);
  const params = Object.fromEntries(urlSearchParams.entries());

  const { modal: id, ...modalParams } = params;
  if (!id) {
    return null;
  }

  return {
    id: `${id}`,
    params: modalParams,
  };
};

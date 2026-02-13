import api from "./api";

export const fetchPendingCallbacks = async (page = 1) => {
  const res = await api.get(
    `/api/admin/callback/pending-callbackrequests?page=${page}`,
  );
  return res.data.data;
};

export const assignCaregiver = async (
  callbackId: string,
  caregiverId: string,
) => {
  const res = await api.post(
    `/api/admin/callback/callback-requests/${callbackId}/assign`,
    {
      caregiverId,
    },
  );
  return res.data;
};

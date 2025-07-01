import { getAccessToken } from '../utils/auth';
import { BASE_URL } from '../config';

const ENDPOINTS = {
  REGISTER: `${BASE_URL}/register`,
  LOGIN: `${BASE_URL}/login`,

  STORIES: `${BASE_URL}/stories`,
  STORY_DETAIL: (id) => `${BASE_URL}/stories/${id}`,
  ADD_STORY: `${BASE_URL}/stories`,
  GUEST_STORY: `${BASE_URL}/stories/guest`,
  SUBSCRIBE: `${BASE_URL}//notifications/subscribe`,
  UNSUBSCRIBE: `${BASE_URL}//notifications/subscribe`,
};

export async function getRegistered({ name, email, password }) {
  const data = JSON.stringify({ name, email, password });

  const fetchResponse = await fetch(ENDPOINTS.REGISTER, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: data,
  });
  const json = await fetchResponse.json();

  return {
    ...json,
    ok: !json.error,
  };
}

export async function getLogin({ email, password }) {
  const data = JSON.stringify({ email, password });

  try {
    const fetchResponse = await fetch(ENDPOINTS.LOGIN, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: data,
    });

    const json = await fetchResponse.json();

    return {
      ...json,
      ok: !json.error,
      data: {
        accessToken: json.loginResult?.token || null,
        user: {
          id: json.loginResult?.userId || null,
          name: json.loginResult?.name || null,
        }
      }
    };
  } catch (error) {
    console.error('Fetch error:', error);
    throw error;
  }
}

export async function getAllStories({ page, size, location = 0 } = {}) {
  const accessToken = getAccessToken();

  let url = ENDPOINTS.STORIES;
  const params = new URLSearchParams();

  if (page !== undefined) params.append('page', page);
  if (size !== undefined) params.append('size', size);
  if (location !== undefined) params.append('location', location);

  if (params.toString()) {
    url += `?${params.toString()}`;
  }

  const fetchResponse = await fetch(url, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  const json = await fetchResponse.json();

  return {
    ...json,
    ok: !json.error,
    data: json.listStory || [],
  };
}

export async function getStoryById(id) {
  const accessToken = getAccessToken();

  const fetchResponse = await fetch(ENDPOINTS.STORY_DETAIL(id), {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  const json = await fetchResponse.json();

  return {
    ...json,
    ok: !json.error,
    data: json.story || null,
  };
}

export async function storeNewStory({
  description,
  photo,
  lat = null,
  lon = null,
}) {
  const accessToken = getAccessToken();

  const formData = new FormData();
  formData.set('description', description);
  formData.set('photo', photo);

  if (lat !== null) formData.set('lat', lat);
  if (lon !== null) formData.set('lon', lon);

  const fetchResponse = await fetch(ENDPOINTS.STORIES, {
    method: 'POST',
    headers: { Authorization: `Bearer ${accessToken}` },
    body: formData,
  });
  const json = await fetchResponse.json();

  return {
    ...json,
    ok: !json.error,
  };
}

export async function storeNewStoryAsGuest({
  description,
  photo,
  lat = null,
  lon = null,
}) {
  const formData = new FormData();
  formData.set('description', description);
  formData.set('photo', photo);

  if (lat !== null) formData.set('lat', lat);
  if (lon !== null) formData.set('lon', lon);

  const fetchResponse = await fetch(ENDPOINTS.GUEST_STORY, {
    method: 'POST',
    body: formData,
  });
  const json = await fetchResponse.json();

  return {
    ...json,
    ok: !json.error,
  };
}

export async function storeNewReport({
  title,
  description,
  evidenceImages,
  latitude,
  longitude
}) {
  try {
    const photo = evidenceImages && evidenceImages.length > 0
      ? evidenceImages[0]
      : null;

    if (!photo) {
      return {
        ok: false,
        message: 'Dokumentasi foto diperlukan',
      };
    }


    return await storeNewStory({
      description: `${title}`,
      photo: photo,
      lat: latitude,
      lon: longitude,
    });
  } catch (error) {
    console.error('storeNewReport error:', error);
    return {
      ok: false,
      message: error.message || 'Terjadi kesalahan saat menyimpan laporan',
    };
  }
}

export async function getAllCommentsByReportId(reportId) {
  try {
    const dummyResponse = {
      ok: true,
      message: 'Fitur komentar belum tersedia',
      data: []
    };
    return dummyResponse;
  } catch (error) {
    console.error('getAllCommentsByReportId error:', error);
    return {
      ok: false,
      message: error.message || 'Terjadi kesalahan saat mengambil komentar',
      data: []
    };
  }
}

export async function storeNewCommentByReportId(reportId, { body }) {
  try {
    const dummyResponse = {
      ok: false,
      message: 'Fitur komentar belum tersedia',
    };
    return dummyResponse;
  } catch (error) {
    console.error('storeNewCommentByReportId error:', error);
    return {
      ok: false,
      message: error.message || 'Terjadi kesalahan saat menyimpan komentar',
    };
  }
}

export async function getReportById(id) {
  return getStoryById(id);
}

export async function subscribePushNotification({ endpoint, keys: { p256dh, auth } }) {
  const accessToken = getAccessToken();
  const data = JSON.stringify({
    endpoint,
    keys: { p256dh, auth },
  });

  const fetchResponse = await fetch(ENDPOINTS.SUBSCRIBE, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${accessToken}`,
    },
    body: data,
  });
  const json = await fetchResponse.json();

  return {
    ...json,
    ok: fetchResponse.ok,
  };
}

export async function unsubscribePushNotification({ endpoint }) {
  const accessToken = getAccessToken();
  const data = JSON.stringify({ endpoint });

  const fetchResponse = await fetch(ENDPOINTS.UNSUBSCRIBE, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${accessToken}`,
    },
    body: data,
  });
  const json = await fetchResponse.json();

  return {
    ...json,
    ok: fetchResponse.ok,
  };
}
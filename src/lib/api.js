const API_URL = "/api/backend";

async function apiRequest(endpoint, options = {}) {
  if (!API_URL) {
    throw new Error("Backend API URL is not configured.");
  }

  const response = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    credentials: "include",
    headers: {
      Accept: "application/json",
      ...(options.body ? { "Content-Type": "application/json" } : {}),
      ...options.headers,
    },
    cache: "no-store",
  });

  const result = await response.json().catch(() => null);

  if (!response.ok) {
    throw new Error(
      result?.message || `API request failed: ${response.status}`
    );
  }

  if (result?.success === false) {
    throw new Error(result?.message || "Something went wrong.");
  }

  return result?.data ?? result;
}

export async function getStudios(params = {}) {
  const query = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== "") {
      query.set(key, value);
    }
  });

  const suffix = query.toString() ? `?${query.toString()}` : "";
  return apiRequest(`/api/studios${suffix}`);
}

export async function getFeaturedStudios() {
  return apiRequest("/api/studios?limit=6");
}

export async function getStudioById(id) {
  return apiRequest(`/api/studios/${id}`);
}

export async function getCategories() {
  return apiRequest("/api/categories");
}

export async function createStudio(studioData) {
  return apiRequest("/api/studios", {
    method: "POST",
    body: JSON.stringify(studioData),
  });
}

export async function getMyListings() {
  return apiRequest("/api/studios/my-listings");
}

export async function updateStudio(id, studioData) {
  return apiRequest(`/api/studios/${id}`, {
    method: "PUT",
    body: JSON.stringify(studioData),
  });
}

export async function deleteStudio(id) {
  return apiRequest(`/api/studios/${id}`, {
    method: "DELETE",
  });
}

export async function createBooking(bookingData) {
  return apiRequest("/api/bookings", {
    method: "POST",
    body: JSON.stringify(bookingData),
  });
}

export async function getMyBookings() {
  return apiRequest("/api/bookings/my-bookings");
}

export async function cancelBooking(id) {
  return apiRequest(`/api/bookings/${id}/cancel`, {
    method: "PATCH",
  });
}

export async function deleteBooking(id) {
  return apiRequest(`/api/bookings/${id}`, {
    method: "DELETE",
  });
}

export async function getProfile() {
  return apiRequest("/api/profile");
}

export async function updateProfile(profileData) {
  return apiRequest("/api/profile", {
    method: "PATCH",
    body: JSON.stringify(profileData),
  });
}


export async function getHostBookings() {
  return apiRequest("/api/bookings/host-bookings");
}


export async function updateHostBookingStatus(id, status) {
  return apiRequest(`/api/bookings/${id}/status`, {
    method: "PATCH",
    body: JSON.stringify({ status }),
  });
}








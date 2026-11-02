
const API_URL = process.env.NEXT_PUBLIC_API_URL;

async function apiRequest(endpoint, options = {}) {
  if (!API_URL) {
    throw new Error("Backend API URL is not configured.");
  }

  const response = await fetch(`${API_URL}${endpoint}`, {
    ...options,
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

// Get all studios with optional filters
export async function getStudios({
  search = "",
  category = "",
  location = "",
  limit,
} = {}) {
  const params = new URLSearchParams();

  if (search) params.set("search", search);
  if (category) params.set("category", category);
  if (location) params.set("location", location);
  if (limit) params.set("limit", String(limit));

  const query = params.toString();

  return apiRequest(`/api/studios${query ? `?${query}` : ""}`);
}

// Get featured studios for Home Page
export async function getFeaturedStudios() {
  return getStudios({ limit: 6 });
}

// Get one studio by ID
export async function getStudioById(id) {
  if (!id) {
    throw new Error("Studio ID is required.");
  }

  return apiRequest(`/api/studios/${encodeURIComponent(id)}`);
}

// Get all categories
export async function getCategories() {
  return apiRequest("/api/categories");
}

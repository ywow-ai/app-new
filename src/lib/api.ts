const API_BASE_URL = "https://dummyjson.com";

// Helper untuk membuat request dengan auth header
const makeRequest = async (
  endpoint: string,
  options: RequestInit = {}
): Promise<Response> => {
  const user = JSON.parse(localStorage.getItem("user") || "null");
  const token = user?.token;

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...(options.headers as Record<string, string>),
  };

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers,
  });

  if (!response.ok) {
    throw new Error(`API Error: ${response.statusText}`);
  }

  return response;
};

// Dashboard API
export const dashboardApi = {
  getStats: async () => {
    // Simulasi stats dari beberapa endpoint
    const [users, products, posts] = await Promise.all([
      makeRequest("/users?limit=100").then((r) => r.json()),
      makeRequest("/products?limit=100").then((r) => r.json()),
      makeRequest("/posts?limit=100").then((r) => r.json()),
    ]);

    return {
      totalUsers: users.total || 0,
      totalProducts: products.total || 0,
      totalPosts: posts.total || 0,
      activeUsers: Math.floor((users.total || 0) * 0.7),
      userGrowth: 12.5,
      productGrowth: 8.3,
      postGrowth: -2.1,
    };
  },
};

// Master Data API
export const masterDataApi = {
  getUsers: async (limit = 20, skip = 0, search = "") => {
    // DummyJSON users endpoint doesn't support search directly
    // We'll fetch all and filter client-side, or use a different approach
    const response = await makeRequest(
      `/users?limit=${limit}&skip=${skip}`
    );
    const data = await response.json();
    
    // Client-side filtering if search is provided
    if (search) {
      const searchLower = search.toLowerCase();
      data.users = data.users.filter((user: any) =>
        `${user.firstName} ${user.lastName}`.toLowerCase().includes(searchLower) ||
        user.email.toLowerCase().includes(searchLower) ||
        user.username.toLowerCase().includes(searchLower)
      );
      data.total = data.users.length;
    }
    
    return data;
  },
  getProducts: async (limit = 20, skip = 0, search = "") => {
    const searchParam = search ? `&q=${encodeURIComponent(search)}` : "";
    const response = await makeRequest(
      `/products/search?limit=${limit}&skip=${skip}${searchParam}`
    );
    return response.json();
  },
};


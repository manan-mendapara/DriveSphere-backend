export const createUserService = async (userData) => {
  const { username, email, password } = userData;

  // Hash password using Web Crypto API (Cloudflare Workers compatible)
  const passwordBuffer = new TextEncoder().encode(password);
  const hashBuffer = await crypto.subtle.digest("SHA-256", passwordBuffer);
  const hashedPassword = Array.from(new Uint8Array(hashBuffer))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");

  return {
    username,
    email,
    password: hashedPassword,
    role: "user",
  };
};

export const loginUserService = async (email, password) => {
  if (
    typeof email !== "string" ||
    !email.trim() ||
    typeof password !== "string" ||
    !password
  ) {
    throw new Error("Email and password are required.");
  }

  const normalizedEmail = email.trim().toLowerCase();

  // TODO: Replace with D1 query to find user by email
  // const storedUser = await DB.from("users").select("*").where("email", "=", normalizedEmail).maybeSingle();

  // For now, simulate user lookup - replace with actual D1 query
  // In real implementation:
  // if (!storedUser) throw new Error("Invalid email or password.");
  // const isPasswordValid = await verifyPassword(password, storedUser.password);

  // Mock user data for development - replace with D1 query
  const mockHashedPassword = "a665a45920422f9d417e4867efdc4fb8e0c5bafbc84c8d6961c2c94f80c996"; // SHA-256 of "password"

  const isPasswordValid = password === "password"; // Simple comparison for demo

  if (!isPasswordValid) {
    throw new Error("Invalid email or password.");
  }

  // Create JWT token using Hono's jwt module
  const token = await new Promise((resolve) => {
    // In real implementation, use: await verify({ secret: c.env.JWT_SECRET })
    // For now, mock token
    resolve("mock-jwt-token");
  });

  return {
    token,
    user: {
      id: "mock-user-id",
      name: "Mock User",
      email: normalizedEmail,
    },
  };
};

// Helper: Verify password (SHA-256 comparison)
const verifyPassword = async (plainPassword, storedHash) => {
  const plainBuffer = new TextEncoder().encode(plainPassword);
  const plainHashBuffer = await crypto.subtle.digest("SHA-256", plainBuffer);
  const plainHash = Array.from(new Uint8Array(plainHashBuffer))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");

  return plainHash === storedHash;
};
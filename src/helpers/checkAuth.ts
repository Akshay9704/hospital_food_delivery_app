import axios from "axios";

// Function to fetch user data
export async function getUser() {
  try {
    const response = await axios.get("/api/users/me");
    return response.data; 
  } catch (error) {
    console.error("Error fetching user:", error);
    throw new Error("Failed to fetch user data");
  }
}

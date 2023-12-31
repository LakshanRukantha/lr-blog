// Fetch user data from the server using the email address (calling the /api/user route)
// TODO: Add try catch block for error handling
export async function getUserData(email: string): Promise<any> {
  const response = await fetch("/api/user", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email }),
  });

  if (response.ok) {
    const data = await response.json();
    return data;
  } else {
    console.log("Error fetching user data");
    throw new Error("Error fetching user data");
  }
}

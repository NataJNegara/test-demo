// ----------------------------LOGIN
export async function login(email, password) {
  const res = await fetch("/api/users/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });

  const data = await res.json();

  if (!res.ok) {
    throw Error(data.error);
  }

  localStorage.setItem("token", data.token);
  localStorage.setItem("email", data.email);

  return data;
}

// ----------------------------SIGNUP
export async function signUp(email, password, passwordConfirm) {
  if (!email || !password || !passwordConfirm) {
    throw Error("all field are required");
  }

  if (password !== passwordConfirm) {
    throw Error("confirm password is not matched!");
  }

  const res = await fetch("/api/users", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password, passwordConfirm }),
  });

  const data = await res.json();

  if (!res.ok) {
    throw Error(data.error);
  }

  localStorage.setItem("token", data.token);
  localStorage.setItem("email", data.email);

  return data;
}

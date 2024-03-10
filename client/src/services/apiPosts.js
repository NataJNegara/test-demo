// -------------------------GET ALL POST
export async function getPosts() {
  const res = await fetch("/api/posts/");
  const data = await res.json();

  if (!res.ok) {
    throw Error(data.error);
  }

  return data;
}

// -------------------------GET ALL POST OWN BY LOGGED USER
export async function getUserPosts() {
  const res = await fetch("/api/posts/user", {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });

  const data = await res.json();

  if (!res.ok) {
    throw Error(data.error);
  }

  return data;
}

// -------------------------CREATE NEW POST
export async function addPost(title, body) {
  const res = await fetch("/api/posts/", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ title, body }),
  });

  const data = await res.json();

  if (!res.ok) {
    throw Error(data.error);
  }

  return data;
}

// -------------------------DELETE POST
export async function deletePost(_id) {
  const res = await fetch(`/api/posts/${_id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });

  const data = await res.json();

  if (!res.ok) {
    throw Error();
  }

  return data;
}

// -------------------------UPDATE POST
export async function updatePost(_id, title, body) {
  const res = await fetch(`/api/posts/${_id}`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ title, body }),
  });

  const data = await res.json();

  if (!res.ok) {
    throw Error(data.error);
  }

  return data;
}

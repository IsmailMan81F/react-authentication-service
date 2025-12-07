export async function Signin(reqBody) {
  const res = await fetch("http://localhost:3500/auth", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username: reqBody.username,
      password: reqBody.password,
    }),
    mode: "cors",
    credentials: "include",
    referrerPolicy: "no-referrer",
  });

  if (!res.ok) {
    throw new Error("Wrong info... Try again");
  }
  const data = await res.json();
  return data[1].accessToken;
}

export async function Signup(reqBody) {
  const res = await fetch("http://localhost:3500/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username: reqBody.username,
      password: reqBody.password,
      roles: reqBody.roles,
    }),
    mode: "cors",
    credentials: "include",
  });

  if (!res.ok) {
    throw new Error("User already exists");
  }
}

export async function VerifyAuth(accessToken) {
  const res = await fetch("http://localhost:3500/verify", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  });
  if (!res.ok) throw new Error("AccessToken expired... Login again!");
}

export async function Quit() {
  await fetch("http://localhost:3500/logout", {
    method: "GET",
    credentials: true,
  });
}

export const getNewAccessToken = async (
  refresh_token: string | null | undefined,
  callback: any
) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_DOMAIN}/users/refresh-token `,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${refresh_token}`,
        },
      }
    );
    const res = await response.json();
    if (res.errors) {
      throw new Error(res.errors);
    } else {
      callback(null, res.data.access_token);
      //return access_token langsung
    }
  } catch (error) {
    callback(error, null);
    return;
  }
};

export const accessTokenVerify = async (
  token: string | null | undefined,
  callback: any
) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_DOMAIN}/users/verify-token`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const res = await response.json();
    if (res.errors) {
      throw new Error(res.errors);
    } else {
      callback(true);
    }
    return;
  } catch (error) {
    callback(false);
    return;
  }
};
//return status access token

export const resetPasswordTokenVerify = async (
  token: string | null | undefined,
  cb: any
) => {
  try {
    const responses = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_DOMAIN}/users/verify-token/reset-password`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const res = await responses.json();
    if (res.errors) {
      throw new Error(res.message);
    } else {
      cb(true);
    }
    return;
  } catch (error) {
    cb(false);
    return;
  }
};

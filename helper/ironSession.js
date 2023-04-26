import { withIronSessionApiRoute, withIronSessionSsr } from "iron-session/next";

const sessionData = {
    cookieName: "BT_TOKT24",
    password: process.env.SESSION_PASSWORD,
    cookieOptions: {
      secure: process.env.NODE_ENV === "production",
    },
}

export const withSessionApi = (fun) => {
    return withIronSessionApiRoute(fun, sessionData)
}

export const withSessionSsr = (fun) => {
    return withIronSessionSsr(fun, sessionData)
}
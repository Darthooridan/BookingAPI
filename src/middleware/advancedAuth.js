import { auth } from "express-oauth2-jwt-bearer";

const authMiddleware = auth({
  audience: "https://booking_api",
  issuerBaseURL: 'https://dev-iyc1fmratxrne38v.us.auth0.com/',
  tokenSigningAlg: 'RS256'
});

export default authMiddleware;
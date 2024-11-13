import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';

export default createMiddleware(routing);

export const config = {
    // For more discussion on this config option, see:
    // https://github.com/vercel/next.js/discussions/36308
    matcher: "/((?!api|static|.*\\..*|_next).*)",
};

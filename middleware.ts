import { NextFetchEvent, NextResponse, NextRequest } from 'next/server'
import { deleteCookie, setCookie, removeCookies } from 'cookies-next'
// import axios from 'axios';

// async function validate() {
//     const data = await axios.get(`${process.env.API_URL}/auth/validate`)
//     console.log(data);
// }

export async function middleware(req: NextRequest, ev: NextFetchEvent, res: NextResponse) {
    const cookie = req.cookies.get('factuToken');
    if (!cookie) {
        return NextResponse.redirect(new URL('/login', req.url));
    }
    const _body = {
        jwt: cookie.value
    }
    if (cookie) {
        const res = await fetch(`${process.env.API_URL}/auth/validate`,
            {
                method: 'POST',
                body: JSON.stringify(_body),
                headers: { "Content-type": "application/json; charset=UTF-8" }
            })
        const { statusCode } = await res.json();
        if (statusCode === 401) {
            return NextResponse.redirect(new URL('/login', req.url));
        }

        if (req.nextUrl.pathname.includes('/login')) {
            return NextResponse.redirect(new URL('/dashboard', req.url));
        }

    }

    // if (req.nextUrl.pathname.includes('/dashboard')) {
    //     if (!cookie) {
    //         return NextResponse.redirect(new URL('/login', req.url));
    //     }
    // }

    // if (req.nextUrl.pathname.includes('/login')) {
    //     if (cookie) {
    //         const data = await axios.get(`${process.env.API_URL}/auth/validate`)
    //         console.log(data);
    //         return NextResponse.redirect(new URL('/dashboard', req.url));
    //     }
    // }

    return NextResponse.next()
}

export const config = {
    matcher: ['/dashboard'],
}
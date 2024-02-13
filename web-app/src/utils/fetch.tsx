import { API_URL } from "../config";

interface IResult<T = any> {
    ok: boolean;
    message?: string;
    data?: T;
}

export const fetchWithoutToken = async <T = any>(endpoint: string, data?: any, method = 'GET', external?: boolean): Promise<IResult<T>> => {
    const url = (!external ? `${API_URL}/` : '') + endpoint;
    console.log(url);

    let resp: Response = {} as any;

    try {
        if (method === 'GET') {
            resp = await fetch(url, {
                // mode: 'cors',
                method,
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                },
            });
        } else {
            resp = await fetch(url, {
                method,
                // mode: 'cors',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                },
                body: JSON.stringify(data ?? {}),
            });
            console.log(resp);
        }

        if (resp.ok) return { ok: true, data: await resp.json() };
        else return { ok: false, message: resp.statusText };

    } catch (error: any) {
        console.warn(error.message);
        return {
            ok: false,
            message: error.message,
        };
    }
};
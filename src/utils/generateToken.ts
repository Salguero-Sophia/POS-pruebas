export const generateToken = async () => {

    const request = await fetch(`/api/${import.meta.env.VITE_URL_CREATE_TOKE}`, {
        headers: {
            'accept' : '*',
            'secretKey' : import.meta.env.VITE_SECRET_KEY,
            'membershipId' : import.meta.env.VITE_MEMBERSHIP_ID,
        }
    });

    const { accessToken: { token } } = await request.json();

    return token;

}
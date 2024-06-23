import jwt from 'jsonwebtoken';

export const createToken = async (data: object): Promise<string> => {
    if (!process.env.SECRET_KEY) {
        throw new Error('SECRET_KEY is not defined in the environment variables.');
    }

    const token = await jwt.sign(data, process.env.SECRET_KEY, { expiresIn: '7d' });
    return token;
};

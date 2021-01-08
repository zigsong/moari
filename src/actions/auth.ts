import { AuthResponse } from 'store/types';
import axios, { AxiosError } from 'axios';
import { createAsyncAction } from 'typesafe-actions';
import { USER_SERVER } from '../components/Config';

export const AUTH = {
    REQUEST: 'AUTH_REQUEST',
    SUCCESS: 'AUTH_SUCCESS',
    FAILURE: 'AUTH_FAILURE'
}

interface AuthPayload {
    history: any;
    option: boolean | null;
    adminRoute: any;
}

export const auth =
    createAsyncAction(
        AUTH.REQUEST,
        AUTH.SUCCESS,
        AUTH.FAILURE
    )<AuthPayload, AuthResponse, AxiosError>();

export async function authRequest({history, option, adminRoute}: AuthPayload) {
    const response = await axios.get(`${USER_SERVER}/auth`,  { withCredentials: true });
    return response.data;
}
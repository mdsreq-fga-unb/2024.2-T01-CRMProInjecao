'use client';

import { useEffect, useReducer, useCallback, useMemo } from 'react';
// utils
import axios, { endpoints } from '@/utils/axios';
import { useRouter } from 'next/navigation';
import { paths } from '@/routes/paths';
import { AuthContext } from './auth-context';
import { isValidToken, setSession } from './utils';
import { ActionMapType, AuthStateType, AuthUserType } from '../../types';

enum Types {
  INITIAL = 'INITIAL',
  LOGIN = 'LOGIN',
  REGISTER = 'REGISTER',
  LOGOUT = 'LOGOUT',
}

type Payload = {
  [Types.INITIAL]: {
    user: AuthUserType;
  };
  [Types.LOGIN]: {
    user: AuthUserType;
  };
  [Types.REGISTER]: {
    user: AuthUserType;
  };
  [Types.LOGOUT]: undefined;
};

type ActionsType = ActionMapType<Payload>[keyof ActionMapType<Payload>];

// ----------------------------------------------------------------------

const initialState: AuthStateType = {
  user: null,
  loading: true,
};

const reducer = (state: AuthStateType, action: ActionsType) => {
  if (action.type === Types.INITIAL) {
    return {
      loading: false,
      user: action.payload.user,
    };
  }
  if (action.type === Types.LOGIN) {
    return {
      ...state,
      user: action.payload.user,
    };
  }
  if (action.type === Types.REGISTER) {
    return {
      ...state,
      user: action.payload.user,
    };
  }
  if (action.type === Types.LOGOUT) {
    return {
      ...state,
      user: null,
    };
  }
  return state;
};
// ----------------------------------------------------------------------

const STORAGE_KEY = 'accessToken';

type Props = {
  children: React.ReactNode;
};

export function AuthProvider({ children }: Props) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const router = useRouter();
  const initialize = useCallback(async () => {
    try {
      const accessToken = sessionStorage.getItem(STORAGE_KEY);

      if (accessToken && isValidToken(accessToken)) {
        setSession(accessToken);

        const res = await axios.get(`/auth/profile`); // recebe usuario logado

        dispatch({
          type: Types.INITIAL,
          payload: {
            user: res.data,
          },
        });
      } else {
        dispatch({
          type: Types.INITIAL,
          payload: {
            user: null,
          },
        });
      }
    } catch (error) {
      console.error(error);
      dispatch({
        type: Types.INITIAL,
        payload: {
          user: null,
        },
      });
    }
  }, []);

  useEffect(() => {
    initialize();
  }, [initialize]);

  // LOGIN
  const login = useCallback(async (email: string, password: string) => {
    const data = {
      email,
      password,
    };

    const response = await axios.post(endpoints.auth.login, data);

    const {
      access_token,
    }: {
      access_token: string;
    } = response.data;

    setSession(access_token);

    const res = await axios.get(`/auth/profile`);
    dispatch({
      type: Types.LOGIN,
      payload: {
        user: res.data,
      },
    });
  }, []);

  const register = useCallback(
    async (email: string, password: string) => {
      const data = {
        email,
        password,
      };

      const res = await axios.post(endpoints.auth.register, data);

      dispatch({
        type: Types.REGISTER,
        payload: {
          user: null,
        },
      });

      if (res && res.status === 201) {
        router.push(paths.dashboard.root);
      }
    },
    [router]
  );

  const validateToken = useCallback(async (token: string) => {
    const response = await axios.post(endpoints.auth.validateToken, { token });

    const { access_token, user: receivedUser } = response.data;
    // const access_token="acesstoken";

    sessionStorage.setItem(STORAGE_KEY, access_token);
    setSession(access_token);
    const res = await axios.get(`/users/${+receivedUser.id}`);

    dispatch({
      type: Types.LOGIN,
      payload: {
        user: res.data,
      },
    });
  }, []);

  // LOGOUT
  const logout = useCallback(async () => {
    console.log('logout');

    setSession(null);
    dispatch({
      type: Types.LOGOUT,
    });
  }, []);

  // ----------------------------------------------------------------------

  const checkAuthenticated = state.user ? 'authenticated' : 'unauthenticated';

  const status = state.loading ? 'loading' : checkAuthenticated;

  const memoizedValue = useMemo(
    () => ({
      user: state.user,
      method: 'jwt',
      loading: status === 'loading',
      authenticated: status === 'authenticated',
      unauthenticated: status === 'unauthenticated',
      //
      login,
      register,
      validateToken,
      logout,
    }),
    [login, logout, register, validateToken, state.user, status]
  );
  // !todo: fix any
  return <AuthContext.Provider value={memoizedValue as any}>{children}</AuthContext.Provider>;
}

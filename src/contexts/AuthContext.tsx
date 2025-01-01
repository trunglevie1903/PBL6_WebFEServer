import axios from 'axios';
import React, { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const isAString = (str: string | null | undefined) => {
  return (str !== null && str !== undefined && str !== "");
}

interface ContextStateType {
  token: string,
  accessToken: string | null;
  refreshToken: string | null;
  username: string | null;
  role: string;
}

const ContextDefaultState: ContextStateType = {
  token: "0",
  accessToken: null,
  refreshToken: null,
  username: null,
  role: 'guest',
}

const loadContextFirstState = (): ContextStateType => {
  return {
    token: isAString(localStorage.getItem('token')) ? localStorage.getItem('token')! : ContextDefaultState.token,
    accessToken: isAString(localStorage.getItem('accessToken')) ? localStorage.getItem('accessToken') : ContextDefaultState.accessToken,
    refreshToken: isAString(localStorage.getItem('refreshToken')) ? localStorage.getItem('refreshToken') : ContextDefaultState.refreshToken,
    username: isAString(localStorage.getItem('username')) ? localStorage.getItem('username') : ContextDefaultState.username,
    role: isAString(localStorage.getItem('role')) ? localStorage.getItem('role')! : ContextDefaultState.role,
  };
};

interface ContextProviderPropType {
  token: string;
  accessToken: string | null;
  refreshToken: string | null;
  username: string | null;
  role: string;
  checkTokenValidity: () => Promise<boolean>;
  checkIsUser: () => boolean;
  isUser: () => Promise<boolean>;
  isAuthenticated: () => Promise<boolean>;
  signIn: (obj: ContextStateType) => Promise<void>;
  signOut: () => Promise<void>;
  changeToken: () => void;
  checkToken: () => boolean;
}

interface ContextChildType {
  children: ReactNode;
}

const isTokenExpired = (token: string): boolean => {
  try {
    const { exp } = JSON.parse(atob(token.split('.')[1])); // Decode JWT payload
    return Date.now() >= exp * 1000; // Compare current time with expiry
  } catch {
    return true; // Treat invalid tokens as expired
  }
};

const AuthContext = createContext<ContextProviderPropType | undefined>(undefined);

export const AuthProvider: React.FC<ContextChildType> = ({children}) => {
  const [state, set_state] = useState<ContextStateType>(loadContextFirstState);

  // if any state has its value changed, save new value to localStorage
  useEffect(() => {
    localStorage.setItem('token', state.token);
  }, [state.token]);
  useEffect(() => {
    localStorage.setItem('accessToken', state.accessToken || "");
  }, [state.accessToken]);
  useEffect(() => {
    localStorage.setItem('refreshToken', state.refreshToken || "");
  }, [state.refreshToken]);
  useEffect(() => {
    localStorage.setItem('username', state.username || "");
  }, [state.username]);
  useEffect(() => {
    localStorage.setItem('role', state.role);
  }, [state.role]);

  // context functions
  const checkTokenValidity = async (): Promise<boolean> => {
    try {
      const stateAccessToken = state.accessToken;
      const stateRefreshToken = state.refreshToken;
      if ( !isAString(stateAccessToken) || !isAString(stateRefreshToken)) {
        return false;
      }
      // console.log(stateAccessToken, stateRefreshToken);
      const response = await axios.post(
        "http://127.0.0.1:4000/user/refresh-token",
        {
          accessToken: stateAccessToken,
          refreshToken: stateRefreshToken
        },
        {}
      );
      const resData: ContextStateType = response.data;
      if (!resData) throw new Error("Error checking token validity");
      if (
        !("accessToken" in resData) || !("refreshToken" in resData) 
        || !("username" in resData) || !("role" in resData)
      ) {
        throw new Error("Invalid response data");
      }
      if (
        (isAString(state.username) && state.username !== resData.username)
      ) {
        throw new Error("Credential mismatch");
      }
      await set_state(resData);
      return true;
    } catch (error) {
      console.error(`Error checking token validity: ${error}`);
      await set_state(ContextDefaultState);
      return false;
    }
  };
  const checkIsUser = (): boolean => {
    try {
      return (state.role === "user");
    } catch (error) {
      console.error(`Error checking if client is a user: ${error}`);
      return false;
    }
  };
  const isUser = async (): Promise<boolean> => {
    try {
      if (!await checkTokenValidity()) return false;
      if (!checkIsUser()) return false;
      return true;
    } catch (error) {
      console.error(`Error checking user's validity: ${error}`);
      return false;
    }
  };
  const isAuthenticated = async (): Promise<boolean> => {
    try {
      if (!isAString(state.accessToken) || !isAString(state.refreshToken)) {
        return false;
      }
      const accessToken = state.accessToken!;
      const refreshToken = state.refreshToken!;
      if (isTokenExpired(refreshToken)) {
        throw new Error("Refresh token is expired");
      }
      if (!isTokenExpired(accessToken)) {
        return true;
      }
      
      const response = await axios.post(
        "http://127.0.0.1:4000/user/soft-check-token-validity",
        {
          accessToken, refreshToken
        },
        {}
      );
      if (
        !response.data || !("accessToken" in response.data) 
        || !("refreshToken" in response.data)
      ) {
        throw new Error("Error refreshing token");
      }
      if (!isAString(response.data.accessToken) || !isAString(response.data.refreshToken)) {
        throw new Error("Invalid response data");
      }

      await set_state({
        ...state,
        accessToken: response.data.accessToken!,
        refreshToken: response.data.refreshToken!
      });
      return true;
    } catch (error) {
      console.error(`Error in quick check of token validity: ${error}`);
      return false;
    }
  };
  const signIn = async (obj: ContextStateType): Promise<void> => {
    try {
      set_state(obj);
      window.location.href = "/";
    } catch (error) {
      console.error(`Error signing in: ${error}`);
    }
    return;
  };
  const signOut = async (): Promise<void> => {
    try {
      set_state(ContextDefaultState);
      window.location.href = "/";
    } catch (error) {
      console.error(`Error signing out: ${error}`);
    }
    return;
  };
  const changeToken = () => {
    const newToken = state.token === "0" ? "1" : "0";
    set_state({
      ...state,
      token: newToken
    });
  }
  const checkToken = () => {
    const token = isAString(localStorage.getItem('token')) ? localStorage.getItem('token')! : ContextDefaultState.token;
    return (token === "1");
  };

  return (
    <AuthContext.Provider value={{
      ...state, checkTokenValidity, checkIsUser, isUser, 
      isAuthenticated, signIn, signOut, changeToken, checkToken
    }}>
      {children}
    </AuthContext.Provider>
  )
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
}
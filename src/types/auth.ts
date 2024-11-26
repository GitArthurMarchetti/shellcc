// src/types/auth.ts
export interface LoginFormData {
     email: string;
     password: string;
}

export interface SignupFormData {
     name: string;
     email: string;
     password: string;
     confirmPassword: string;
}

export interface LoginResponse {
     token: string;
     user: {
          id: number;
          name: string;
          email: string;
     };
}
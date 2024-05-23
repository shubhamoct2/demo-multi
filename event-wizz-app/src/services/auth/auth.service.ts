import CoreApi from "@/lib/core/api.core";
import API_ENDPOINTS from "@/lib/core/endpoints";

export type ResponseType = {
  status: boolean;
  data: [] | {} | null;
  errors: null | [] | {};
  message?: string;
  code?: string | number;
};

export type LoginInputType = {
  email: string;
  password: string;
  remember?: string;
};
export type RegisterUserInputType = {
  name?: string;
  email: string;
  password: string;
};
export type ChangePasswordInputType = {
  oldPassword: string;
  newPassword: string;
};
export type ForgetPasswordInputType = {
  email: string;
};
export type ResetPasswordInputType = {
  email: string;
  token: string;
  password: string;
};
export type VerifyPasswordInputType = {
  email: string;
  token: string;
};
export type SocialLoginInputType = {
  provider: string;
  access_token: string;
};

class Auth extends CoreApi {
  constructor(url: string) {
    super(url);
  }

  async login(credentials: LoginInputType) {
    await this.csrf();
    try {
      return await this.http
        .post(API_ENDPOINTS.LOGIN, credentials)
        .then((loginResponse) => {
          console.log(loginResponse,"loginResponse###");
        })
        .catch((error) => {
          console.log(error, " errorerrorerror");
          return error;
        });
    } catch (error) {
      console.log(error, " errorerrorerror");
    }
  }
  async register(credentials: RegisterUserInputType) {
    await this.csrf();
    await this.csrf();
    return await this.http
      .post(API_ENDPOINTS.REGISTER, credentials)
      .then((registerResponse: any) => {
        if (registerResponse?.data?.status == 200) {
          return registerResponse?.data;
        }
        return registerResponse?.data;
      })
      .catch((error: any) => {
        return error;
      });
  }
  async csrf() {
    await this.http.get(API_ENDPOINTS.TOKEN);
  }
}
const AuthService = new Auth("auth");
export default AuthService;

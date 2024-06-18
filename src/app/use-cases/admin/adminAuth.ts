import configKeys from "../../../config";
import { HttpStatus } from "../../../types/httpStatus";
import CustomError from "../../../utils/customError";
import { AuthServiceInterfaceType } from "../../service-interface/authServiceInterface";

export const loginAdmin = async (
    email: string,
    password: string,
    authService: ReturnType<AuthServiceInterfaceType>
  ) => {
    if (
      email === configKeys.ADMIN_EMAIL &&
      password === configKeys.ADMIN_PASSWORD
    ) {
      const {accessToken,refreshToken} = authService.createTokens(
        email,
        "Admin_User",
        "admin"
      );

      console.log('admin login');
      
      return  {accessToken,refreshToken} ;
    }
    throw new CustomError("Invalid credentials", HttpStatus.UNAUTHORIZED);
  };
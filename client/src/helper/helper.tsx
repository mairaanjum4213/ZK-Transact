import axios from 'axios';


axios.defaults.baseURL = import.meta.env.VITE_SERVER_DOMAIN;

/*interface TokenDecoded {
  exp: number;
  username: string;
  // Add other decoded token properties as needed
}*/

interface GetUserResponse {
  data?: any;
  error?: string;
}

interface RegisterUserResponse {
  error?: any;
}

interface VerifyPasswordResponse {
  data?: any;
  error?: string;
}

interface UpdateUserResponse {
  data?: any;
  error?: string;
}

interface VerifyOTPResponse {
  data?: any;
  status?: number;
  error?: any;
}

interface ResetPasswordResponse {
  data?: any;
  status?: number;
  error?: any;
}

interface BuyTokenResponse {
  error?: any;
}


/** To get username from Token */
/*export async function getUsername(): Promise<UsernameData | null> {
  const token: string | null = localStorage.getItem('token');
  if (!token) return Promise.reject("Cannot find Token");

  try {
    const decode: { username: string } = jwtDecode(token); // Adjust the type according to your token structure
    return { username: decode.username };
  } catch (error) {
    return null;
  }
}*/

/** To get username from Token */
/*export async function getUsername(): Promise<TokenDecoded | string> {
  const token = localStorage.getItem('token');
  if (!token) return Promise.reject('Cannot find Token');
  const decoded: TokenDecoded = jwt_decode(token);
  return decoded;
}*/

/** authenticate function */
export async function authenticate(username: string): Promise<any> {
  try {
      return await axios.post('/api/authenticate', { username });
  } catch (error) {
      return { error: "Username doesn't exist...!" };
  }
}



/** get User details */
export async function getUser({ username }: { username: string }): Promise<GetUserResponse> {
  try {
    const { data } = await axios.get(`/api/user/${username}`);
    return { data };
  } catch (error) {
    return { error: "Password doesn't Match...!" };
  }
}

/** register user function */
export async function registerUser(credentials: {
  username: string;
  email: string;
  fullName:string;
  region:string;
}): Promise<string | RegisterUserResponse> {
  try {
    const { data: { msg }, status } = await axios.post(`/api/register`, credentials);

    let { username, email } = credentials;

    /** send email */
    if (status === 201) {
      await axios.post('/api/registerMail', { username, userEmail: email, text: msg });
    }

    return Promise.resolve(msg);
  } catch (error) {
    return Promise.reject({ error });
  }
}

/** login function */
export async function verifyPassword({
  username,
  password,
}: {
  username: string;
  password: string;
}): Promise<VerifyPasswordResponse> {
  try {
    if (username) {
      const { data } = await axios.post('/api/login', { username, password });
      if (data) {
        return Promise.resolve({ data });
      } else {
        throw new Error('Invalid response from server');
      }
    }
    throw new Error('Username is empty');
  } catch (error) {
    return Promise.reject({ error: "Password doesn't Match...!" });
  }
}


/** update user profile function */
export async function updateUser(response: any): Promise<UpdateUserResponse> {
  try {
    const token = await localStorage.getItem('token');
    const data = await axios.put('/api/updateuser', response, { headers: { Authorization: `Bearer ${token}` } });

    return Promise.resolve({ data });
  } catch (error) {
    return Promise.reject({ error: "Couldn't Update Profile...!" });
  }
}


export interface GenerateOTPResponse {
  code: string;
  email: string;
  // Define other properties based on the actual response structure
}

export async function generateOTP(username: string): Promise<string> {
  try {
    const response = await axios.get<GenerateOTPResponse>('/api/generateOTP', { params: { username } });
    const { code, email } = response.data;

    if (response.status === 201) { // Check if the status is 200 (OK)
      const userDataResponse = await getUser({ username }); // Assuming getUser is defined
      const { email: userEmail } = userDataResponse.data;

      if (email || userEmail) {

        await axios.post('/api/registerMail2', {
          username,
          userEmail: email || userEmail,
          otp: code, // Pass the generated OTP value here
          subject: 'Password Recovery OTP',
        })
        .then(response => {
          console.log(response.data.message); // Log success message from the server
        })
        .catch(error => {
          console.error('Failed to send email:', error); // Log error if email sending fails
        });
      } else {
        throw new Error('No valid email found.');
      }
    } else {
      throw new Error('Failed to generate OTP.');
    }

    return code;
  } catch (error) {
    return Promise.reject(error);
  }
}


/** verify OTP */
export async function verifyOTP({ username, code }: { username: string; code: string }): Promise<VerifyOTPResponse> {
  try {
    const { data, status } = await axios.get('/api/verifyOTP', { params: { username, code } });
    return { data, status };
  } catch (error) {
    return Promise.reject(error);
  }
}

/** reset password */
export async function resetPassword({ username, password }: { username: string; password: string }): Promise<ResetPasswordResponse> {
  try {
    const { data, status } = await axios.put('/api/resetPassword', { username, password });
    return Promise.resolve({ data, status });
  } catch (error) {
    return Promise.reject({ error });
  }
}





//__________________________________________________Buy Tokens _________________________________________//

/** register user function */
/*export async function storebuyToken(credentials: {
  buyer:string;
  metamaskAddress: string;
  serviceProviderName: string;
  localCurrency: number;
  TokensAmount: number;
  transactionFee: number;
}): Promise<string | BuyTokenResponse> {
  try {
    const { data: { msg }} = await axios.post(`/api/buyToken`, credentials);
    return Promise.resolve(msg);
  } catch (error) {
    return Promise.reject({ error });
  }
}*/

export async function storebuyToken(formData: FormData): Promise<string | BuyTokenResponse> {
  try {
    const response = await axios.post<string | BuyTokenResponse>('/api/buyToken', formData, {
      headers: {
        'Content-Type': 'multipart/form-data' // Ensure to set Content-Type header for FormData
      }
    });
    return Promise.resolve(response.data);
  } catch (error) {
    return Promise.reject({ error });
  }
}


//__________________________________________________ ↓  Sell  Tokens ↓ 
// POST
interface sellTokenResponse {
  error?: any;
}
export async function storesSellToken(sellTokendata: {
  seller: string;
  sellerMetamask: string;
  purchaserName: string;
  accountNumber: string;
  accountName: string;
  accountComments: string;
  contractHash:string;
  transactionFee?: number;
  localCurrencyAmount: number;
  Tokens?: number;
}): Promise<string | sellTokenResponse> {
  try {
    const { data: { msg }} = await axios.post('/api/sellToken', sellTokendata);
    return Promise.resolve(msg);
  } catch (error) {
    return Promise.reject({ error });
  }
}
// GET
interface GetSellToken {
  data?: any;
  error?: any;
}
export async function getSellToken(sellTokenId: string): Promise<GetSellToken> {
  try {
    const { data } = await axios.get(`/api/getselltokens/${sellTokenId}`);
    return data;
  } catch (error) {
    console.error("Failed to fetch sell token:", error);
    throw new Error("Failed to fetch sell token.");
  }
}

//_________________________________________________ ↑ Sell  Tokens  ↑ 


//_________________________________________________ ↓  Transfer  Tokens ↓ 

// POST
interface transferTokenResponse {
  error?: any;
}
export async function storesTransferToken(transferTokendata: {
  sender: any;
  beneficiaryMetamask: string;
  senderMetamask:string;
  transferContractHash: string;
  transferTokenAmount: number;
  transferTokendateTimeField:Date
}): Promise<string | transferTokenResponse> {
  try {
    const { data: { msg }} = await axios.post('/api/sellToken', transferTokendata);
    return Promise.resolve(msg);
  } catch (error) {
    return Promise.reject({ error });
  }
}

//_________________________________________________ ↑ Transfer  Tokens  ↑ 



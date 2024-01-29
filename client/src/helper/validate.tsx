import { authenticate } from './helper'

interface FormValues {
  username: string;
  password: string;
  confirmpwd: string;
  email: string;
  fullName:string;
  mobile:string;
  address:string;
  // Add other form fields if present
}


interface Errors {
  [key: string]: string;
}

/*profile*/
export async function profileValidation(values: FormValues): Promise<Errors> {
  const errors: Errors = {};
  usernameVerify(errors, values);
  emailVerify(errors, values);

  return errors;
}

export async function loginValidate(values: FormValues): Promise<Errors> {
  const errors: Errors = {};

   usernameVerify(errors, values);

  if (values.username) {
    try {
      // check if the user exists
      const response = await authenticate(values.username);

      if (response && response.status !== 200) {
        errors.username = 'User does not exist';
      
      }
    } catch (error) {
      console.error('Error while checking user existence:', error);
      // Handle error from the authentication function as needed
      // For example, set a generic error message
      errors.exist = 'Error while checking user existence';
    }
  }
  passwordVerify(errors, values);
  return errors;
}


/* Validate login page username */
export async function usernameValidate(values: FormValues): Promise<Record<string, string>> {
  // Simulate an asynchronous validation check (e.g., API request)
  return new Promise<Record<string, string>>((resolve) => {
    // Mock async validation check
    setTimeout(() => {
      const errors: Record<string, string> = usernameVerify({}, values);
      resolve(errors);
    }, 1000); // Simulating a 1-second delay (replace this with your actual async operation)
  });
}

/* Validate password */
export async function passwordValidate(values: FormValues): Promise<Record<string, string>> {
  // Simulate an asynchronous validation check (e.g., API request)
  return new Promise<Record<string, string>>((resolve) => {
    // Mock async validation check
    setTimeout(() => {
      const errors: Record<string, string> = passwordVerify({}, values);
      resolve(errors);
    }, 1000); // Simulating a 1-second delay (replace this with your actual async operation)
  });
}

/* validate reset */
export async function resetpasswordValidate(values: FormValues): Promise<Record<string, string>> {
  // Simulate an asynchronous validation check (e.g., API request)
  return new Promise<Record<string, string>>((resolve) => {
    // Mock async validation check
    setTimeout(() => {
      const errors: Record<string, string> = passwordVerify({}, values);
      if (values.password !== values.confirmpwd) {
        errors.confirmpwd = "Password does not match";
      }
      resolve(errors);
    }, 1000); // Simulating a 1-second delay (replace this with your actual async operation)
  });
}

/** validate register form */
export async function registerValidation(values: FormValues): Promise<Errors> {
  const errors: Errors = {};
  usernameVerify(errors, values);
  passwordVerify(errors, values);
  emailVerify(errors, values);

  return errors;
}

function usernameVerify(errors: Record<string, string>, values: FormValues): Record<string, string> {
  if (!values.username) {
    errors.username = '*Username Required';
  } else if (values.username.includes(' ')) {
    errors.username = '*Invalid Username. !';
  }
  return errors;
}


function passwordVerify(errors: Record<string, string>, values: FormValues): Record<string, string> {
 const specialChars = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
  if (!values.password) {
    errors.password = '*Password Required';
  }
  else if(values.password.includes(" ")){
    errors.password = "*Wrong Password";
  }else if(values.password.length < 4){
    errors.password = "*Password must be more than 4 characters long";
  }else if(!specialChars.test(values.password)){
    errors.password = "*Password must have special character";
  }

  return errors;
}

const emailVerify = (error: Errors = {}, values: FormValues): Errors => {
  if (!values.email) {
    error.email = "*Email Required";
  } else if (values.email.includes(" ")) {
    error.email = "*Wrong Email";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{3,4}$/i.test(values.email)) {
    error.email = "*Invalid email address";
  }

  return error;
};

export default { usernameValidate, passwordValidate };

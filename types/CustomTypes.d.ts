export interface CustomError {
  status: number;
  msg: string;
}

export interface AuthError extends Error {
  errorInfo: {
    code: string;
    message: string;
  };
  codePrefix: string;
}

export interface Project {
  name: string;
  imgURL: string;
  description: string;
}

export interface ProjectRes extends Project {
  id: string;
}

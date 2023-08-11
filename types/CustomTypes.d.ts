export interface CustomError {
  status: number;
  msg: string;
}

export interface Project {
  name: string;
  imgURLwebm: string;
  imgURLmp4: string;
  description: string;
  githubFE: string;
  githubBE: string;
  livelink: string;
  stack: string;
}

export interface ProjectRes extends Project {
  id: string;
}

export interface EmailBody {
  name: string;
  email: string;
  subject: string;
  messageBody: string;
}

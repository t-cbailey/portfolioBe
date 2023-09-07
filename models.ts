import db from "./db/connection";
import { EmailBody, Project, ProjectRes, User } from "./types/CustomTypes";
const nodemailer = require("nodemailer");
import { auth } from "./EmailAuth.json";

exports.findAllProjects = (): Promise<Project[]> => {
  return db
    .collection("projects")
    .get()
    .then((snapshot) => {
      if (!snapshot.empty) {
        return snapshot.docs.map((doc) => {
          const id = doc.id;
          const data = doc.data();
          return { id, ...data } as ProjectRes;
        });
      }
      return [];
    });
};

exports.findProjectById = (project_id: string): Promise<Project> => {
  return db
    .collection("projects")
    .doc(project_id)
    .get()
    .then((snapshot) => {
      if (snapshot.exists) {
        return snapshot.data() as Project;
      }
      return Promise.reject({
        status: 404,
        msg: `No project found for project name: ${project_id}`,
      });
    });
};

exports.sendEmail = (body: EmailBody) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth,
  });

  async function main() {
    const info = await transporter
      .sendMail({
        from: `${body.name} <${body.email}>`,
        to: "timbaileydev@gmail.com",
        subject: `${body.subject}`,
        text: `${body.messageBody}`,
      })
      .catch((err: any) => {
        return Promise.reject({ status: 500, msg: err });
      });
  }

  return main()
    .then(() => {
      return "message sent";
    })
    .catch((err) => {
      return Promise.reject({ status: 500, msg: err });
    });
};

exports.findAllUsers = (): Promise<User[]> => {
  return db
    .collection("users")
    .get()
    .then((snapshot) =>
      snapshot.docs.map((doc) => {
        const id = doc.id;
        const data = doc.data();
        return { id, ...data } as User;
      })
    );
};

export const getUserByID = (user_id: string): Promise<User> => {
  return db
    .collection("users")
    .doc(user_id)
    .get()
    .then((snapshot) => {
      if (snapshot.exists) {
        const id = snapshot.id;
        const data = snapshot.data();
        return { id, ...data } as User;
      }
      return Promise.reject({
        status: 404,
        msg: `No user found for user_id: ${user_id}`,
      });
    });
};

export const postNewProject = (project: Project) => {
  const projectRef = db.collection("projects");
  return projectRef.get().then((snapshot) => {
    const project_id = `project_${snapshot.size + 1}`;
    const newProject = { id: project_id, ...project };
    return projectRef
      .doc(project_id)
      .set(newProject)
      .then(() => {
        return "created successfully";
      });
  });
};

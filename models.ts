import db from "./db/connection";
import { EmailBody, Project, ProjectRes } from "./types/CustomTypes";
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

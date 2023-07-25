import db from "./db/connection";
import { Project, ProjectRes } from "./types/CustomTypes";
const nodemailer = require("nodemailer");

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
        msg: `No park found for project name: ${project_id}`,
      });
    });
};

exports.sendEmail = (body: any) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "timbaileydevmailer@gmail.com",
      pass: "ywyjbdhpctijrcoc",
    },
  });

  console.log(body.name);
  async function main() {
    // send mail with defined transport object
    const info = await transporter.sendMail({
      from: `${body.name} <${body.email}>`, // sender address
      to: "timbaileydev@gmail.com", // list of receivers
      subject: `${body.subject}`, // Subject line
      text: `${body.messageBody}`, // plain text body
      // html: "<b>Hello world?</b>", // html body
    });

    console.log("Message sent: %s", info.messageId);
  }

  return main()
    .then(() => {
      return "message sent";
    })
    .catch(console.error);
};

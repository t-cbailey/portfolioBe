import db from "./db/connection";
import { Project, ProjectRes } from "./types/CustomTypes";

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

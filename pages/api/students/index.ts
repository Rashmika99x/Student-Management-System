import clientPromise from "../../../lib/mongodb";
import bcrypt from "bcrypt";

//expose an API to post a student data in the mongo database
export default async function handler(req: any, res: any) {
  const client = await clientPromise;
  const db = client.db();
  const studentsCollection = db.collection("students");

  const { method } = req;

  switch (method) {
    case "GET":
      try {
        const students = await studentsCollection.find({}).toArray();
        res.status(200).json({ success: true, data: students });
      } catch (error) {
        res.status(400).json({ success: false });
      }

      break;

    case "POST":
      try {
        const { name, grade, email, password } = req.body;
        //add hash password
        const hashPassword = await bcrypt.hash(password, 10);

        const newStudent = {
          name,
          grade,
          email,
          hashPassword,
        };

        const student = await studentsCollection.insertOne(newStudent);
        res.status(201).json({ success: true, data: student });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;

    default:
      res.status(400).json({ success: false });
      break;
  }
}

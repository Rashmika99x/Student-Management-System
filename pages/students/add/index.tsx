// pages/students/add.tsx
import React, { useState, ChangeEvent, FormEvent } from "react";
import {
  Container,
  Typography,
  TextField,
  Button,
  CircularProgress,
} from "@mui/material";
import { PageContainer } from "../style";

interface Student {
  name: string;
  grade: string;
  email: string;
  password: string;
}

const AddStudentPage: React.FC = () => {
  const [newStudent, setNewStudent] = useState<Student>({
    name: "",
    grade: "",
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setNewStudent({ ...newStudent, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      setIsLoading(true);
      const response = await fetch("/api/students", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newStudent),
      });

      if (response.ok) {
        // Redirect to the students list page after adding a new student
        window.location.href = "/students";
      } else {
        console.error("Failed to add student:", response.statusText);
      }
    } catch (error) {
      console.error("Error adding student:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <PageContainer>
      <Typography variant="h4" gutterBottom>
        Add Student
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Name"
          name="name"
          value={newStudent.name}
          onChange={handleInputChange}
          required
          fullWidth
          margin="normal"
          size="small"
        />
        <TextField
          label="Grade"
          name="grade"
          value={newStudent.grade}
          onChange={handleInputChange}
          required
          fullWidth
          margin="normal"
          size="small"
        />
        <TextField
          label="Email"
          name="email"
          type="email"
          value={newStudent.email}
          onChange={handleInputChange}
          required
          fullWidth
          margin="normal"
          size="small"
        />
        <TextField
          label="Password"
          name="password"
          type="password"
          value={newStudent.password}
          onChange={handleInputChange}
          required
          fullWidth
          margin="normal"
          size="small"
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          style={{ marginTop: "1rem" }}
        >
          Add Student
        </Button>
        {isLoading && <CircularProgress style={{ marginTop: '1rem' }} />}
      </form>
    </PageContainer>
  );
};

export default AddStudentPage;

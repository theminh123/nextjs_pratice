import { Student } from "@/types/student";
import { GetStaticPaths, GetStaticProps } from "next";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";

interface StudentDetail {
  data: Student;
}
export default function StudentDetailPage({ data }: StudentDetail) {
  return (
    <>
      <div>
        <TableContainer
          component={Paper}
          sx={{ mt: 4, mx: "auto", border: 1, width: "70%" }}
        >
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: "bold" }}>ID</TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>Name</TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>Class</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell>{data.id}</TableCell>
                <TableCell>{data.studentName}</TableCell>
                <TableCell>{data.className}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const students = await fetch("http://localhost:8000/student", {
    headers: {
      Authorization: `Bearer admin`,
    },
  }).then((res) => res.json());

  const paths = students.map((student: Student) => ({
    params: { id: student.id.toString() },
  }));

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async (context: any) => {
  const { id } = context.params ;

  const data = await fetch(`http://localhost:8000/student/searchid/${id}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer admin`,
    },
  }).then((res) => res.json());

  return {
    props: {
      data,
    },
    revalidate: 10,
  };
};

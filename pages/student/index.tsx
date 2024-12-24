import { Student } from "@/types/student";
import {
  Button,
  Input,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import axios from "axios";
import { useRouter } from "next/router";
import { useState } from "react";

interface StudentList {
  data: Student[];
}
export default function StudentListPage({ data }: StudentList) {
  const [searchName, setSearchName] = useState("");
  const [searchClass, setSearchClass] = useState("");

  const router = useRouter();
  const handleSearch = () => {
    router.push({
      pathname: '/student',
      query: { name: searchName, classname: searchClass },
    });
  };

  return (
    <>
      <div>
        <TableContainer component={Paper}  sx={{ mt: 4,mx: "auto", border: 1 , width: "70%"}} >
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow >
                <TableCell>
                <Input  placeholder="Search by name"  onChange={(e) => setSearchName(e.target.value)}/>
                <Input  sx ={{ ml: 2 }} placeholder="Search by class"  onChange={(e) => setSearchClass(e.target.value)}/>
                <Button sx={{bgcolor: "#3b82f6", color: "white", ml: 2}} onClick={handleSearch} >Search</Button>
                </TableCell>
                <TableCell align="right" sx={{fontWeight: "bold"}}>
                  <Button sx={{bgcolor: "#3b82f6", color: "white"}} onClick={() => router.push("/student/create")}>Create</Button>
                </TableCell>
              </TableRow>
              <TableRow >
                <TableCell  sx={{fontWeight: "bold"}}>Name</TableCell>
                <TableCell  sx={{fontWeight: "bold"}}>Detail</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((row) => (
                <TableRow
                  key={row.id}
                >
                  <TableCell>{row.studentName}</TableCell>
                  <TableCell > <Button sx={{bgcolor: "#3b82f6", color: "white"}} onClick={() => router.push(`/student/${row.id}`)}>Detail</Button></TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </>
  );
}

export const getServerSideProps = async (context: any) => {
  const { name, classname } = context.query;

  const allStudent  = await axios.get("http://localhost:8000/student", {
    headers: {
      Authorization: `Bearer admin`,
    },
  });

  let data = allStudent.data;


  if(name){
    const { data: studentByName } = await axios.get(`http://localhost:8000/student/searchname?name=${name}`, {
    headers: {
      Authorization: `Bearer admin`,
    },
  });
    data = studentByName
  }

  if(classname){
    console.log("ping")
    const { data: studentByClass } = await axios.get(`http://localhost:8000/student/searchclass?className=${classname}`, {
    headers: {
      Authorization: `Bearer admin`,
    },
  });

    data = studentByClass
  }

  

  return {
    props: { data },
  };
};


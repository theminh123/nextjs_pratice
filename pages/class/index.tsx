import { Class } from "@/types/class";
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

interface ClassList {
  data: Class[];
}
export default function StudentListPage({ data }: ClassList) {
  const router = useRouter();
  const [classes, setClasses] = useState(data);
  const [searchName, setSearchName] = useState("");
  const handleSearch = () => {
    const filteredClasses = data.filter((c) =>
      c.className.toLowerCase().includes(searchName.toLowerCase())
    );

    setClasses(filteredClasses);   
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
                <Button sx={{bgcolor: "#3b82f6", color: "white", ml: 2}} onClick={handleSearch} >Search</Button>
                </TableCell>
                <TableCell align="right" sx={{fontWeight: "bold"}}>
                  <Button sx={{bgcolor: "#3b82f6", color: "white"}} onClick={() => router.push("/class/create")}>Create</Button>
                </TableCell>
              </TableRow>
              <TableRow >
                <TableCell  sx={{fontWeight: "bold"}}>Name</TableCell>
                <TableCell  sx={{fontWeight: "bold"}}>Detail</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {classes.map((row) => (
                <TableRow
                  key={row.id}
                >
                  <TableCell>{row.className}</TableCell>
                  <TableCell > <Button sx={{bgcolor: "#3b82f6", color: "white"}} onClick={() => router.push(`/class/${row.id}`)}>Detail</Button></TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </>
  );
}

export const getServerSideProps = async () => {

  const {data} = await axios.get("http://localhost:8000/class", {
    headers: {
      Authorization: `Bearer admin`,
    },
  });



  return {
    props: { data },
  };
};


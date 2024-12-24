import { Button, Input, Paper } from "@mui/material";
import { useState } from "react";
export default function CreateStudentPage() {
  const [className, setClassName] = useState("");


  const handleCreate = async (event: any) => {
    event.preventDefault();

    const res = await fetch("http://localhost:8000/class", {
      method: "POST",
      headers: {
        Authorization: `Bearer admin`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        className: className,
      }),
    });

    if (!res.ok) {
      const error = await res.json();
      alert(error.devMessage);
    }
    else{
      window.location.href = "/class";
    }

    
  }
  
  return (
    <div className="items-center justify-center mt-40 ">
      <Paper sx={{width: "400px", height: "400px", alignItems : "center", m: "auto", justifyItems: "center", alignContent: "center", border: 1, 
      display: "flex", flexDirection: "column", gap: 6 , p: 6}} >
        <h1 className="text-2xl font-bold">Create Class</h1>
        <div>
          <Input type="text" placeholder="Class" onChange={(e) => setClassName(e.target.value)}/>
        </div>
        <Button sx={{bgcolor: "#3b82f6", color: "white"}} onClick={handleCreate}>Create</Button>
      </Paper>
    </div>
  );
}
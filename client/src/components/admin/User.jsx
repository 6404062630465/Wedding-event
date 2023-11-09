import { DataGrid } from "@mui/x-data-grid";
import Adminhome from './Adminhome';
import  Search  from './Search';
import { useState, useEffect } from "react";
import axios from "axios"; // หรือไลบรารีที่ใช้สำหรับการทำ HTTP request
import Button from "@mui/material/Button";
import DeleteIcon from '@mui/icons-material/Delete';


function User() {
  const [rows, setRows] = useState([]);
  // const [selectedRowIds, setSelectedRowIds] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/Userdata")
      .then((response) => {
        const rowsWithId = response.data.map((row, index) => ({
          ...row,
          id: index + 1, // สามารถใช้ id จากข้อมูลจริงได้ หรือใช้ index + 1 สำหรับตัวอย่าง
          // EventDate: new Date(row.EventDate),
        }));
        setRows(rowsWithId);
        // setFilteredRows(rowsWithId);
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
      });
  }, []);

  // const handleDelete = (CustomerId) => {
  //   axios.delete(`http://localhost:5000/DeleteUser/${CustomerId}`)
  //     .then((response) => {
  //       if (response.status === 200) {
  //         // หากลบข้อมูลสำเร็จที่ฝังในฐานข้อมูล
  //         const updatedRows = rows.filter((row) => row.CustomerID !== CustomerID);
  //         setRows(updatedRows);
  //       } else {
  //         // กรณีเกิดข้อผิดพลาดหรือคำขอลบไม่สำเร็จ
  //         console.error("Failed to delete data");
  //       }
  //     })
  //     .catch((error) => {
  //       console.error("Error deleting data: ", error);
  //     });
  // };

const columns = [
    { field: "CustomerID", headerName: "ID", width: 10 },
    { field: "Username", headerName: "Username", width: 130 },
    { field: "Password", headerName: "Password",width: 130 },
    { field: "Email", headerName: "Email", type:"email" ,width: 250 },
    { field: "PhoneNo", headerName: "PhoneNo",width: 130 },
    
  ];
  

  
  return (
    <>
    <Adminhome/>
    <Search/>
    <div>
      <div style={{ height: 400, width: "100%", marginTop: 10,marginLeft:60 }}>
          <DataGrid
            rows={rows}
            columns={columns}
            initialState={{
              pagination: {
                paginationModel: { page: 0, pageSize: 5 },
              },
            }}
            pageSizeOptions={[5, 10]}
            checkboxSelection
          />
        </div>
    </div>
    </>
  )
}

export default User;

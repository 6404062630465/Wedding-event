import { DataGrid } from "@mui/x-data-grid";
import Adminhome from './Adminhome';
import  Search  from './Search';
import { useState, useEffect } from "react";
import axios from "axios"; // หรือไลบรารีที่ใช้สำหรับการทำ HTTP request
import Button from "@mui/material/Button";
import DeleteIcon from '@mui/icons-material/Delete';


function AdminUser() {
  const [rows, setRows] = useState([]);
  // const [selectedRowIds, setSelectedRowIds] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/AdminUser")
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

  const handleDelete = (AdminID) => {
    axios.delete(`http://localhost:5000/DeleteAdmin/${AdminID}`)
      .then((response) => {
        if (response.status === 200) {
          // หากลบข้อมูลสำเร็จที่ฝังในฐานข้อมูล
          const updatedRows = rows.filter((row) => row.AdminID !== AdminID);
          setRows(updatedRows);
        } else {
          // กรณีเกิดข้อผิดพลาดหรือคำขอลบไม่สำเร็จ
          console.error("Failed to delete data");
        }
      })
      .catch((error) => {
        console.error("Error deleting data: ", error);
      });
  };

const columns = [
    { field: "AdminID", headerName: "ID", width: 10 },
    { field: "AdminName", headerName: "Username", width: 130 },
    { field: "AdminPassword", headerName: "Password",width: 130 },
    { field: "AdminEmail", headerName: "Email", type:"email" ,width: 250 },
    { field: "AdminPhoneNo", headerName: "PhoneNo",width: 130 },
    {
      field: "actions",
      headerName: "Actions",
      width: 150,
      renderCell: (params) => (
        <Button
          variant="contained"
          color="error"
          startIcon={<DeleteIcon />}
          onClick={() => handleDelete(params.row.AdminID)}
        >
          Delete
        </Button>
      ),
    },
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

export default AdminUser;

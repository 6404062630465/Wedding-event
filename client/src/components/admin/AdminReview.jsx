import { DataGrid } from "@mui/x-data-grid";
import Adminhome from './Adminhome';
import Search from './Search';
import { useState, useEffect } from "react";
import axios from "axios";
import Button from "@mui/material/Button";
import DeleteIcon from '@mui/icons-material/Delete';

function AdminReview() {
  const [rows, setRows] = useState([]);

  useEffect(() => {
    fetchReviewData();
  }, []);

  const fetchReviewData = () => {
    axios.get("http://localhost:5000/Review")
      .then((response) => {
        const rowsWithId = response.data.map((row) => ({
          ...row,
          id: row.ReviewNo, // ใช้ ReviewNo จากข้อมูลเป็น ID
        }));
        setRows(rowsWithId);
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
      });
  };

  const handleDelete = (ReviewNo) => {
    fetch(`http://localhost:5000/DeleteReview/${ReviewNo}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(response => {
      console.log(response); // Log the response to check the status and data
  
      if (response.ok) {
        fetchReviewData(); // To refresh the data after successful deletion
      } else {
        console.error("Failed to delete data");
      }
    })
    .catch(error => {
      console.error("Error deleting data: ", error);
    });
  };

  const columns = [
    { field: "ReviewNo", headerName: "No", width: 100 },
    { field: "Score", headerName: "Score", width: 130 },
    { field: "Description", headerName: "Description", width: 300 },
    {
      field: "actions",
      headerName: "Actions",
      width: 150,
      renderCell: (params) => (
        <Button
          variant="contained"
          color="error"
          startIcon={<DeleteIcon />}
          onClick={() => handleDelete(params.row.ReviewNo)}
        >
          Delete
        </Button>
      ),
    },
  ];

  return (
    <>
      <Adminhome />
      <Search />
      <div style={{ height: 400, width: "100%", marginTop: 10, marginLeft: 60 }}>
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={5}
          checkboxSelection
        />
      </div>
    </>
  );
}

export default AdminReview;

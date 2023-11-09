import { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Adminhome from "./Adminhome";
import Search from "./Search";
import DeleteIcon from '@mui/icons-material/Delete';
import Button from "@mui/material/Button";
import axios from "axios"; // หรือไลบรารีที่ใช้สำหรับการทำ HTTP request
// import Search from './Search';

function BookingList() {
  const [rows, setRows] = useState([]);
  const [selectedRowIds, setSelectedRowIds] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredRows, setFilteredRows] = useState([]); // เพิ่ม filteredRows
  const [getstatus, setStatus] = useState([]);


  useEffect(() => {
    filterData();
  }, [searchTerm]);

  const filterData = () => {
    if (searchTerm === "") {
      setFilteredRows(rows);
    } else {
      const filteredData = rows.filter((row) => row.BookingID.toString().includes(searchTerm));
      setFilteredRows(filteredData);
    }
  };

  useEffect(() => {
    axios.get("http://localhost:5000/Bookingdata")
      .then((response) => {
        const rowsWithId = response.data.map((row, index) => ({
          ...row,
          id: index + 1, // สามารถใช้ id จากข้อมูลจริงได้ หรือใช้ index + 1 สำหรับตัวอย่าง
          EventDate: new Date(row.EventDate),
        }));
        setRows(rowsWithId);
        setFilteredRows(rowsWithId);
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
      });

    axios.get("http://localhost:5000/getstatus")
      .then((response) => {
        setStatus(response.data)
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
      });
  }, []);

  // const [selectedRowIds, setSelectedRowIds] = useState([]);

  const columns = [
    { field: "BookingID", headerName: "Booking ID", width: 150 },
    { field: "BrideName", headerName: "Bride Name", width: 200 },
    { field: "GroomName", headerName: "Groom Name", width: 200 },
    { field: "VenueName", headerName: "Venue Name", width: 130 },
    { field: "BookingDateandTime", headerName: "Booking Date/Time", width: 200 },
    { field: "EventDate", headerName: "Event Date", type: "date", width: 150 },
    { field: "EventStartTime", headerName: "Event Start Time", width: 150 },
    { field: "EventEndTime", headerName: "Event End Time", width: 150 },
    { field: "NumofGuest", headerName: "No of Guests", width: 150 },
    { field: "NumberofPH", headerName: "No of Photographer", width: 180 },
    { field: "Genre", headerName: "Genre", width: 150 },
    {
      field: "Title",
      headerName: "Status",
      width: 150,
      renderCell: (params) => (
        <Select
          value={params.row.Title}
          onChange={(e) => handleStatusChange(e, params.row.BookingID)}
        >
          {getstatus.map((statusOption) => (
            <MenuItem key={statusOption.StatusID} value={statusOption.Title}>
              {statusOption.Title}
            </MenuItem>
          ))}
        </Select>
      ),
    },
    {
      // field: "actions",
      // headerName: "Actions",
      // width: 150,
      // renderCell: (params) => (
      //   <Button
      //     variant="contained"
      //     color="error"
      //     startIcon={<DeleteIcon />}
      //     onClick={() => handleDelete(params.row.BookingID)}
      //   >
      //     Delete
      //   </Button>
      // ),
    },
  ];

  // const handleDelete = (bookingId) => {
  //   const updatedRows = rows.filter((row) => row.BookingID !== bookingId);
  //   setRows(updatedRows);
  // };

  // const handleDelete = (bookingId) => {
  //   axios.delete(`http://localhost:5000/Bookingdata/${bookingId}`)
  //     .then((response) => {
  //       if (response.status === 200) {
  //         // หากลบข้อมูลสำเร็จที่ฝังในฐานข้อมูล
  //         const updatedRows = rows.filter((row) => row.BookingID !== bookingId);
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

  const handleStatusChange = (e, bookingId) => {
    const newValue = e.target.value;
    const updatedRows = rows.map((row) => {
      if (row.BookingID === bookingId) {
        return { ...row, status: newValue };
      }
      return row;
    });
    setRows(updatedRows);
  };

  return (
    <>
      <Adminhome />
      <Search setSearchTerm={setSearchTerm} />
      <div style={{ height: 400, width: "100%", marginTop: 10, marginLeft: 60 }}>
        <DataGrid
          // rows={rows}
          rows={filteredRows}
          columns={columns}
          selectionModel={selectedRowIds}
          onSelectionModelChange={(newSelection) => {
            setSelectedRowIds(newSelection);
          }}
          pageSizeOptions={[5, 10]}
          checkboxSelection
        />
      </div>
    </>
  );
}

export default BookingList;
import { useState, useEffect } from "react";
import NavbarUser from "../components/Navbar-user/NavbarUser";
import { Link } from "react-router-dom";
import { DataGrid } from "@mui/x-data-grid";
import Button from "@mui/material/Button";
import axios from "axios";


function Status() {
  // const [rows, setRows] = useState([
  //   {
  //     id: 1,
  //     BrideName: "Snow",
  //     GroomName: "Jon",
  //     EventDate: new Date("2022-12-21"),
  //     Status: "เสร็จสิ้น",
  //   },
  //   {
  //     id: 2,
  //     BrideName: "Snow",
  //     GroomName: "Jon",
  //     VenueID: "ห้อง 1",
  //     EventDate: new Date("2022-12-21"),
  //     EventStartTime: "10:00 AM",
  //     EventEndTime: "2:00 PM",
  //     NumofGuest: 100,
  //     NumofPho: 2,
  //     GenreOfmusic: "jazz",
  //     Status: "รอดำเนินการ",
  //   },

  // ]);
  const [rows, setRows] = useState([]);
  const [selectedRowIds, setSelectedRowIds] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredRows, setFilteredRows] = useState([]); // เพิ่ม filteredRows
  const Email = localStorage.getItem("Email")
  useEffect(() => {
    axios.post("http://localhost:5000/getbookingList", {
      Email: Email,  
  }).then((response) => {
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
  }, []);


  const columns = [
    { field: "BookingID", headerName: "ID", width: 10 },
    { field: "BrideName", headerName: "Bride name", width: 130 },
    { field: "EventDate", headerName: "Event Date", type: "date", width: 100 },
    { field: "Title", headerName: "Status", width: 200 },
    {
      field: "actions",
      headerName: "Actions",
      width: 150,
      renderCell: (params) => (
        params.row.Title === "finished" ? (
          <Button variant="contained" color="primary" component={Link} to={`/roomdetail/${params.row.id}`}>รีวิว</Button>
        ) 
        : 
        (
          
          <></>
          // <Button variant="contained" color="error" onClick={() => handleCancelButton(params.row.id)}>ยกเลิก</Button>
        )
      ),
    },
  ];




  const [showCancelButton, setShowCancelButton] = useState(true);
  const CustomerID = localStorage.getItem("CustomerID")
  
  const handleCancelButton = (rowId, CustomerID) => {
    const confirmed = window.confirm(
      "แน่ใจนะว่าจะยกเลิก? ทางเราจะไม่คืนเงินทุกกรณี"
    );

    if (confirmed) {
      axios.post("http://localhost:5000/cancelbooking", { BookingID: rowId, CustomerID })
      .then((response) => {
        console.log("Cancellation response:", response);
        if (response.status === 200) {
          setRows((prevRows) =>
            prevRows.map((row) => {
              if (row.id === rowId) {
                console.log("Updating status for row:", row.id);
                return { ...row, Status: "cancel" };
              } else {
                return row;
              }
            })
          );
          setShowCancelButton(false);
        } else {
          alert("Failed to cancel the booking. Please try again later.");
        }
      })
      .catch((error) => {
        console.error("Error canceling the booking:", error);
        alert("Failed to cancel the booking. Please try again later.");
      });
    }
  };
  return (
    <>
      <NavbarUser />
      <br />
      <br />
      <br />
      <br />
      <div className="content-wrapper">
        <div className="container-xl flex-grow-1 container-p-y">
          <div className="card mb-4">
            <h5 className="card-header">ตรวจสอบสถานะ</h5>
            <div className="card-body">
              <div style={{ height: 400, width: "100%" }}>
                <DataGrid
                  rows={rows}
                  columns={columns}
                />
              </div>

            </div>
          </div>
        </div>
      </div>

    </>
  );
}

export default Status;
import { useState, useEffect } from "react";
import { Link } from 'react-router-dom'
import "bootstrap/dist/css/bootstrap.min.css";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { TimePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import TextField from "@mui/material/TextField";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import NavbarUser from "../components/Navbar-user/NavbarUser";
import axios from "axios";

function Booking() {
  const localEmail = localStorage.getItem("Email")
  const localVenueID = localStorage.getItem("VenueID")
  const [CustomerID, setCustomerID] = useState('')
  const [bookingData, setBookingData] = useState({
    BrideName: '',
    GroomName: '',

    EventDate: dayjs().toDate(),
    EventStartTime: null,
    EventEndTime: null,
    NumofGuest: "",
    numOfPhotos: "",
    roomName: "ชื่อห้อง",
    // Genre: "",
    MusicID: "",
    PhotographerID: "",
    Email: localEmail,
    VenueID: localVenueID,
  });

  const [bookingData2, setshowBookingData2] = useState({

    showMusicID: "",
    showPhotographerID: "",

  });
  const [getMusic, setMusic] = useState([]);
  const [getPhotographer, setPhotographer] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/Musicdata")
      .then((response) => {
        setMusic(response.data);
      })
      .catch((error) => console.log(error));

    axios.get("http://localhost:5000/photographerdata")
      .then((response) => {
        setPhotographer(response.data);
      })

    // axios.post("http://localhost:5000/getCustomerID", {
    //   Email: localEmail,
    // }).then((response) => {

    //   const CustomerID = response.data.CustomerID;
    //   localStorage.setItem("CustomerID", CustomerID);
    //   console.log(CustomerID);

    // })
    //   .catch((error) => console.log(error));
  }, [])

  // localStorage.setItem("CustomerID", CustomerID)
  // console.log(CustomerID); 
  // const test = CustomerID.CustomerID
  //   localStorage.setItem("CustomerID", test)
  // console.log(test)
  const handleChange = (e) => {
    const { target } = e;
    const { name, value } = target;
    setBookingData({
      ...bookingData,
      [name]: value,
    });

  }
  const handleMusic = (e) => {
    const { target } = e;
    const { name, value } = target;

    const selectedMusic = getMusic.find((musicOption) => musicOption.Genre === value);
    const musicID = selectedMusic ? selectedMusic.MusicID : '';

    setBookingData({
      ...bookingData,
      [name]: musicID,
    });
    setshowBookingData2({
      ...bookingData2,
      [name]: value,
    })
    // console.log("name "+ name) //test log
    // console.log("value "+ value)
    // }
  };
  const dateChange = (newValue) => {
    const newDate = newValue.toDate();
    setBookingData({
      ...bookingData,
      date: newDate,
    });
  };
  const timeStartChange = (newValue) => {
    setBookingData({
      ...bookingData,
      EventStartTime: newValue,
    });
  };
  const timeEndChange = (newValue) => {
    setBookingData({
      ...bookingData,
      EventEndTime: newValue,
    });
  };
  const photographerChange = (event) => {
    const { name, value } = event.target;

    const selectedPhotographer = getPhotographer.find((PhotographerOption) => PhotographerOption.NumberofPH === value);
    const photographerID = selectedPhotographer ? selectedPhotographer.PhotographerID : '';
    setshowBookingData2({
      ...bookingData2,
      [name]: value,
    });
    setBookingData((prevBookingData) => ({
      ...prevBookingData,
      [name]: photographerID,
    }));


  };


  const book = () => {
    axios.post("http://localhost:5000/createbooking", bookingData)
      .then((response) => {
        console.log("Booking data sent successfully:", response.data);
        
        const BookingID = response.data.BookingID;
        localStorage.setItem("BookingID", BookingID);
        console.log(BookingID);
        window.location = "/paymentMethod"
    })
    .catch((error) => {
      console.error("Error sending booking data:", error);
      console.log(error.response); 
      alert("โปรดกรอกข้อมูลอีกครั้ง");
    });
  
  }
 


  // console.log("booking data", bookingData);
  // console.log("getmusic", getMusic)
  //console.log(CustomerID)

  return (
    <>
      <NavbarUser />
      <br />
      <br />
      <br />
      <div className="content-wrapper pt-5">
        <div className="container-sm flex-grow-1 container-p-y ">
          <div className="d-flex justify-content-start">
            <h4 className="fw-bold py-3 mb-4">โปรดกรอกรายละเอียด</h4>
          </div>
          <h5 className="d-flex justify-content-start">ข้อมูลงานเบื้องต้น</h5>
          <div className="row">
            <div className="col-8">
              <div className="card mb-4">
                <div className="card-body">
                  <Form
                  // onSubmit={}
                  >
                    <Form.Group as={Row} className="mb-3" controlId="">
                      <Col sm="12">
                        <TextField
                          required
                          id=""
                          name="BrideName"
                          label="ชื่อ-นามสกุลเจ้าสาว"
                          fullWidth
                          autoComplete=""
                          variant="outlined"
                          onChange={handleChange}
                        />
                      </Col>
                    </Form.Group>
                    <Form.Group as={Row} className="mb-3" controlId="">
                      <Col sm="12">
                        <TextField
                          required
                          id=""
                          name="GroomName"
                          label="ชื่อ-นามสกุลเจ้าบ่าว"
                          fullWidth
                          autoComplete=""
                          variant="outlined"
                          onChange={handleChange}
                        />
                      </Col>
                    </Form.Group>
                    <Form.Group as={Row} className="mb-2" controlId="">
                      <Col>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                          <DemoContainer components={["DatePicker"]}>
                            <DatePicker
                              required

                              label="วันที่จัดงาน"
                              format="DD/MM/YYYY"
                              disablePast
                              value={dayjs(bookingData.date)}
                              onChange={dateChange}
                            />
                          </DemoContainer>
                        </LocalizationProvider>
                      </Col>
                    </Form.Group>

                    <Form.Group as={Row} className="mb-2" controlId="">
                      <Col>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                          <DemoContainer components={["TimePicker"]}>
                            <TimePicker
                              required

                              label="เวลาเริ่มงาน"
                              ampm={false}
                              mask="__:__"
                              views={["hours", "minutes"]}
                              onChange={timeStartChange}
                            />
                          </DemoContainer>
                        </LocalizationProvider>
                      </Col>
                      <Col>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                          <DemoContainer components={["TimePicker"]}>
                            <TimePicker
                              required

                              label="เวลาจบงาน"
                              ampm={false}
                              mask="__:__"
                              views={["hours", "minutes"]}
                              value={bookingData.timeEnd} // Make sure bookingData.timeEnd is in "HH:mm" format
                              onChange={timeEndChange}

                            />
                          </DemoContainer>
                        </LocalizationProvider>
                      </Col>
                    </Form.Group>

                    <div>
                      <Form.Group as={Row} className="mb-2" controlId="">
                        <Col>
                          <TextField
                            required
                            type="number"
                            id=""
                            label="จำนวนคน"
                            fullWidth
                            variant="outlined"
                            name="NumofGuest"
                            onChange={handleChange}
                          />
                        </Col>
                      </Form.Group>
                      <FormControl
                        sx={{ m: 1, minWidth: "100%", textAlign: "left" }}
                      >
                        <InputLabel id="demo-simple-select-helper-labe">
                          จำนวนช่างถ่ายรูป
                        </InputLabel>
                        <Select
                          required
                          id="demo-simple-select-helper"
                          value={bookingData.PhotographerID}
                          // multiple 
                          name="PhotographerID"
                          onChange={photographerChange}
                        >
                          {getPhotographer.map((photographerOption) => (
                            <MenuItem key={photographerOption.PhotographerID} value={photographerOption.NumberofPH}>
                              {photographerOption.NumberofPH}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                      <FormControl
                        sx={{ m: 1, minWidth: "100%", textAlign: "left" }}
                      >
                        <InputLabel id="demo-simple-select-helper-label">
                          ประเภทดนตรี
                        </InputLabel>
                        <Select
                          required
                          id="demo-simple-select-helper"
                          defaultValue="undefined"
                          name="MusicID"
                          value={bookingData.MusicID}
                          onChange={handleMusic}
                        // onClick={musicGenreChange}
                        >
                          {getMusic.map((musicOption) => (
                            <MenuItem key={musicOption.MusicID} value={musicOption.Genre} >
                              {musicOption.Genre}
                            </MenuItem>
                          ))}

                        </Select>
                      </FormControl>
                    </div>
                  </Form>
                </div>
              </div>
            </div>
            {/* card */}
            <Card style={{ width: "18rem" }}>
              <Card.Img variant="top" src="holder.js/100px180" />
              <Card.Body>
                <Card.Title>ชื่อห้อง</Card.Title>
                <Card.Text>
                  <label>รายละเอียดงาน</label> <br />
                  {bookingData.EventDate
                    ? ` วัน ${bookingData.EventDate.toLocaleDateString("th-TH", {
                      year: "numeric",
                      month: "2-digit",
                      day: "2-digit",
                    })}`
                    : null}
                  <br />
                  {bookingData.EventStartTime
                    ? ` เวลา ${new Date(bookingData.EventStartTime).toLocaleTimeString(
                      "th-TH",
                      {
                        hour: "2-digit",
                        minute: "2-digit",
                      }
                    )}`
                    : null}
                  {bookingData.EventEndTime
                    ? ` -  ${new Date(bookingData.EventEndTime).toLocaleTimeString(
                      "th-TH",
                      {
                        hour: "2-digit",
                        minute: "2-digit",
                      }
                    )}`
                    : null}
                  <br />
                  {bookingData.NumofGuest
                    ? `จำนวนคน: ${bookingData.NumofGuest}`
                    : null}
                  <br />
                  {bookingData2.photographerID !== ""
                    ? `จำนวนช่างถ่ายรูป: ${bookingData2.PhotographerID}`
                    : null}
                  <br />
                  {bookingData2.MusicID !== ""
                    ? `ประเภทดนตรี: ${bookingData2.MusicID}`
                    : null}
                </Card.Text>

                {/* <Link to="/paymentMethod" > */}
                <Button variant="primary" onClick={book}>ยืนยันการจอง</Button>
                {/* </Link> */}
              </Card.Body>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
}

export default Booking;

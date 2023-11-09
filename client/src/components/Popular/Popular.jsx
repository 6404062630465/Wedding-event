import { useEffect, useState } from 'react';
import axios from 'axios';
import './popular.css';
import { Link } from 'react-router-dom';
import Pagination from '../Pagination/Paginations.jsx';
import img1 from "../../assets/room1.png";
import img2 from "../../assets/room2.png";
import img3 from "../../assets/room3.png";
import img4 from "../../assets/room4.png";

const imgSrc = [
  {
    id: 1,
    imgSrc: img1,
  },
  {
    id: 2,
    imgSrc: img2,
  },
  {
    id: 3,
    imgSrc: img3,
  },
  {
    id: 4,
    imgSrc: img4,
  },
  {
    id: 5,
    imgSrc: img1,
  },
  {
    id: 6,
    imgSrc: img2,
  },
  {
    id: 7,
    imgSrc: img3,
  },
  {
    id: 8,
    imgSrc: img4,
  },{
    id: 9,
    imgSrc: img1,
  },
  {
    id: 10,
    imgSrc: img2,
  },
  {
    id: 11,
    imgSrc: img3,
  },
  {
    id: 12,
    imgSrc: img4,
  },
];

const Popular = () => {
  const [places, setPlaces] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postPerPage, setPostPerPage] = useState(8);


  useEffect(() => {
    axios.get('http://localhost:5000/venue')
      .then(response => {
        setPlaces(response.data);
      })
      .catch(error => {
        console.error('มีข้อผิดพลาดในการดึงข้อมูล:', error);
      });
  }, []);

  const lastPostIndex = currentPage * postPerPage;
  const firstPostIndex = lastPostIndex - postPerPage;
  const currentPosts = places.slice(firstPostIndex, lastPostIndex);

  // const selectedID = (VenueID) => {
  //   localStorage.setItem('VenueID', VenueID);
  //   const venue = localStorage.getItem('VenueID')
  //   console.log(venue)
  // }

  return (
    <>
      <section className="popular section container">
        <div className="secContainer">
          <div className="secHeader flex">
            <div className="textDiv">
              <h2 className="secTitle">สถานที่แนะนำ</h2>
            </div>
          </div>
          <div className="mainContent grid">
            {currentPosts.map(({ VenueName, VenuePrice, MaxCapacity, VenueID }) => {
              const image = imgSrc.find(image => image.id === VenueID);
              return (
                <div className="place" key={VenueID}>
                  <div className="placeImage">
                    <img src={image ? image.imgSrc : ''} alt="Image title" />
                  </div>
                  <div className="Info">
                    <div className="textInfo">
                      <h2>{VenueName}</h2>
                      <p>ราคา ฿ {VenuePrice}</p>
                      <p>จำนวนคน {MaxCapacity} คน</p>
                    </div>
                    <button className="btn">
                    {/* <Link to={`/roomdetail/${VenueID}`} onClick={selectedID(VenueID)}>รายละเอียดเพิ่มเติม</Link> */}
                      <Link to={`/roomdetail/${VenueID}`}>รายละเอียดเพิ่มเติม</Link>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
      <Pagination
        totalPosts={places.length}
        postsPerPage={postPerPage}
        setCurrentPage={setCurrentPage}
        currentPage={currentPage}
      />
    </>
  );
};

export default Popular;

import { Link } from "react-router-dom";
import "./roomdetail.css";
import NavbarUser from "../Navbar-user/NavbarUser";
import StarRating from "../StarRating/StarRating";
import img1 from "../../assets/room1.png";
import img2 from "../../assets/room2.png";
import img3 from "../../assets/room3.png";
import img4 from "../../assets/room4.png";
import { useParams } from "react-router-dom";
import { BsPeopleFill } from "react-icons/bs";
import { IoMdCheckmark } from "react-icons/io";
import { AiFillStar } from "react-icons/ai";
import { AiOutlineStar } from "react-icons/ai";
import { useLocation } from "react-router-dom";
import React, { useState, useEffect } from "react";
import axios from "axios";

const Data = [
  {
    id: 1,
    imgSrc: img1,
    roomNo: 1,
    price: 15000,
    num: 50,
  },
  {
    id: 2,
    imgSrc: img2,
    roomNo: 2,
    price: 17000,
    num: 60,
  },
  {
    id: 3,
    imgSrc: img3,
    roomNo: 3,
    price: 20000,
    num: 70,
  },
  {
    id: 4,
    imgSrc: img4,
    roomNo: 4,
    price: 18000,
    num: 40,
  },
  {
    id: 5,
    imgSrc: img1,
    roomNo: 5,
    price: 15000,
    num: 50,
  },
  {
    id: 6,
    imgSrc: img2,
    roomNo: 6,
    price: 17000,
    num: 60,
  },
  {
    id: 7,
    imgSrc: img3,
    roomNo: 7,
    price: 20000,
    num: 70,
  },
  {
    id: 8,
    imgSrc: img4,
    roomNo: 8,
    price: 18000,
    num: 40,
  },
  {
    id: 9,
    imgSrc: img1,
    roomNo: 9,
    price: 15000,
    num: 50,
  },
  {
    id: 10,
    imgSrc: img2,
    roomNo: 10,
    price: 17000,
    num: 60,
  },
  {
    id: 11,
    imgSrc: img3,
    roomNo: 11,
    price: 20000,
    num: 70,
  },
  {
    id: 12,
    imgSrc: img4,
    roomNo: 12,
    price: 18000,
    num: 40,
  },
];

const Roomdetail = () => {
  const { roomId } = useParams();
  const roomData = Data.find((room) => room.id.toString() === roomId);
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  // const status = query.get('status');
  // const isReviewEnabled = status === 'เสร็จสิ้น';

    if (!roomData) {
        return <div>Room not found</div>;
    }

    const selectedID = () => {
        localStorage.setItem('VenueID', roomId);
        // const venue = localStorage.getItem('VenueID')
        // console.log(venue)
    }
    selectedID();

  // const getEmail = localStorage.getItem("Email");
  // const [Username, setUsername] = useState('');
//   const [Description, setDescription] = useState('');
// const [Score, setScore] = useState(0); // จำนวนคะแนน
const [reviews, setReviews] = useState([]);


useEffect(() => {
    axios.get(`http://localhost:5000/ShowReview`)
        .then(response => {
            // setDescription(response.data[0].Description);
            // setScore(response.data[0].Score); // ส่วนที่เก็บคะแนนไว้ใน state
            setReviews(response.data);
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
}, []);

  return (
    <>
      <NavbarUser />
      <br />
      <br />
      <br />
      <br />
      <br />
      <img className="roompic" src={roomData.imgSrc} alt="Room Image" />
      <div className="detail1">
        <h2>{`ห้อง ${roomData.roomNo}`}</h2>
        <p>{`ราคา ฿ ${roomData.price}`}</p>
        <p>
          <BsPeopleFill /> {roomData.num} คน
        </p>
        <p>{`พื้นที่ขนาด ${roomData.size} ตารางเมตร`}</p>
      </div>
      <div className="detail2">
        <div className="detail2text">
          <h3>สิ่งอำนวยความสะดวก</h3>
          <p>
            <IoMdCheckmark />
            ไวไฟ
          </p>
          <p>
            <IoMdCheckmark />
            เวที
          </p>
          <p>
            <IoMdCheckmark />
            โพเดียม
          </p>
          <p>
            <IoMdCheckmark />
            ลำโพง
          </p>
          <p>
            <IoMdCheckmark />
            โปรเจคเตอร์
          </p>
          <p>
            <IoMdCheckmark />
            มีอาหารและเครื่องดื่มบริการ
          </p>
        </div>
      </div>
      <Link to="/booking">
        <button className="chooseroom">เลือก</button>
      </Link>
      <div className="comments">
        <h2>Comments</h2>
        {reviews.map((review, index) => (
          <div className="box-container" key={index}>
            <div className="box">
              <div className="box-top">
                <div className="stars">
                  {[...Array(5)].map((star, i) => (
                    <span key={i}>
                      {i < review.Score ? (
                        <AiFillStar />
                      ) : (
                        <AiOutlineStar />
                      )}
                    </span>
                  ))}
                </div>
              </div>
              <div className="text-comment">
                <p>{review.Description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
          

      {/* <div className="comments">
        <h2>Comments</h2>
        {reviews.map((review, index) => (
          <div className="box-container" key={index}>
            <div className="box">
              <div className="box-top">
                <div className="stars">
                  {[...Array(5)].map((star, i) => (
                    <span key={i}>
                      {i < review.Score ? (
                        <AiFillStar />
                      ) : (
                        <AiOutlineStar />
                      )}
                    </span>
                  ))}
                </div>
              </div>
              <div className="text-comment">
                <p>{review.Description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
          
      <div className="comments">
        <h2>Comments</h2>
        {reviews.map((review, index) => (
          <div className="box-container" key={index}>
            <div className="box">
              <div className="box-top">
                <div className="stars">
                  {[...Array(5)].map((star, i) => (
                    <span key={i}>
                      {i < review.Score ? (
                        <AiFillStar />
                      ) : (
                        <AiOutlineStar />
                      )}
                    </span>
                  ))}
                </div>
              </div>
              <div className="text-comment">
                <p>{review.Description}</p>
              </div>
            </div>
          </div>
        ))}
      </div> */}
      {/* {isReviewEnabled && (
                <div className="user-reviews">
                    <h2>Reviews</h2>
                    <StarRating/>

                    <div className="text-review">
                        <textarea className="form-control" rows="4"></textarea>
                        <button className='chooseroom'>รีวิว</button>
                    </div>
                </div>
            )} */}
    </>
  );
};

export default Roomdetail;

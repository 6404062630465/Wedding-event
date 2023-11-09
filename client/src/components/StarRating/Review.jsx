import React, { useState } from 'react';
import './starrating.css';
import { AiFillStar } from 'react-icons/ai';
import axios from 'axios'; // ต้องเพิ่มการนำเข้า Axios

const icon = (isSelected) => (
  <AiFillStar
    style={{
      color: isSelected ? '#f9d71c' : 'lightgrey',
      fontSize: '2rem',
      marginBottom: '2rem'
    }}
  />
);

const stars = [1, 2, 3, 4, 5];

const Review = () => {
  const [selectedStar, setSelectedStar] = useState(null);
  const [reviewText, setReviewText] = useState('');
  const getBookingID = localStorage.getItem("BookingID");
  // const [Email, setEmail] = useState(getEmail);

  const postReview = () => {
    const data = {
      Score: selectedStar,
      Description: reviewText,
      BookingID: getBookingID
    };

    axios.post('http://localhost:5000/Review', data)
      .then(response => {
        // ทำสิ่งที่ต้องการหลังจากส่งรีวิวไปยังเซิร์ฟเวอร์
        console.log('Review posted successfully:', response.data);
        // ตัวอย่างการรีเซ็ตค่าหลังจากส่งรีวิว
        setSelectedStar(null);
        setReviewText('');
      })
      .catch(error => {
        console.error('Error posting review:', error);
      });
  };

  return (
    <div className="user-reviews">
      <h2>Reviews</h2>
      <div className="flex">
        {stars.length > 0 &&
          stars.map((starNum) => (
            <button
              type="button"
              key={starNum}
              onClick={() => setSelectedStar(starNum)}
              className="star"
            >
              {icon(selectedStar === starNum || (selectedStar && selectedStar > starNum))}
            </button>
          ))}
      </div>

      <div className="text-review">
        <textarea
          className="form-control"
          rows="4"
          value={reviewText}
          onChange={(e) => setReviewText(e.target.value)}
        ></textarea>
        <button className='chooseroom' onClick={postReview}>รีวิว</button>
      </div>
    </div>
  );
};

export default Review;

import React, { useState } from 'react';
import './starrating.css'
import { AiFillStar } from 'react-icons/ai';

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

const StarRating = () => {
    const [selectedStar, setSelectedStar] = useState();

    return (
        <>
            <div className="flex">
                {stars.length > 0 &&
                    stars.map((starNum) => (
                        <button
                            type="button"
                            key={starNum}
                            onClick={() => setSelectedStar(starNum)}
                            className="star"
                        >
                            {icon(selectedStar === starNum || selectedStar > starNum)}
                        </button>
                    ))}
            </div>

        </>
    )
}

export default StarRating



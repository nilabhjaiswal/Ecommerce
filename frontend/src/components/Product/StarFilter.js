import React from "react";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";

const StarFilter = ({ ratings }) => {
  const rate = Math.round(ratings);
  return (
    <div>
      {[...Array(5)].map((_, i) => (
        <span>
          {rate > i ? (
            <AiFillStar style={{ color: "rgba(20,20,20,0.1)" }} />
          ) : (
            <AiOutlineStar />
          )}
        </span>
      ))}
    </div>
  );
};

export default StarFilter;

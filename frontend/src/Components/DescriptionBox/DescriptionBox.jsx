import React from "react";
import "./DescriptionBox.css";

const DescriptionBox = () => {
  return (
    <div className="descriptionbox">
      <div className="descriptionbox-navigator">
        <div className="descriptionbox-nav-box">Description</div>
        <div className="descriptionbox-nav-box fade">Reviews (122)</div>
      </div>
      <div className="descriptionbox-description">
        <p>
          The product name should also be brief and include the clothing's major
          characteristics. For example, the name could include the main
          category, like "dress" or "trousers", and a differentiating element,
          like the fabric, cut, length, or pattern
        </p>
        <p>
          Choose words and descriptive adjectives that highlight the unique
          features of the clothing item. Speak directly to the customer's needs
          and aspirations, tailoring the description to the audience's
          preferences
        </p>
      </div>
    </div>
  );
};

export default DescriptionBox;

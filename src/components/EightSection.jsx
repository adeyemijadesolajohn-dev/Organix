import React, { useState } from "react";
import "../styles/EightSection.scss";
import { images } from "../Data/Images";
import {
  MdOutlineDateRange,
  MdOutlineComment,
  MdOutlineCommentsDisabled,
  MdClose,
} from "react-icons/md";
import { PiUserCircleBold } from "react-icons/pi";

const today = new Date();
const formatDate = (date) =>
  date.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

const posts = [
  {
    id: 1,
    image: images.greenDrink,
    title: "Transition Your Favorite Looks into Fall France",
    description:
      "Fall France is a popular fashion trend that has been making a comeback this year. With its cozy and warm vibes, Fall France is perfect for layering in the cold weather. In addition, the health benefits of fall France are many. Fall France has a lot to do with Green Tea and we must begin with that. Green tea is a popular beverage that has a wide range of health benefits. It is known for its antioxidant properties, which help protect the body from oxidative stress and improve overall health.",
    date: formatDate(today),
    author: "ALO Support",
    avatar: images.avatar1,
  },
  {
    id: 2,
    image: images.octopus,
    title: "Perfect Quality Reasonable Price For Your Family",
    description:
      "There are many reasons to buy organic food, but one of the most important ones is the quality of the produce. Organic food is produced without the use of synthetic pesticides or fertilizers, which means it is free of harmful chemicals. This means that the food is healthier for you and your family. Organic food is also produced without the use of genetically modified organisms (GMOs), which means it is free of genetically engineered ingredients. This means that the food is also free of toxins and allergens.",
    date: formatDate(
      new Date(today.getFullYear(), today.getMonth(), today.getDate() - 1)
    ),
    author: "ALO Support",
    avatar: images.avatar2,
  },
  {
    id: 3,
    image: images.jarritosMexicanSoda,
    title: "Ways To Choose Fruits & Seafoods Good For Pregnancy",
    description:
      "Pregnancy is a special time in a woman's life, and it's important to choose fruits and seafood that are good for her health and well-being. Some fruits and seafood are known to be safe for pregnancy, while others may be unsafe. Here are some tips for choosing fruits and seafood that are safe for pregnancy. There are many fruits and seafood that are safe for pregnancy, including apples, bananas, pears, oranges, grapes, kiwi, and pineapple. Some fruits and seafood are also known to be safe for pregnancy.",
    date: formatDate(
      new Date(today.getFullYear(), today.getMonth(), today.getDate() - 2)
    ),
    author: "ALO Support",
    avatar: images.avatar3,
  },
];

const AuthorPopover = ({ name }) => (
  <div className="authorPopover">
    <img src={images.leaves} alt={name} />
    <span className="name">{name}</span>
  </div>
);

const AuthorModal = ({ name, avatar, company, bio, joined, onClose }) => (
  <div className="authorModalOverlay" onClick={onClose}>
    <div className="authorModalContent" onClick={(e) => e.stopPropagation()}>
      <button className="closeBtn" onClick={onClose}>
        <MdClose />
      </button>
      <img className="avatar" src={avatar} alt={name} />
      <div className="name">{name}</div>
      <div className="company">{company}</div>
      <div className="bio">{bio}</div>
      <div className="joined">Joined {joined}</div>
    </div>
  </div>
);

const EightSection = () => {
  const [comments, setComments] = useState({ 1: 0, 2: 5, 3: 10 });
  const [showPopoverId, setShowPopoverId] = useState(null);
  const [modalData, setModalData] = useState(null);

  const formatCount = (count) => {
    if (count >= 1_000_000) return (count / 1_000_000).toFixed(1) + "m";
    if (count >= 1_000) return (count / 1_000).toFixed(1) + "k";
    return count;
  };

  const resetComments = (id) => {
    setComments((prev) => ({ ...prev, [id]: 0 }));
  };

  const handleCommentClick = (id) => {
    setComments((prev) => ({ ...prev, [id]: prev[id] + 1 }));
  };

  return (
    <div className="eightSection">
      <div className="eightSectionHeader">
        <p className="eightSectionTitle">~Read Our Blog~</p>
        <h2 className="eightSectionSubTitle">Our Latest Posts</h2>
        <p className="eightSectionDescription">
          Go through our blog and learn more about our products and our thoughts
          on the organic food industry.
        </p>
      </div>

      <div className="eightSectionContent">
        {posts.map((post) => (
          <div className="eightSectionCard" key={post.id}>
            <div className="eightSectionCardImage">
              <img src={post.image} alt={post.title} />
            </div>

            <div className="eightSectionCardContent">
              <p className="eightSectionCardTitle">{post.title}</p>
              <p className="eightSectionCardDescription">
                {post.description}
                <a href="#" className="eightSectionCardLink">
                  ... Read More
                </a>
              </p>

              <div className="eightSectionCardFooter">
                <div
                  className="eightSectionCardDate"
                  onClick={() => resetComments(post.id)}
                >
                  <MdOutlineDateRange className="eightSectionCardDateIcon" />
                  <p className="eightSectionCardDateText">{post.date}</p>
                </div>

                <div
                  className="eightSectionCardAuthor"
                  onMouseEnter={() => setShowPopoverId(post.id)}
                  onMouseLeave={() => setShowPopoverId(null)}
                  onClick={() => setModalData(post)}
                >
                  <PiUserCircleBold className="eightSectionCardAuthorIcon" />
                  <p className="eightSectionCardAuthorText">{post.author}</p>
                  {showPopoverId === post.id && (
                    <AuthorPopover name={post.author} avatar={post.avatar} />
                  )}
                </div>

                <div
                  className="eightSectionCardComment"
                  onClick={() => post.id === 1 && handleCommentClick(post.id)}
                >
                  <div className="eightSectionCardCommentIcon">
                    {comments[post.id] === 0 ? (
                      <MdOutlineCommentsDisabled className="eightSectionCardCommentIconItem" />
                    ) : (
                      <>
                        <MdOutlineComment className="eightSectionCardCommentIconItem" />
                        <span className="eightSectionCardCommentNumber">
                          {formatCount(comments[post.id])}
                        </span>
                      </>
                    )}
                  </div>
                  <p className="eightSectionCardCommentText">
                    <span className="eightSectionCardCommentCounter">
                      {formatCount(comments[post.id])}
                    </span>{" "}
                    Comment{comments[post.id] > 1 ? "s" : ""}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {modalData && (
        <AuthorModal
          name={modalData.author}
          avatar={images.leaves}
          company={`${modalData.author} NGO`}
          bio="We advocate for clean, honest, earth-grown food."
          joined={modalData.date}
          onClose={() => setModalData(null)}
        />
      )}
    </div>
  );
};

export default EightSection;

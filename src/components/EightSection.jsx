import React, { useState, useRef } from "react";
import "../styles/EightSection.scss";
import { images } from "../Data/Images";
import {
  MdOutlineDateRange,
  MdOutlineComment,
  MdOutlineCommentsDisabled,
  MdClose,
} from "react-icons/md";
import { PiUserCircleBold } from "react-icons/pi";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

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
    shortDescription:
      "Fall France is a popular fashion trend making a comeback this year, perfect for cozy layering in cold weather.",
    longDescription:
      "Fall France is a popular fashion trend that has been making a comeback this year. With its cozy and warm vibes, Fall France is perfect for layering in the cold weather. In addition, the health benefits of Fall France are many, primarily tied to Green Tea. Green tea is a popular beverage known for its antioxidant properties, which help protect the body from oxidative stress and improve overall health. Fall France is a popular fashion trend that has been making a comeback this year. With its cozy and warm vibes, Fall France is perfect for layering in the cold weather. In addition, the health benefits of fall France are many. Fall France has a lot to do with Green Tea and we must begin with that. Green tea is a popular beverage that has a wide range of health benefits. It is known for its antioxidant properties, which help protect the body from oxidative stress and improve overall health.",
    date: formatDate(today),
    author: "ALO Support",
    avatar: images.avatar1,
  },
  {
    id: 2,
    image: images.octopus,
    title: "Perfect Quality Reasonable Price For Your Family",
    shortDescription:
      "Organic food offers high-quality produce free of synthetic pesticides and GMOs, ensuring healthier meals for your family.",
    longDescription:
      "Organic food is produced without synthetic pesticides or fertilizers, making it free of harmful chemicals and healthier for your family. It is also free of genetically modified organisms (GMOs), ensuring no genetically engineered ingredients, toxins, or allergens are present. There are many reasons to buy organic food, but one of the most important ones is the quality of the produce. Organic food is produced without the use of synthetic pesticides or fertilizers, which means it is free of harmful chemicals. This means that the food is healthier for you and your family. Organic food is also produced without the use of genetically modified organisms (GMOs), which means it is free of genetically engineered ingredients. This means that the food is also free of toxins and allergens.",
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
    shortDescription:
      "Choosing safe fruits and seafood during pregnancy is crucial for health and well-being.",
    longDescription:
      "Pregnancy is a special time, and selecting safe fruits and seafood is vital for a woman's health. Safe options include apples, bananas, pears, oranges, grapes, kiwi, and pineapple, which provide essential nutrients without risks. Pregnancy is a special time in a woman's life, and it's important to choose fruits and seafood that are good for her health and well-being. Some fruits and seafood are known to be safe for pregnancy, while others may be unsafe. Here are some tips for choosing fruits and seafood that are safe for pregnancy. There are many fruits and seafood that are safe for pregnancy, including apples, bananas, pears, oranges, grapes, kiwi, and pineapple. Some fruits and seafood are also known to be safe for pregnancy.",
    date: formatDate(
      new Date(today.getFullYear(), today.getMonth(), today.getDate() - 2)
    ),
    author: "ALO Support",
    avatar: images.avatar3,
  },
];

const AuthorPopover = ({ name }) => (
  <div className="authorPopover">
    <img className="popAvatar" src={images.leaves} alt={name} />
    <span className="name">{name}</span>
  </div>
);

const TitlePopover = () => (
  <div className="titlePopover">
    <span>Read More</span>
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
  const [showTitlePopoverId, setShowTitlePopoverId] = useState(null);
  const [modalData, setModalData] = useState(null);
  const [expandedPostId, setExpandedPostId] = useState(null);
  const [showFullDescription, setShowFullDescription] = useState({});
  const contentRef = useRef(null);

  const formatCount = (count) => {
    if (count >= 1_000_000) return (count / 1_000_000).toFixed(1) + "m";
    if (count >= 1_000) return (count / 1_000).toFixed(1) + "k";
    return count;
  };

  const resetComments = (id) => {
    setComments((prev) => ({ ...prev, [id]: 0 }));
  };

  const handleCommentClick = (id) => {
    if (id === 1) {
      setComments((prev) => ({ ...prev, [id]: prev[id] + 1 }));
    }
  };

  const toggleDescription = (id) => {
    setShowFullDescription((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const togglePostExpansion = (id) => {
    setExpandedPostId((prev) => (prev === id ? null : id));
  };

  const handleOutsideClick = (e) => {
    if (
      contentRef.current &&
      !contentRef.current.contains(e.target) &&
      !modalData // Prevent closing when modal is open
    ) {
      setExpandedPostId(null);
      setShowFullDescription({});
    }
  };

  return (
    <div className="eightSection" onClick={handleOutsideClick}>
      <div className="eightSectionHeader">
        <p className="eightSectionTitle">~Read Our Blog~</p>
        <h2 className="eightSectionSubTitle">Our Latest Posts</h2>
        <p className="eightSectionDescription">
          Explore our blog to learn about our products and insights on the
          organic food industry.
        </p>
      </div>

      <div className="eightSectionContent" ref={contentRef}>
        {posts.map((post) => (
          <div
            className="eightSectionCard"
            key={post.id}
            onClick={(e) => e.stopPropagation()} // Prevent card clicks from triggering outside click
          >
            <div className="eightSectionCardImage">
              <LazyLoadImage
                src={post.image}
                alt={post.title}
                effect="blur"
                width="100%"
                height="auto"
                wrapperProps={{
                  style: {
                    display: "block",
                    width: "100%",
                    height: "100%",
                    transition: "all 0.35s ease-in-out",
                  },
                }}
                className="eightSectionCardImg"
              />
            </div>

            <div className="eightSectionCardContent">
              <p
                className="eightSectionCardTitle"
                onClick={() => togglePostExpansion(post.id)}
                onMouseEnter={() => setShowTitlePopoverId(post.id)}
                onMouseLeave={() => setShowTitlePopoverId(null)}
              >
                {post.title}
                {showTitlePopoverId === post.id && <TitlePopover />}
              </p>

              {expandedPostId === post.id && (
                <p className="eightSectionCardDescription">
                  {showFullDescription[post.id]
                    ? post.longDescription
                    : post.shortDescription}
                  <button
                    className="eightSectionCardLink"
                    onClick={() => toggleDescription(post.id)}
                  >
                    {showFullDescription[post.id]
                      ? "Read Less..."
                      : "... Read More"}
                  </button>
                </p>
              )}

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
                    <AuthorPopover name={post.author} />
                  )}
                </div>

                <div
                  className="eightSectionCardComment"
                  onClick={() => handleCommentClick(post.id)}
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
                    Comment{comments[post.id] !== 1 ? "s" : ""}
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

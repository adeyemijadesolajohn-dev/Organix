import React from "react";
import "../styles/Footer.scss";
import { FaRegPaperPlane } from "react-icons/fa";
import { LiaShippingFastSolid } from "react-icons/lia";
import { RiSecurePaymentLine, RiDiscountPercentLine } from "react-icons/ri";
import { LuBadgeHelp, LuFacebook } from "react-icons/lu";
import { CgFormatSeparator } from "react-icons/cg";
import { PiXLogoBold, PiTiktokLogoBold } from "react-icons/pi";
import { GrInstagram } from "react-icons/gr";
import { FiYoutube } from "react-icons/fi";
import { images } from "../Data/Images";

const Footer = () => {
  return (
    <div className="footer">
      <div className="footerContent">
        <div className="upperFooter">
          <div className="upperFooterLeft">
            <div className="upperFooterLeftSubscribe">
              <FaRegPaperPlane className="upperFooterLeftSubscribeIcon" />

              <h2 className="upperFooterLeftSubscribeText">
                Subscribe to our emails
              </h2>
            </div>

            <div className="upperFooterLeftMotto">
              <p className="upperFooterLeftMottoText">
                ...and receive $10 coupon for first shopping
              </p>
            </div>
          </div>

          <div className="upperFooterRight">
            <input
              type="email"
              name="subscribe"
              className="upperFooterRightInput"
              placeholder="Enter your email here..."
              arial-placeholder="Enter your email here..."
            />

            <button className="upperFooterRightButton">Subscribe</button>
          </div>
        </div>

        <div className="middleFooter">
          <div className="middleFooterItem">
            <div className="middleFooterItemIcon">
              <LiaShippingFastSolid className="middleFooterItemIconIcon" />
            </div>

            <div className="middleFooterItemText">
              <h5 className="middleFooterItemTextTitle">Fast Delivery</h5>
            </div>

            <div className="middleFooterItemDescription">
              <p className="middleFooterItemDescriptionText">
                Across West & East India
              </p>
            </div>
          </div>

          <div className="middleFooterItem">
            <div className="middleFooterItemIcon">
              <RiSecurePaymentLine className="middleFooterItemIconIcon" />
            </div>

            <div className="middleFooterItemText">
              <h5 className="middleFooterItemTextTitle">Safe Payment</h5>
            </div>

            <div className="middleFooterItemDescription">
              <p className="middleFooterItemDescriptionText">
                100% Secure Payment
              </p>
            </div>
          </div>

          <div className="middleFooterItem">
            <div className="middleFooterItemIcon">
              <RiDiscountPercentLine className="middleFooterItemIconIcon" />
            </div>

            <div className="middleFooterItemText">
              <h5 className="middleFooterItemTextTitle">Online Discount</h5>
            </div>

            <div className="middleFooterItemDescription">
              <p className="middleFooterItemDescriptionText">
                Add Multi-buy Discount
              </p>
            </div>
          </div>

          <div className="middleFooterItem">
            <div className="middleFooterItemIcon">
              <LuBadgeHelp className="middleFooterItemIconIcon" />
            </div>

            <div className="middleFooterItemText">
              <h5 className="middleFooterItemTextTitle">Help Center</h5>
            </div>

            <div className="middleFooterItemDescription">
              <p className="middleFooterItemDescriptionText">
                24/7 Online Support
              </p>
            </div>
          </div>

          <div className="middleFooterItem">
            <div className="middleFooterItemIcon">
              <CgFormatSeparator className="middleFooterItemIconIcon" />
            </div>

            <div className="middleFooterItemText">
              <h5 className="middleFooterItemTextTitle">Curated Items</h5>
            </div>

            <div className="middleFooterItemDescription">
              <p className="middleFooterItemDescriptionText">
                From Handpicked Sellers
              </p>
            </div>
          </div>
        </div>

        <div className="lowerFooter">
          <div className="lowerFooterLogo">
            <img src={images.leaves} alt="organix logo" />
            <h3 className="lowerFooterLogoText">organix</h3>
          </div>

          <div className="lowerFooterDescription">
            <p className="lowerFooterDescriptionText">
              Organix is a food delivery app that allows you to order fresh
              vegetables and fruits from local farmers. We are committed to
              providing you with the freshest and healthiest food possible. Our
              mission is to promote sustainable agriculture and support local
              economies by providing a marketplace for organic food. We believe
              that by connecting farmers with consumers, we can create a more
              equitable and sustainable food system.
            </p>
          </div>

          <div className="lowerFooterSocials">
            <div className="lowerFooterSocialsIcons">
              <PiXLogoBold className="lowerFooterSocialsIconsIcon" />
              <LuFacebook className="lowerFooterSocialsIconsIcon" />
              <GrInstagram className="lowerFooterSocialsIconsIcon" />
              <FiYoutube className="lowerFooterSocialsIconsIcon" />
              <PiTiktokLogoBold className="lowerFooterSocialsIconsIcon" />
            </div>
          </div>

          <div className="lowerFooterPolicies">
            <a href="#" className="lowerFooterPoliciesText">
              Privacy Policy
            </a>

            <a href="#" className="lowerFooterPoliciesText">
              Refund Policy
            </a>

            <a href="#" className="lowerFooterPoliciesText">
              Terms of Service
            </a>

            <a href="#" className="lowerFooterPoliciesText">
              Contact Information
            </a>
          </div>

          <div className="lowerFooterCopyright">
            <p className="lowerFooterCopyrightText">
              Copyright ©{" "}
              <a href="#" className="lowerFooterCopyrightLink">
                Organix
              </a>
              . 2025 By{" "}
              <a href="#" className="lowerFooterCopyrightLink">
                Alothemes
              </a>
              .
            </p>
            <p className="lowerFooterCopyrightText">All rights reserved.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;

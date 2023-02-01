import { TbLeaf, } from "react-icons/tb"
import { BiSupport } from "react-icons/bi";
import { MdOutlineSavings, MdMobileFriendly } from "react-icons/md";
import "../styles/Features.css"

export default function Features(){

  return(
    <div className="containerGridForFeatures">
      <div className="feature">
        <MdMobileFriendly className="featureIcon" />
        <p className="feautureTitle">Always with you!</p>
        <p className="featureText">Because we are on your phone, you can't leave your ticket/pass at home.</p>
      </div>
      <div className="feature">
        <TbLeaf className="featureIcon" />
        <p className="feautureTitle">No waste</p>
        <p className="featureText">Buy tickets, passes from the app <br/>
        Save the world!</p>
      </div>
      <div className="feature">
        <MdOutlineSavings className="featureIcon" />
        <p className="feautureTitle">No extra fees</p>
        <p className="featureText">Buy your ticket, pass from your bed <br/>
        with no hidden fees.</p>
      </div>
      <div className="feature">
        <BiSupport className="featureIcon" />
        <p className="feautureTitle">24/7 support</p>
        <p className="featureText">Is there any problem with your ticket/pass? <br/>
        Get in touch with us!</p>
      </div>
    </div>
  )
}
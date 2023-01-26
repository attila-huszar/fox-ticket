import "../styles/AsFeaturedIn.css";
import m1Logo from "../assets/logosfeaturedin/M1.png";
import m2Logo from "../assets/logosfeaturedin/M2.png";
import rtlLogo from "../assets/logosfeaturedin/rtl.png";
import kiskegyedLogo from "../assets/logosfeaturedin/kiskegyed.jpeg";
import NYTimesLogo from "../assets/logosfeaturedin/NYTimes.png" 
import ForbesLogo from "../assets/logosfeaturedin/Forbes.png";

export default function AsFeaturedIn(){

  return(
    <section className="sectionFeatured">
        <h2 className="headingFeaturedIn"> As featured in</h2>
      <div className="containerFeaturedIn">
        <div className="logos">
          <img src={m1Logo} className="featuredInlogos" alt="m1 logo"/>
          <img src={m2Logo} className="featuredInlogos" alt="m2 logo"/>
          <img src={rtlLogo} className="featuredInlogos" alt="rtl logo"/>
          <img src={kiskegyedLogo} className="featuredInlogos" alt="kiskegyed logo"/>
          <img src={NYTimesLogo} className="featuredInlogos" alt="NYTimes logo"/>
          <img src={ForbesLogo} className="featuredInlogos" alt="Forbes logo"/>
        </div>
      </div>
    </section>
  )
}
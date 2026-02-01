import { Link } from "react-router-dom/cjs/react-router-dom.min"
export default function Banner(){

    return (

        <section className="banner">
        <h1 className="logo">Teknolojik Yemekler</h1>
              <div className="banner-text">
                <p className="sub">fırsatı kaçırma</p>
                <h2><span>KOD </span><span>ACIKTIRIR </span><span>PİZZA, </span><span>DOYURUR</span></h2>
                  
                
                <Link to="/formPage" className="cta" data-testid="order-button">ACIKTIM!</Link> 
              </div>
              <img className="pizza" src="/images/banner-gorseller/banner.png.png" alt="pizza"/>
              <img className="malzemeler" src="/images/banner-gorseller/div.png" alt="malzemeler"/>
              <img className="sag-ust" src="public/images/banner-gorseller/sağ üst.png" alt="sag-ust"/>
              <img className="sol-alt" src="public/images/banner-gorseller/sol alt.png" alt="sol-alt"/>
              
        </section>
        
    
    )
}
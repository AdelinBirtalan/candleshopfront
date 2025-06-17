import banner from '../media/banner.jpg'
import './Home.css'

function Home() {
    return (
        <>
        <div className="banner">
        <img src={banner} alt="" />
        </div>
        <div className="banner-title">
            <h1>Handcrafted candles to light<br /> up  your moments with warmth.</h1>
            <button>Shop Now</button>
        </div>
        </>
    )
}

export default Home
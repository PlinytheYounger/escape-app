import image from '../images/home_photo.jpeg';
import './css/home.css';


export default function Home() {
    return(
        <div className="backgroundStyle">
            <div className="imageContainer">
                <img src={image} className="imageStyle" alt="beautiful landscape"/>
                <h2 className="h2Style">
                    your next adventure awaits...
                </h2>
            </div>
            
        </div>
    )
}
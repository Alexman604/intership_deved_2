
import { Carousel } from 'antd';

const CarouselPhoto = ({ images = [] }) => {
   
    const imgStyle = {
        width: '460px',
    }
    return (
        <Carousel effect="fade" autoplay="true" style={imgStyle}>
            <div >
                <h3 >
                    <img style={imgStyle} src={images[0]} alt="" />
                </h3>
            </div>
            <div >
                <h3 ><img style={imgStyle} src={images[1]} alt="" /></h3>
            </div>
        </Carousel>
    );
}
export default CarouselPhoto;

import { Carousel, Spin, Image } from "antd";

const CarouselPhoto = ({ images }) => {
  return (
    <>
      {!images ? <Spin /> : null}
      <Carousel
        // autoplay="true"

        className="carousel-wrapper"
      >
        <div>
          <Image height="auto" src={images[0]} fluid />
        </div>
        <div>
          <Image src={images[1]} fluid />
        </div>
      </Carousel>
    </>
  );
};
export default CarouselPhoto;

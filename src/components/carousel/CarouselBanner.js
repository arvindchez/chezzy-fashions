import React, { useEffect } from 'react';
import { connect } from "react-redux";
import { fetchCarousel } from "../../actions/carousel";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const CarouselBanner = (props) => {

    var settings = {
        autoplay: true,
        autoplaySpeed: 3000,
        dots: true
    };

    useEffect(() => {
        props.fetchCarousel();
    }, [])

    return (
        <div>
            {props.carousel && props.carousel.length > 0 &&
                (
                    <div className="container">
                        <Slider {...settings}>
                            {props.carousel.map(item =>
                                <div>
                                    <img key={item._id} className="img-fluid" src={item.image} alt={item.title} />
                                </div>
                            )}
                        </Slider>
                    </div>
                )
            }
        </div >
    )
}


export default connect(
    (state) => ({
        carousel: state.carousel.carousel
    }),
    { fetchCarousel }
)(CarouselBanner);
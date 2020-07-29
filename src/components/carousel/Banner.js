/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import { connect } from "react-redux";
import { fetchCarousel } from "../../actions/carousel";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Banner = (props) => {

    var settings = {
        autoplay: true,
        autoplaySpeed: 3000,
        dots: true
    };

    useEffect(() => {
        props.fetchCarousel();
    }, [])

    const imagePath = `/images/${process.env.REACT_APP_NAME}/banner/`;

    return (
        <div className="banner-container">
            {props.carousel && props.carousel.length > 0 &&
                (
                    <Slider {...settings}>
                        {props.carousel.map((item, index) =>
                            <img key={item._id} src={imagePath + item.image} alt={item.title} />
                        )}
                    </Slider>
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
)(Banner);
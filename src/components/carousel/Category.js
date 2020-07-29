/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import SectionTitle from "../title/SectionTitle"
import { connect } from "react-redux";
import { fetchCategory } from "../../actions/category";
import { Link } from 'react-router-dom';

function NextArrow(props) {
    const { onClick } = props;
    return (
        <div className="slider-btn" onClick={onClick}>
            <span className="next position-top right-0 slick-arrow">
                <i className="fas fa-chevron-right fa-2x"></i>
            </span>
        </div>
    );
}

function PrevArrow(props) {
    const { onClick } = props;
    return (
        <div className="slider-btn" onClick={onClick}>
            <span className="prev position-top slick-arrow">
                <i className="fas fa-chevron-left fa-2x text-secondary"></i>
            </span>
        </div>
    );
}

const Category = (props) => {

    var settings = {
        speed: 1000,
        slidesToShow: 5,
        slidesToScroll: 1,
        initialSlide: 0,
        nextArrow: <NextArrow />,
        prevArrow: <PrevArrow />,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    };

    useEffect(() => {
        props.fetchCategory();
    }, [])

    const imagePath = `/images/${process.env.REACT_APP_NAME}/category/`;

    return (
        <section className="category">
            <SectionTitle title="Categories"></SectionTitle>
            <div className="category-center">
                {props.catergories && props.catergories.length > 0 && (
                    <Slider {...settings}>
                        {props.catergories.map((item, index) =>
                            <div key={index} className="products">
                                <Link to={`/product?cat=${item.title}`}>
                                    <img key={item._id} src={imagePath + item.image} alt={item.title} />
                                    <span className="border site-btn btn-span">{item.description}</span> </Link>
                            </div>
                        )}
                    </Slider>
                )}
            </div>
        </section>
    )
}

export default connect(
    (state) => ({
        catergories: state.catergories.catergories
    }),
    { fetchCategory }
)(Category);
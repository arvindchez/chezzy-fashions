/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import SectionTitle from "../title/SectionTitle"
import { connect } from "react-redux";
import { searchProducts } from "../../actions/product"
import { Link } from 'react-router-dom';

function SampleNextArrow(props) {
    const { onClick } = props;
    return (
        <div className="slider-btn" onClick={onClick}>
            <span className="next position-top right-0 slick-arrow">
                <i className="fas fa-chevron-right fa-2x"></i>
            </span>
        </div>
    );
}

function SamplePrevArrow(props) {
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
        nextArrow: <SampleNextArrow />,
        prevArrow: <SamplePrevArrow />,
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


    return (
        <section className="category">
            <SectionTitle title="Categories"></SectionTitle>
            <div className="category-center">
                <Slider {...settings}>
                    <div className="product">
                        <Link to="/product?cat=tshirt">  <img src="images/tshirt.jpg" alt="product 1" />
                            <span className="border site-btn btn-span">T-Shirts</span> </Link>
                    </div>
                    <div className="product">
                        <Link to="/product?cat=jacket"> <img src="images/jackets.jpg" alt="product 2" />
                            <span className="border site-btn btn-span">Jackets</span> </Link>
                    </div>
                    <div className="product">
                        <Link to="/product?cat=ties">
                            <img src="images/tie.jpg" alt="product 3" />
                            <span className="border site-btn btn-span">Neck Ties</span> </Link>
                    </div>
                    <div className="product">
                        <Link to="/product?cat=bikini">   <img src="images/bikini.jpg" alt="product 4" />
                            <span className="border site-btn btn-span">Swim Wear</span> </Link>
                    </div>
                    <div className="product">
                        <Link to="/product?cat=denim">   <img src="images/denim.jpg" alt="product 5" />
                            <span className="border site-btn btn-span">Denim</span> </Link>
                    </div>
                    <div className="product">
                        <Link to="/product?cat=skirts"> <img src="images/skirts.jpg" alt="product 5" />
                            <span className="border site-btn btn-span">Skirts</span> </Link>
                    </div>
                    <div className="product">
                        <Link to="/product?cat=shirt"><img src="images/shirt.jpg" alt="product 6" />
                            <span className="border site-btn btn-span">Shirt</span> </Link>
                    </div>
                </Slider>
            </div>
        </section>
    )
}

export default connect(
    (state) => ({}),
    {
        searchProducts
    }
)(Category);


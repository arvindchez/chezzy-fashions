/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import SectionTitle from "../title/SectionTitle"
import { connect } from "react-redux";
import { fetchFeaturedProducts } from "../../actions/product";
import Loading from '../Loading/Loading';
import FeaturedProduct from '../products/FeaturedProduct';

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

const Featured = (props) => {

    useEffect(() => {
        props.fetchFeaturedProducts();
    }, [])

    if (!props.featuredProducts) {
        return (
            <div><Loading /></div>
        )
    }

    const products = props.featuredProducts.map(product => {
        return <FeaturedProduct key={product._id} product={product} />
    })

    var settings = {
        speed: 1000,
        slidesToShow: products.length < 4 ? products.length : 4,
        slidesToScroll: 1,
        nextArrow: <NextArrow />,
        prevArrow: <PrevArrow />,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: products.length < 2 ? products.length : 2,
                    slidesToScroll: 1
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: products.length < 2 ? products.length : 2,
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
        <section className="featured">
            <SectionTitle title="Featured Products"></SectionTitle>
            <div className="featured-center">
                {products && products.length > 0 ?
                    (<Slider {...settings}> {products}</Slider>) : (
                        <div className="empty-search">
                            <h5>Featured products coming soon...</h5>
                        </div>
                    )}
            </div>
        </section>
    )
}

export default connect(
    (state) => ({
        featuredProducts: state.products.featuredProducts
    }),
    { fetchFeaturedProducts }
)(Featured);

import React from 'react'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import SectionTitle from "../title/SectionTitle"

const Category = () => {

    var settings = {
        speed: 1000,
        slidesToShow: 5,
        slidesToScroll: 1,
        initialSlide: 0,
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
                    <div class="product">
                        <img src="images/tshirt.jpg" alt="product 1" />
                        <span class="border site-btn btn-span">T-Shirts</span>
                    </div>
                    <div class="product">
                        <img src="images/jackets.jpg" alt="product 2" />
                        <span class="border site-btn btn-span">Jackets</span>
                    </div>
                    <div class="product">
                        <img src="images/tie.jpg" alt="product 3" />
                        <span class="border site-btn btn-span">Neck Ties</span>
                    </div>
                    <div class="product">
                        <img src="images/bikini.jpg" alt="product 4" />
                        <span class="border site-btn btn-span">Swim Wear</span>
                    </div>
                    <div class="product">
                        <img src="images/denim.jpg" alt="product 5" />
                        <span class="border site-btn btn-span">Denim</span>
                    </div>
                    <div class="product">
                        <img src="images/skirts.jpg" alt="product 5" />
                        <span class="border site-btn btn-span">Skirts</span>
                    </div>
                    <div class="product">
                        <img src="images/shirt.jpg" alt="product 6" />
                        <span class="border site-btn btn-span">Shirt</span>
                    </div>
                </Slider>
            </div>
        </section>
    )
}

export default Category

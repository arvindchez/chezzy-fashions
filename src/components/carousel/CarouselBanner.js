import React from 'react';
import Carousel from 'react-elastic-carousel';
import { connect } from "react-redux";

const CarouselBanner = (props) => {
    return (
        <div>
            {props.carousel && props.carousel.length > 0 &&
                (
                    <Carousel
                        showArrows={false}
                        pagination={true}
                        enableAutoPlay
                        autoPlaySpeed={3000}
                    >
                        {props.carousel.map(item =>
                            <img className="carousel-style-img"
                                key={item._id}
                                src={item.image}
                                alt={item.title}>
                            </img>

                        )}
                    </Carousel>

                )
            }

        </div >
    )
}


export default connect(
    (state) => ({
        carousel: state.carousel.carousel
    })
)(CarouselBanner);
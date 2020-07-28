import React from 'react'
import styled from "styled-components";
import { useSpring, animated } from "react-spring";
import { connect } from "react-redux";
import Loading from '../Loading/Loading';
import {
    filterProductsBySize,
    sortProducts,
    filterProductsByColor
} from "../../actions/product";


const ProductFilter = (props) => {

    const getUnique = (items, value) => {
        let type = [...new Set(items.map(item => item[value]))]
        type = new Set(type.flat(1))
        return ['All', ...type]
    }

    const sectionAnimation = useSpring({
        from: { transform: 'translate3d(0, -10rem, 0)' },
        transform: 'translate3d(0, 0, 0)',
    });

    const selectAnimation = useSpring({
        from: { transform: 'translate3d(0, 30px, 0)', opacity: 0 },
        to: { transform: 'translate3d(0, 0, 0)', opacity: 1 },
        delay: 100
    });

    return !props.filteredProducts ? (
        <div> <Loading /></div>
    ) : (
            <Filters style={sectionAnimation}>
                <FlexContainer>
                    <Label>
                        Total Products: {props.totalProducts}
                    </Label>
                </FlexContainer>
                <FlexContainer>
                    <Label>Order</Label>
                    <Select style={selectAnimation} name="sort"
                        value={props.sort}
                        onChange={(e) =>
                            props.sortProducts(
                                props.filteredProducts,
                                e.target.value
                            )
                        }>
                        <option value="latest">Latest</option>
                        <option value="lowest">Lowest</option>
                        <option value="highest">Highest</option>
                    </Select>
                </FlexContainer>
                <FlexContainer>
                    <Label>Size</Label>
                    <Select style={selectAnimation} name="size"
                        value={props.size ? props.size : "All"}
                        onChange={(e) =>
                            props.filterProductsBySize(props.products, e.target.value)
                        }>{
                            props.products ?
                                (
                                    getUnique(props.products, 'availableSizes')
                                        .map((item, index) => {
                                            if (item === "All") {
                                                return <option value="" key={index}>{item}</option>
                                            } else {
                                                return <option value={item} key={index}>{item}</option>
                                            }
                                        })

                                ) : "All"
                        }
                    </Select>
                </FlexContainer>
                <FlexContainer>
                    <Label>Colour</Label>
                    <Select style={selectAnimation} name="color"
                        value={props.color ? props.color : "All"}
                        onChange={(e) =>
                            props.filterProductsByColor(props.products, e.target.value)
                        }>{
                            props.products ?
                                (
                                    getUnique(props.products, 'availableColours')
                                        .map((item, index) => {
                                            if (item === "All") {
                                                return <option value="" key={index}>{item}</option>
                                            } else {
                                                return <option value={item} key={index}>{item}</option>
                                            }
                                        })

                                ) : "All"
                        }
                    </Select>
                </FlexContainer>
            </Filters>
        )
}

export default connect(
    (state) => ({
        color: state.products.color,
        size: state.products.size,
        sort: state.products.sort,
        products: state.products.items,
        filteredProducts: state.products.filteredItems,
        totalProducts: state.products.totalProducts,
    }),
    {
        filterProductsBySize,
        sortProducts,
        filterProductsByColor
    }
)(ProductFilter);


const Filters = styled(animated.section)`
  border-radius: 10px;
  width: 100%;
  margin: 0 auto;
  display: flex;
  grid-template-columns: repeat(4, minmax(250px, 1fr));
  background: #c4dbd8;
  height: 3rem;
  
  @media screen and (max-width: 430px) {
   height: 20rem;
   font-size: 1rem;
   flex-direction:column;
  }

  @media screen and (min-width: 430px) and (max-width: 992px){
    height: 15rem;
  }

  @media screen and (min-width: 992px) {
    width: 100vw;
    max-width: 1200px;
  } 
`;

const FlexContainer = styled.div`
  margin: auto;
  padding: 1 1rem;
`;

const Label = styled.label`
  color: rgb(2, 2, 43);
  padding: 0 .3rem;
  font-family: var(--roboto);
`;

const Select = styled(animated.select)`
  margin: auto 0;
  background: white;
  border-radius: 10px;
`;


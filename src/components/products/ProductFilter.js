import React from 'react'
import styled from "styled-components";
import { useSpring, animated } from "react-spring";
import { connect } from "react-redux";
import Loading from '../Loading';
import {
    filterProductsBySize,
    sortProducts,
    searchProducts,
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
                        Total Products: {props.filteredProducts.length}
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
                <FlexContainer>
                    <Label>Search</Label>
                    <Input style={selectAnimation} type="text"
                        autoComplete="false"
                        name="search"
                        placeholder="Search product..."
                        onKeyUp={(e) =>
                            props.searchProducts(e.target.value)
                        } />
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
    }),
    {
        filterProductsBySize,
        sortProducts,
        filterProductsByColor,
        searchProducts
    }
)(ProductFilter);


const Filters = styled(animated.section)`
  border-radius: 10px;
  width: 100%;
  margin: 0 auto;
  display: flex;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  grid-row-gap: 1rem;
  grid-column-gap: 30px;
  background: lightgray;
  font-size: 1.2rem;
  height: 5rem;
  
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
  padding: 0 2rem;
`;

const Label = styled.label`
  display: table;
  font-weight: bold;
  color: rgb(2, 2, 43);
  margin: auto;
  padding: 0 2rem;
`;

const Input = styled.input`
  color: rgb(2, 2, 43);
  margin: auto;
  padding: 0 2rem;
  background: white;
  outline: none;
  border-radius: 10px;
`;

const Select = styled(animated.select)`
  margin: auto 0;
  background: white;
  border-radius: 10px;
`;


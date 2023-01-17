import React, { useState } from 'react';
import { AiOutlineMinus, AiOutlinePlus, AiFillStar, AiOutlineStar } from 'react-icons/ai';

import { client } from 'lib/sanity';
import { Product } from 'components/exports';
import { IProduct } from 'app-types';
import { GetStaticPropsContext } from 'next';
import { useAppDispatch } from 'hooks/redux';
import { increaseCartItemQuantity, toggleCartDisplay } from 'redux/features/cartSlice';
import { toast } from 'react-hot-toast';
import SanityImage from 'components/SanityImage';

interface IProps {
    product: IProduct,
    products: IProduct[]
}

const ProductDetails = ({ product, products }: IProps) => {
    const dispatch = useAppDispatch()
    const { image, name, details, price } = product;
    const [index, setIndex] = useState(0);
    const [selectedQuantity, setSelectedQuantity] = useState(1)

    const handleAddToCart = () => {
        dispatch(increaseCartItemQuantity({ quantity: selectedQuantity, product: product }))
        toast.success(`${selectedQuantity} ${product.name} items added`)
        dispatch(toggleCartDisplay())
    }


    return (
        <div>
            <div className="product-detail-container">
                <div>
                    <div className="image-container">
                        <SanityImage
                            image={image && image[index]}
                            alt={product.name}
                            className="product-detail-image"
                        />
                    </div>
                    <div className="small-images-container">
                        {image?.map((image: any, i: number) => (
                            <SanityImage
                                alt={product.name}
                                key={i}
                                image={image}
                                className={i === index ? 'small-image selected-image' : 'small-image'}
                                onMouseEnter={() => setIndex(i)}
                            />
                        ))}
                    </div>
                </div>

                <div className="product-detail-desc">
                    <h1>{name}</h1>
                    <div className="reviews">
                        <div>
                            <AiFillStar />
                            <AiFillStar />
                            <AiFillStar />
                            <AiFillStar />
                            <AiOutlineStar />
                        </div>
                        <p>
                            (20)
                        </p>
                    </div>
                    <h4>Details: </h4>
                    <p>{details}</p>
                    <p className="price">${price}</p>
                    <div className="quantity">
                        <h3>Quantity:</h3>
                        <p className="quantity-desc">
                            <span
                                className="minus"
                                onClick={
                                    () => setSelectedQuantity(prev => prev > 1 ? prev - 1 : prev)
                                }>
                                <AiOutlineMinus />
                            </span>
                            <span className="num">{selectedQuantity}</span>
                            <span
                                className="plus"
                                onClick={
                                    () => setSelectedQuantity(prev => prev + 1)
                                }
                            >
                                <AiOutlinePlus />
                            </span>
                        </p>
                    </div>
                    <div className="buttons">
                        <button
                            type="button"
                            className="add-to-cart"
                            onClick={handleAddToCart}
                        >
                            Add to Cart
                        </button>
                        <button
                            type="button"
                            className="buy-now"
                            onClick={handleAddToCart}
                        >
                            Buy Now
                        </button>
                    </div>
                </div>
            </div>

            <div className="maylike-products-wrapper">
                <h2>You may also like</h2>
                <div className="marquee">
                    <div className="maylike-products-container track">
                        {products.map((item: IProduct) => (
                            <Product key={item._id} product={item} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export const getStaticPaths = async () => {
    const query = `*[_type == "product"] {
    slug {
      current
    }
  }
  `;

    const products = await client.fetch(query);

    const paths = products.map((product: IProduct) => ({
        params: {
            slug: product.slug.current
        }
    }));

    return {
        paths,
        fallback: 'blocking'
    }
}

export const getStaticProps = async ({ params }: GetStaticPropsContext) => {
    const query = `*[_type == "product" && slug.current == '${params?.slug}'][0]`;
    const productsQuery = '*[_type == "product"]'

    const product = await client.fetch(query);
    const products = await client.fetch(productsQuery);

    return {
        props: { products, product }
    }
}

export default ProductDetails
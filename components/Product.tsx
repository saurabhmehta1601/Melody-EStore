import { IProduct } from 'app-types'
import Link from 'next/link'
import React from 'react'
import SanityImage from './SanityImage'

interface IProps {
    product: IProduct
}

const Product = ({ product }: IProps) => {
    return (
        <div>
            <Link href={`/product/${product.slug.current}`}>
                <div className="product-card">
                    <SanityImage
                        image={product.image && product.image[0]}
                        className='product-image'
                        alt={product._id}
                        width={250}
                        height={250}

                    />
                    <p className="product-name">
                        {product.name}
                    </p>
                    <p className="product-price"> &#8377; {product.price} </p>
                </div>
            </Link></div>
    )
}

export default Product
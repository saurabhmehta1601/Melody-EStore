import { IProduct } from 'app-types'
import Link from 'next/link'
import React from 'react'
import { urlFor } from '../lib/sanityClient'

interface IProps {
    product: IProduct
}

const Product = ({ product }: IProps) => {
    return (
        <div><Link href={`/product/${product.slug.current}`}>
            <div className="product-card">
                <img
                    className='product-image'
                    src={urlFor(product.image && product.image[0]) as any}
                    alt=""
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
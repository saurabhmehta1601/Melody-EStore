import { IBanner } from 'app-types'
import Link from 'next/link'
import React from 'react'
import { urlFor } from '../lib/client'

interface IProps {
    heroBanner: IBanner
}

const HeroBanner = ({ heroBanner }: IProps) => {
    return (
        <div className='hero-banner-container'>
            <p className='beats-solo'>
                {heroBanner.smallText}
            </p>
            <h3>{heroBanner.midText}</h3>
            <h1>{heroBanner.largeText1}</h1>
            {/* @ts-expect-error */}
            <img src={urlFor(heroBanner.image)} alt="headphones" className='hero-banner-image' />
            <div>
                <Link href={`/product/${heroBanner.product}`}>
                    <button type="button">{heroBanner.buttonText}</button>
                </Link>
                <div>
                    <div className="desc">
                        <h5>Description</h5>
                        <p>{heroBanner.desc}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default HeroBanner
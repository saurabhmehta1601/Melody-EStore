import { IBanner } from 'app-types'
import React from 'react'
import Link from 'next/link'
import { urlFor } from '../lib/sanityClient'

interface IProps {
    footerBanner: IBanner
}

const FooterBanner = ({ footerBanner }: IProps) => {
    return (
        <div className='footer-banner-container'>
            <div className="banner-desc">
                <div className="left">
                    <p>{footerBanner.discount}</p>
                    <h3>{footerBanner.largeText1}</h3>
                    <h3>{footerBanner.largeText2}</h3>
                    <p>{footerBanner.saleTime}</p>
                </div>
                <div className="right" >
                    <p>{footerBanner.smallText}</p>
                    <h3>{footerBanner.midText}</h3>
                    <p>{footerBanner.desc}</p>
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                        <Link href={`/product/${footerBanner.product}`}>
                            <button type="button" style={{ position: 'relative', zIndex: 11 }}>{footerBanner.buttonText}</button>
                        </Link>

                    </div>
                </div>
                {/* @ts-expect-error */}
                <img src={urlFor(footerBanner.image)} alt="product" className="footer-banner-image" />
            </div>
        </div >
    )
}

export default FooterBanner
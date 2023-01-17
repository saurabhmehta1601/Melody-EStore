import React from 'react'
import NextImage from "next/image"
import { useNextSanityImage } from "next-sanity-image"
import { client } from 'lib/sanity'

const SanityImage = (props: any) => {
    const imageProps = useNextSanityImage(client, props.image)
    return (
        <NextImage
            // @ts-expect-error
            {...imageProps}
            {...props}
        />
    )
}

export default SanityImage
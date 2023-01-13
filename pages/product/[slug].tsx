import { IProduct } from "app-types"
import { urlFor, client } from "lib/client"
import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from "next"

interface IProps {
    product: IProduct,
    products: IProduct[]
}

export default function Product({ product, products }: IProps) {
    const { image, name, details, price, } = product
    return (<div>
        <div className="product-detail-container">
            <div>
                <div className="image-container">
                    {/* @ts-expect-error */}
                    <img src={urlFor(image && image[0])} alt="" />
                </div>
            </div>
        </div>
    </div>)
}

export const getStaticPaths: GetStaticPaths = async () => {
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



export const getStaticProps: GetStaticProps = async ({ params }: GetStaticPropsContext) => {
    const query = `*[_type == "product" && slug.current == '${params?.slug}'][0]`;
    const productsQuery = '*[_type == "product"]'

    const product = await client.fetch(query);
    const products = await client.fetch(productsQuery);

    console.log(product);

    return {
        props: { products, product }
    }
}


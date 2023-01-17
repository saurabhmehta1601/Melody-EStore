import React, { useEffect } from 'react'
import Lottie from "react-lottie-player"
import styles from "styles/payment.module.css"

const PaymentSuccess = () => {
    const [animationData, setAnimationData] = React.useState<object>()
    useEffect(() => {
        import('public/assets/lottie/payment-successful.json').then(setAnimationData)
    }, [])

    return (<>
        <div className={styles.container}>
            <h3 className={styles.h3}>Your Order has been placed </h3>
            <Lottie
                play
                loop={false}
                animationData={animationData}
                style={{ width: 300, height: 300 }}
            />
            <h5 className={styles.h5}>Thank you for purchasing from our store</h5>
        </div>
    </>)
}

export default PaymentSuccess
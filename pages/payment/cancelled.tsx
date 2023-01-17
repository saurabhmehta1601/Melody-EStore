import React, { useEffect } from 'react'
import Lottie from "react-lottie-player"
import styles from "styles/payment.module.css"

const PaymentCancelled = () => {
    const [animationData, setAnimationData] = React.useState<object>()
    useEffect(() => {
        import('public/assets/lottie/payment-failed.json').then(setAnimationData)
    }, [])

    return (<>
        <div className={styles.container}>
            <h3 className={styles.h3}>Your Order could not be placed </h3>
            <Lottie
                play
                loop={false}
                animationData={animationData}
            />
            <h5 className={styles.h5}>Please try Again</h5>
        </div>
    </>)
}

export default PaymentCancelled 
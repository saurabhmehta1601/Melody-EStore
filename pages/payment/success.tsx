import React, { useEffect } from 'react'
import Lottie from "react-lottie-player"
import styles from "styles/payment-success.module.css"
import { MdDone } from "react-icons/md"

const PaymentSuccess = () => {
    const [animationData, setAnimationData] = React.useState<object>()
    const [isPlaying, setIsPlaying] = React.useState<boolean>(true)
    useEffect(() => {
        import('public/assets/lottie/payment-success.json').then(setAnimationData)
    }, [])

    return (<>
        {
            isPlaying && <Lottie
                play={isPlaying}
                onLoopComplete={() => setIsPlaying(false)}
                animationData={animationData}
            />
        }
        <div className={styles.container}>
            <h3 className={styles.h3}>Your Order has been placed </h3>
            <div className={styles.successIconContainer}>
                <MdDone className={styles.successIcon} />
            </div>
            <h5 className={styles.h5}>Thank you for purchasing from our store</h5>
        </div>
    </>)
}

export default PaymentSuccess
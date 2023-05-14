import { useState } from "react";

import Container from './container'

import Styles from '@styles/Subscribe.module.css'

const SubscribeNewsletter = () => {
    const [state, setState] = useState(0);
    const [errorMsg, setErrorMsg] = useState("");
    // 0 - initial , 1 - loading, 2 - success, 2 - error

    const subscribe = async (e) => {
        e.preventDefault();

        setState(1);
        setErrorMsg("");
        console.log(e.target[0].value);
        try {
            const res = await fetch("/api/mailchimp", {
                method: "POST",
                body: e.target[0].value,
            });

            const data = await res.json();
            if (data.error !== null) {
                throw data.error;
            }
            setState(2);
        } catch (e) {
            setErrorMsg(e);
            setState(3);
        }
    };

    return (
        <section className={`${Styles.subscribe} flex-cols sm:flex-cols flex items-center justify-center text-center md:justify-between md:mb-12`}>
            <Container>
                <h3>
                    Subscribe to
                    <span>the newsletters</span>
                </h3>
                <div className={Styles.subscribe_wrap}>
                    <form className={Styles.subscribe_form} onSubmit={subscribe}>
                        <input type="email" placeholder="Your email address" aria-label="Your email address" autoComplete="email" required />
                        <button type="submit">Subscribe</button>
                    </form>
                    {
                        state === 1 ? (
                            <span>Sending in progress...</span>
                        ) : (
                            state == 2 ? (
                                <span className="font-medium text-green-600">
                                    Thanks for subscribing to our newsletters.
                                </span>
                            ) : (
                                state === 3 ? (
                                    <span className="font-medium text-red-600">{errorMsg}</span>
                                ) : (
                                <span>Stay inform about new content and update posts.</span>
                                )
                            )
                        )
                    }
                </div>
            </Container>
        </section>
    )
}

export default SubscribeNewsletter
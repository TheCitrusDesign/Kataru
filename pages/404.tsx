import Head from 'next/head'
import Link from 'next/link'
import { SITE_NAME } from '@core/constants'

import Layout from 'components/layout'
import Container from 'components/container'
import SectionHeader from 'components/section-header'
import Subscribe from '@components/subscribe'

const NotFound = () => {
    const title = `404 | ${SITE_NAME}`

    return (
        <Layout>
            <Head>
                <title>{title}</title>
            </Head>
            <section className='flex items-center justify-center w-full h-full my-48'>
                <Container>
                    <SectionHeader subtitle="Woops !" title="This page doesn't exist." />
                    <div className='flex flex-col items-center justify-center w-full h-full global-not-found'>
                        <h1>404</h1>
                            <Link href={{ pathname: `${process.env.NEXT_PUBLIC_URL}` }}>
                                <button className='rounded-full bg-black hover:bg-light-blue text-white text-xl font-bold py-6 px-8 transition-bg-blue duration-200'>
                                    BACK TO HOMEPAGE
                                </button>
                            </Link>
                    </div>
                </Container>
            </section>
            <Subscribe />
        </Layout>
    )
}

export default NotFound;

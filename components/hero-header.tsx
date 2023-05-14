import React, { useState } from 'react'
import { useKeenSlider } from 'keen-slider/react'
import { SITE_NAME } from '@core/constants'
import type { PostSummary } from '@interfaces/post'

import HeroIntro from './hero-intro'
import Container from '@components/container'
import SectionSeparator from './section-separator/light'
import FeaturedSubtitle from './featured-subtitle'
import SliderPreview from './slider-preview'

import Styles from '@styles/HeroHeader.module.css'
import 'keen-slider/keen-slider.min.css'

type Props = {
    posts: PostSummary[]
}

const HeroHeader = ({ posts }: Props) => {
    const [currentSlide, setCurrentSlide] = React.useState(0)
    const [loaded, setLoaded] = useState(false)

    const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>({
        mode: "snap",
        initial: 0,
        slideChanged(slider) {
            setCurrentSlide(slider.track.details.rel)
        },
        created() {
            setLoaded(true)
        },
        slides: {
            origin: "auto",
            perView: 3.5,
            spacing: 18,
        },
        breakpoints: {
            '(max-width: 768px)': {
                initial: 0,
                slides: {
                    origin: "auto",
                    perView: 1.5,
                    spacing: 18,
                },
            },
            '(min-width: 769px)': {
                initial: 0,
                slides: {
                    origin: "auto",
                    perView: 1.5,
                    spacing: 18,
                },
            },
            '(min-width: 1180px)': {
                initial: 0,
                slides: {
                    origin: "auto",
                    perView: 3.5,
                    spacing: 18,
                },
            },

        }
    })

    return (
        <section className={Styles.heroHeader_section}>
            <div className={Styles.heroHeader_wrap}>
                <div className={Styles.heroHeader_content}>
                    <Container>
                        <HeroIntro title={`Hey, I'm ${SITE_NAME}.`} subtitle="I provide some inspiring stories informations." />
                    </Container>
                </div>
            </div>
            <Container>
                <SectionSeparator />
            </Container>
            <div className={Styles.featuredPosts_section}>
                <Container>
                    <div className='global-featured-title'>
                        <FeaturedSubtitle title='Get ready for the' subtitle='best posts reading' />
                        {loaded && instanceRef.current && (
                            <div className='arrow-navigation'>
                                <Arrow
                                    left
                                    onClick={(e: any) =>
                                        e.stopPropagation() || instanceRef.current?.prev()
                                    }
                                    disabled={currentSlide === 0}
                                />

                                <Arrow
                                    onClick={(e: any) =>
                                        e.stopPropagation() || instanceRef.current?.next()
                                    }
                                    disabled={
                                        currentSlide ===
                                        instanceRef.current.track.details.slides.length - 1
                                    }
                                />
                            </div>
                        )}
                    </div>
                </Container>
                <div className={Styles.featuredPosts_padding}>
                    <div ref={sliderRef} className="keen-slider">
                        {posts.map((post, index,) => (
                            <div key={index}>
                                {post.bestStories ?
                                    (
                                        <SliderPreview
                                            title={post.title}
                                            slug={post.slug}
                                            coverImage={post.coverImage}
                                            author={post.author}
                                            tags={post.tags}
                                            excerpt={post.excerpt}
                                        />
                                    ) : null
                                }
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}

export default HeroHeader

function Arrow(props: {
    disabled: boolean
    left?: boolean
    onClick: (e: any) => void
}) {
    const disabeld = props.disabled ? " arrow--disabled" : ""
    return (
        <svg
            onClick={props.onClick}
            className={`arrow ${props.left ? "arrow--left" : "arrow--right"
                } ${disabeld}`}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
        >
            {props.left && (
                <path d="M16.67 0l2.83 2.829-9.339 9.175 9.339 9.167-2.83 2.829-12.17-11.996z" />
            )}
            {!props.left && (
                <path d="M5 3l3.057-3 11.943 12-11.943 12-3.057-3 9-9z" />
            )}
        </svg>
    )
}
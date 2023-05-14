import Styles from "@styles/HeroIntro.module.css"

type Props = {
    title: string,
    subtitle: string
};

const HeroIntro = ({ title, subtitle }: Props) => {
    return (
        <div className='mt-32 mb-20 lg:mt-44 lg:mb-36'>
            <div className='flex flex-col w-full text-left m-0'>
                <span className={`${Styles.title} text-5xl font-extrabold tracking-tighter leading-tight lg:text-9xl lg:leading-snug`}>
                    {title}
                </span>
                <span className='text-5xl font-extralight tracking-tighter leading-tight lg:text-9xl'>
                    {subtitle}
                </span>
            </div>
        </div>
    );
}

export default HeroIntro
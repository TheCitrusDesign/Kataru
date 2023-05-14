type Props = {
    title: string,
    subtitle: string
};

const FeaturedSubtitle = ({ title, subtitle }: Props) => {
    return (
        <div className='flex pb-4'>
            <div className='flex-[1_0_50%] max-w-[800px] text-basic lg:text-lg m-0'>
                {title}
                <span className='font-bold'> {subtitle}</span>
            </div>
        </div>
    );
}

export default FeaturedSubtitle
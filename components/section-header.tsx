type Props = {
    title: string,
    subtitle: string
};

const SectionHeader = ({ title, subtitle }: Props) => {
    return (
        <div className='flex flex-col w-full max-w-[980px] m-auto my-10 text-left items-start'>
            <h2 className='text-4xl font-extralight text-left leading-[1.1] tracking-tighter
                           md:text-7xl
                           lg:text-8xl'>
                {title}
            </h2>

            <p className='text-4xl font-semibold text-left leading-tight tracking-tighter
                          md:text-7xl
                          lg:text-8xl'>
                {subtitle}
            </p>
        </div>
    );
}

export default SectionHeader;
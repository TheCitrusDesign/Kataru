export const globalImage = {
    whileHover: {
        y: -5,
        boxShadow: '0 5px 15px rgba(0, 0, 0, 0.3)',
        transition: {
            duration: 0.25,
        },
    },
}

/** */
export const globalArticle = {
    initial: {
        y: "30%",
        opacity: 0
    },
    animate: {
        y: 0,
        opacity: 1
    },
    exit: {
        y: "30%",
        opacity: 0
    },
}

/** Variants for Modal Search Bar in Header */
export const searchBar = {
    initial: {
        y: "100%",
        opacity: 0,
    },
    animate: {
        y: 0,
        opacity: 1,
    },
    exit: {
        y: "100%",
        opacity: 0,
    },
};

export const overlay = {
    initial: {
        opacity: 0,
        backgroundColor: '',
        backdropFilter: 'blur(0px)',
    },
    animate: {
        opacity: 1,
        backgroundColor: 'rgba(51, 51, 51, .8)',
        backdropFilter: 'blur(9px)',
    },
    exit: {
        opacity: 0,
        backgroundColor: '',
        backdropFilter: 'blur(0px)',
    },
};

export const modalSearch = {
    initial: {
        y: "20%",
        opacity: 0
    },
    animate: {
        y: 0,
        opacity: 1
    },
    exit: {
        y: "20%",
        opacity: 0
    },
}
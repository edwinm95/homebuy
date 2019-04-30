const size = {
    desktop: 1440,
    laptop: 1024,
    tablet: 768,
    mobileL: 425,
    mobileM: 375,
    mobileS: 320
}

export const device = {
    desktop: `(max-width: ${size.desktop}px ) `,
    laptop: `(max-width: ${size.laptop}px )`,
    tablet: `(max-width: ${size.tablet}px )`,
    mobileL: `(max-width: ${size.mobileL}px )`,
    mobileM: `(max-width: ${size.mobileM}px )`,
    mobileS: `(max-width: ${size.mobileS}px )`
}
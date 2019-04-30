export const size = {
    desktop: 1440,
    laptop: 1024,
    tablet: 768,
    mobileL: 425,
    mobileM: 375,
    mobileS: 320
}

export const maxDeviceWidth = {
    desktop: `(max-width: ${size.desktop}px ) `,
    laptop: `(max-width: ${size.laptop}px )`,
    tablet: `(max-width: ${size.tablet}px )`,
    mobileL: `(max-width: ${size.mobileL}px )`,
    mobileM: `(max-width: ${size.mobileM}px )`,
    mobileS: `(max-width: ${size.mobileS}px )`
}
export const minDeviceWidth = {
    desktop: `(min-width: ${size.desktop}px ) `,
    laptop: `(min-width: ${size.laptop}px )`,
    tablet: `(min-width: ${size.tablet}px )`,
    mobileL: `(min-width: ${size.mobileL}px )`,
    mobileM: `(min-width: ${size.mobileM}px )`,
    mobileS: `(min-width: ${size.mobileS}px )`
}
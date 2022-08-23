import autoAnimate from "@formkit/auto-animate";

export const vAutoAnimate = {
    mounted: (el) => autoAnimate(el),
};
export const vAutoFocus = {
    mounted: (el) => el.focus(),
};

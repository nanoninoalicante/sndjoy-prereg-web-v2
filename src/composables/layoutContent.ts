import { computed } from "vue";
const mobileImages = [
    "mobile/1.jpg",
    "mobile/2.jpg",
    "mobile/3.jpg",
    "mobile/4.jpg",
    "mobile/5.jpg"
];
const images = [
    "desktop/1.jpg",
    "desktop/2.jpg",
    "desktop/3.jpg",
    "desktop/4.jpg",
    "desktop/5.jpg"
];
const walkthroughScreens = [
    {
        text: "Be the first to get access",
        imagePosition: "object-center",
        image: images[0],
        mobileImage: mobileImages[0]
    },
    {
        text: "It's like Twitter but for voice",
        imagePosition: "object-left",
        image: images[1],
        mobileImage: mobileImages[1]
    },
    {
        text: "It's like TikTok for Audio",
        imagePosition: "object-left",
        image: images[2],
        mobileImage: mobileImages[2]
    },
    {
        text: "Podcasts, Comedy, Music, Talk shows, Discussions",
        imagePosition: "object-center",
        image: images[3],
        mobileImage: mobileImages[3]
    },
    {
        text: "Message your friends with voice only",
        imagePosition: "object-right",
        image: images[4],
        mobileImage: mobileImages[4]
    }
];

const filteredWalkthroughScreens = computed(() => {
    return walkthroughScreens;
});

export function useLayoutContent() {
    return { filteredWalkthroughScreens, walkthroughScreens, images };
}

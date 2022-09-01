import { computed } from "vue";
import { loremIpsum } from "lorem-ipsum";
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
const walkthroughScreens = () => {
    const screens = [
        {
            text: "Network of personal shoppers to curate the perfect gift"
        },
        {
            text: "Make someone’s day with a gift just for them"
        },
        {
            text: "Schedule ahead or order a last-minute gift for any occasion"
        },
        {
            text: "Surprise your friends and family"
        },
        {
            text: "Uplift their day with a personalized gift, delivered with care"
        }
    ]
    return screens.map((screen, index) => {
        return {
            ...screen,
            imagePosition: "object-center",
            image: images[index],
            mobileImage: mobileImages[index]
        }
    })
};

const filteredWalkthroughScreens = computed(() => {
    return walkthroughScreens();
});

export function useLayoutContent() {
    return { filteredWalkthroughScreens, walkthroughScreens, images };
}

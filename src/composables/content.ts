const content = {
    labels: {
        chooseYourNewHandleLabel: {
            en: "Choose Your New Handle",
        },
    },
};
const getContent = (type, item, lang) => {
    return content[type]?.[item]?.[lang || "en"];
};
export function useContent() {
    return { getContent };
}

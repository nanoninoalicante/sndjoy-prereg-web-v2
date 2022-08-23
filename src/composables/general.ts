const inputClasses =
    "mb-6 w-full rounded-xl border-2 border-teal-500 py-5 px-12 text-xl focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-opacity-50";
const buttonClasses = "bg-teal-800 rounded-xl";
const getRandomInt = (min: number, max: number) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); 
  }
export function useGeneral() {
    return { inputClasses, buttonClasses, getRandomInt };
}

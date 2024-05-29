export const isVowel = (char: string): boolean => "aeiouAEIOU".includes(char);

export const getAmountOfVowels = (value: string): number => {
    return Array.from(value).reduce(
        (count, char) => (isVowel(char) ? count + 1 : count),
        0
    );
};
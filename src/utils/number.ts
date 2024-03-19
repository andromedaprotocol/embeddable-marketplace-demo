export const formatNumber = (num: number) => {
    const suffixes = ["", "K", "M", "B", "T", "Q"];

    // If the number is less than 1000, no need to abbreviate
    if (num < 1000) {
        return num.toString();
    }

    // Calculate the appropriate suffix index
    const suffixIndex = Math.min(Math.floor(Math.log10(num) / 3), 5);

    // Calculate the abbreviated value
    const shortValue = num / Math.pow(10, suffixIndex * 3);

    // Format the result with one decimal place
    const formattedValue = shortValue.toFixed(1);

    // Combine the formatted value with the suffix
    return `${formattedValue}${suffixes[suffixIndex]}`;
}

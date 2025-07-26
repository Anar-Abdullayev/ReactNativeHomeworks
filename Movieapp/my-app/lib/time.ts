export function formatToShortTime(minutes: number) {
    let hours = Math.floor(minutes / 60);
    let minute = minutes % 60;

    return `${hours}h ${minute}m`
}
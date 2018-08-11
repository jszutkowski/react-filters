export default class Randomizer {
    public static getRandomNamePrefix(length: number = 10): string {
        return Math.random().toString(36).substr(2, length)
    }
}
import {solution} from "../solutions"

export class day01 implements solution
{
    public part_a(input: string) : string
    {
        const [left, right] = day01.parse(input);
        
        left.sort();
        right.sort();
        const totalDistances = Array(left.length).fill(0).map((_, i) => i).reduce((total, i) => total + Math.abs(left[i] - right[i]), 0);
        
        return `${totalDistances}`;
    }
    
    public part_b(input: string)
    {
        const [left, right] = day01.parse(input);

        const counts = right.reduce((counts, r) => counts.set(r, (counts.get(r) ?? 0) + 1), new Map<number, number>())
        const similarityScore = left.reduce((score, l) => score + (l * (counts.get(l) ?? 0)), 0);

        return `${similarityScore}`;
    }

    static parse(input: string)
    {
        return input.split(/\r?\n/)
            .map(line => line.split(/(\s+)/).filter(s => s.trim().length > 0).map(s => Number.parseInt(s)))
            .reduce<number[][]>(([left, right], current) => [[...left, current[0]], [...right, current[1]]], [[], []])
    }
}
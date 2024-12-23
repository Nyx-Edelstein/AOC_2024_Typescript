import {solution} from "../solutions"

export class day03 implements solution
{
    public async part_a(input: string)
    {
        return Array.from(input.matchAll(/mul\((\d+),(\d+)\)/g))
            .map(match => Number.parseInt(match[1]) * Number.parseInt(match[2]))
            .reduce((total, current) => total + current);
    }
    
    public async part_b(input: string)
    {
        let mul = true;
        let sum = 0;
        Array.from(input.matchAll(/do\(\)|don't\(\)|mul\((\d+),(\d+)\)/g)).forEach(match =>
        {
            if (match[0] == "do()") mul = true;
            else if (match[0] == "don't()") mul = false;
            else if (mul) sum += Number.parseInt(match[1]) * Number.parseInt(match[2]);
        });
        return sum;
    }
}
import {solution} from "../solutions"

export class day11 implements solution
{
    public async part_a(input: string)
    {
        const rocks = parse(input);
        const numRocks = blink(rocks, 25);
        return numRocks;
    }
    
    public async part_b(input: string)
    {
        const rocks = parse(input);
        const numRocks = blink(rocks, 75);
        return numRocks;
    }
}

function parse(input: string)
{
    return input.split(" ");
}

function blink(rocks: string[], numBlinks: number)
{
    let rockCounts = new Map<string, number>();
    for (const rock of rocks)
        rockCounts.set(rock, (rockCounts.get(rock) ?? 0) + 1);

    for (let i = 0; i < numBlinks; i++)
    {
        const nextRockCounts = new Map<string, number>();
        for (const rock of Array.from(rockCounts.keys()))
        {
            const numRocks = rockCounts.get(rock)!;
            if (numRocks == 0) continue;
            rockCounts.set(rock, 0);
    
            if (rock == "0")
            {
                nextRockCounts.set("1", (nextRockCounts.get("1") ?? 0) + numRocks);
            }
            else if (rock.length % 2 == 0)
            {
                const chars = rock.split("");
                let left = `${Number.parseInt((chars.slice(0, rock.length/2)).join(""))}`;
                let right = `${Number.parseInt((chars.slice(rock.length/2)).join(""))}`;
                nextRockCounts.set(left, (nextRockCounts.get(left) ?? 0) + numRocks);
                nextRockCounts.set(right, (nextRockCounts.get(right) ?? 0) + numRocks);
            }
            else
            {
                const next = `${Number.parseInt(rock)*2024}`;
                nextRockCounts.set(next, (nextRockCounts.get(next) ?? 0) + numRocks);
            }
        }
        rockCounts = nextRockCounts;
    }

    return Array.from(rockCounts.values()).reduce((total, current) => total + current);
}
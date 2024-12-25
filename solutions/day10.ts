import {solution} from "../solutions"
import { AnySet } from "../shared/AnySet";

export class day10 implements solution
{
    public async part_a(input: string)
    {
        const {grid, trailheads} = parse(input);
        const trailheadScore = trailheads.reduce((total, trailhead) => total + getScore(grid, trailhead), 0);
        return trailheadScore;
    }
    
    public async part_b(input: string)
    {
        const {grid, trailheads} = parse(input);
        const trailheadScore = trailheads.reduce((total, trailhead) => total + getScore(grid, trailhead, false), 0);
        return trailheadScore;
    }
}

type coord =
{
    row: number,
    col: number
}

function parse(input: string)
{
    const grid = input.split(/\r?\n/).map(line => line.split("").map(d => Number.parseInt(d)));
    const trailheads = grid.flatMap((row, r) => row.map((height, c) => ({height, r, c})))
        .filter(x => x.height === 0)
        .map(x => ({row: x.r, col: x.c}) as coord);

    return {grid, trailheads};
}

function getScore(grid: number[][], trailhead: coord, trackVisited: boolean = true)
{
    function getGridVal(coord: coord)
    {
        return (grid[coord.row] ?? [])[coord.col];
    }

    let score = 0;
    const visited = new AnySet<coord>(coord => `${coord.row},${coord.col}`);
    const toVisit: coord[] = [trailhead];
    do
    {
        const current = toVisit.pop()!;

        if (trackVisited)
        {
            if (visited.has(current)) continue;
            visited.add(current);
        }

        const currentVal = getGridVal(current);
        if (currentVal == 9)
        {
            score += 1;
            continue;
        }

        const adjacent =
        [
            { row: current.row, col: current.col-1 },
            { row: current.row-1, col: current.col },
            { row: current.row, col: current.col+1 },
            { row: current.row+1, col: current.col }
        ];
        for (const next of adjacent)
        {
            const nextVal = getGridVal(next);
            if (nextVal == currentVal+1 && (!trackVisited || !visited.has(next))) toVisit.push(next);
        }
    } while (toVisit.length > 0)

    return score;
}
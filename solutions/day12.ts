import {solution} from "../solutions"
import { AnySet } from "../shared/AnySet";

export class day12 implements solution
{
    public async part_a(input: string)
    {
        const grid = parse(input);
        const coords = grid.flatMap((row, r) => row.map((_, c) => ({row: r, col: c}) as coord));
        
        let price = 0;
        const visited = new AnySet<coord>(coord => `${coord.row},${coord.col}`);
        for (const coord of coords)
        {
            if (visited.has(coord)) continue;

            let area = 0;
            let perimeter = 0;
            const toVisit = [coord];
            while (toVisit.length > 0)
            {
                const current = toVisit.pop()!;
                if (visited.has(current)) continue;
                visited.add(current);
                area += 1;

                const next =
                [
                    {row: current.row, col: current.col-1},
                    {row: current.row-1, col: current.col},
                    {row: current.row, col: current.col+1},
                    {row: current.row+1, col: current.col},
                ];
                for (const adj of next)
                {
                    const current_val = get(grid, current);
                    const adj_val = get(grid, adj);
                    if (current_val === adj_val)
                        toVisit.push(adj);
                    else
                        perimeter += 1;
                }
            }

            price += (area * perimeter);
        }

        return price;
    }
    
    public async part_b(input: string)
    {
        const grid = parse(input);
        const coords = grid.flatMap((row, r) => row.map((_, c) => ({row: r, col: c}) as coord));
        
        //Group points into regions
        let regions = [];
        const visited = new AnySet<coord>(coord => `${coord.row},${coord.col}`);
        for (const coord of coords)
        {
            if (visited.has(coord)) continue;

            let region = [];
            const toVisit = [coord];
            while (toVisit.length > 0)
            {
                const current = toVisit.pop()!;
                if (visited.has(current)) continue;
                visited.add(current);
                region.push(current);

                const next =
                [
                    {row: current.row, col: current.col-1},
                    {row: current.row-1, col: current.col},
                    {row: current.row, col: current.col+1},
                    {row: current.row+1, col: current.col},
                ];
                for (const adj of next)
                {
                    const current_val = get(grid, current);
                    const adj_val = get(grid, adj);
                    if (current_val === adj_val)
                        toVisit.push(adj);
                }
            }

            region.sort((a, b) =>
            {
                if (a.row < b.row) return -1;
                else if (b.row < a.row) return 1;
                else if (a.col < b.col) return -1;
                else if (b.col < a.col) return 1;
                return 0;
            });
            regions.push(region);
        }

        //Figure out price
        let price = 0;
        for (const region of regions)
        {
            //Find perimeter points for the region
            const perimeterPointsSet = new AnySet<vector>(x => `${x.point.row},${x.point.col}:${x.dir}`);
            for (const point of region)
            {
                const adj = getAdj(grid, point);
                if (adj.up.val != adj.current.val)
                    perimeterPointsSet.add({point, dir: Direction.up});
                if (adj.right.val != adj.current.val)
                    perimeterPointsSet.add({point, dir: Direction.right});
                if (adj.down.val != adj.current.val)
                    perimeterPointsSet.add({point, dir: Direction.down});
                if (adj.left.val != adj.current.val)
                    perimeterPointsSet.add({point, dir: Direction.left});
            }

            //Algorithm: take a point out of the perimeter set, increment number of sides, remove all connected points for the same side
            //Continue until no points remain
            let sides = 0;
            let perimeterPoints = perimeterPointsSet.getElements();
            while (perimeterPoints.length > 0)
            {
                sides += 1;
                const current = perimeterPoints.shift()!;
                const toRemove : vector[] = [];

                if (current.dir == Direction.up || current.dir == Direction.down)
                {
                    const related = perimeterPoints.filter(p => p.dir == current.dir && p.point.row == current.point.row);

                    //Remove perimeter points to the right
                    let i = current.point.col+1;
                    let next;
                    while (next = related.find(p => p.point.col == i))
                    {
                        toRemove.push(next);
                        i += 1;
                    }

                    //Remove perimeter points to the left
                    i = current.point.col-1;
                    while (next = related.find(p => p.point.col == i))
                    {
                        toRemove.push(next)
                        i += 1;
                    }
                }
                else // (current.dir == Direction.right || current.dir == Direction.left)
                {
                    const related = perimeterPoints.filter(p => p.dir == current.dir && p.point.col == current.point.col);

                    //Remove perimeter points above
                    let i = current.point.row-1;
                    let next;
                    while (next = related.find(p => p.point.row == i))
                    {
                        toRemove.push(next);
                        i -= 1;
                    }

                    //Remove perimeter points below
                    i = current.point.row+1;
                    while (next = related.find(p => p.point.row == i))
                    {
                        toRemove.push(next)
                        i += 1;
                    }
                }

                perimeterPoints = perimeterPoints.filter(p => !toRemove.includes(p));
            }
            
            price += region.length * sides;
        }

        return price;
    }
}

type coord =
{
    row: number,
    col: number
}

enum Direction
{
    left = "left",
    up = "up",
    right = "right",
    down = "down",    
}

type vector =
{
    point: coord,
    dir: Direction
}

function parse(input: string)
{
    return input.split(/\r?\n/).map(line => line.split(""));
}

function get(grid: string[][], coord: coord)
{
    return (grid[coord.row] ?? [])[coord.col];
}

function getAdj(grid: string[][], coord: coord)
{
    const p_up = {row: coord.row-1, col: coord.col};
    const p_right = {row: coord.row, col: coord.col+1};
    const p_down = {row: coord.row+1, col: coord.col};
    const p_left = {row: coord.row, col: coord.col-1};

    const current = {point: coord, val: get(grid, coord), dir: null};
    const up = {point: p_up, val: get(grid, p_up), dir: Direction.up};
    const right = {point: p_right, val: get(grid, p_right), dir: Direction.right};
    const down = {point: p_down, val: get(grid, p_down), dir: Direction.down};
    const left = {point: p_left, val: get(grid, p_left), dir: Direction.left};

    return {current, up, right, down, left};
}
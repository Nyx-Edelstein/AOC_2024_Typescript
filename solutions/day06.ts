import {solution} from "../solutions"
import { AnySet } from "../shared/AnySet";

type coord =
{
    row: number,
    col: number,
}

type vector = coord &
{
    dir: Direction;
}

export class day06 implements solution
{
    public async part_a(input: string)
    {
        const {map, coordinates, guardPos} = parse(input);
        const {visited, cycle} = simulate(map, guardPos);
        return visited.size();
    }
    
    public async part_b(input: string)
    {
        const {map, coordinates, guardPos} = parse(input);
        const {visited, cycle} = simulate(map, guardPos);
        const potentialObstacleCoords = visited.getElements();

        let obstacles = 0;
        potentialObstacleCoords.filter(coord => map[coord.row][coord.col] === ".").forEach(coord =>
        {
            map[coord.row][coord.col] = '#';
            const {visited, cycle} = simulate(map, guardPos);
            if (cycle) obstacles += 1;
            map[coord.row][coord.col] = '.';
        });

        return obstacles;
    }
}

enum Direction
{
    Up,
    Right,
    Down,
    Left
}

function parse(input: string)
{
    const map = input.split(/\r?\n/).map(line => line.split(""))
    const coordinates = map.flatMap((row, r) => row.map<coord>((_, c) => ({row: r, col: c})));
    const guardPos = coordinates.find(coord => map[coord.row][coord.col] === "^")!;
    map[guardPos.row][guardPos.col] = ".";
    return {map, coordinates, guardPos};
}

function simulate(map: string[][], guardPos: coord)
{
    let dir = Direction.Up;
    let cycle = false;
    const visited = new AnySet<coord>(coord => `${coord.col},${coord.row}`);
    const states = new AnySet<vector>(vector => `${vector.col},${vector.row}:${vector.dir}`);
    while (map[guardPos.row][guardPos.col])
    {
        const state = {...guardPos, dir};
        if (states.has(state))
        {
            cycle = true;
            break;
        }
        states.add(state);

        visited.add(guardPos);

        let nextPos = dir === Direction.Up ? { row: guardPos.row-1, col: guardPos.col }
            : dir === Direction.Right ? { row: guardPos.row, col: guardPos.col+1 }
            : dir === Direction.Down ? { row: guardPos.row+1, col: guardPos.col }
            : /*dir === Direction.Left ?*/ { row: guardPos.row, col: guardPos.col-1 };

        const nextCell = (map[nextPos.row]??[])[nextPos.col];
        if (nextCell === undefined) break;
        else if (nextCell === "#")
        {
            dir = dir === Direction.Up ? Direction.Right
                : dir === Direction.Right ? Direction.Down
                : dir === Direction.Down ? Direction.Left
                : /*dir === Direction.Left ?*/ Direction.Up;
        }
        else if (nextCell === ".")
        {
            guardPos = nextPos;
        }
    }

    return {visited, cycle}
}
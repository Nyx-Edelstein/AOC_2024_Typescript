import { solution } from "../solutions"

export class day08 implements solution
{
    public async part_a(input: string)
    {
        const {rows, cols, nodeMap} = parse(input);

        const antinodeLocations = new Set<string>();
        for (const nodeType of Array.from(nodeMap.keys()))
        {
            const nodeList = nodeMap.get(nodeType)!;

            //For each pair of nodes of the same type, compute antinodes
            for (const i of nodeList.map((_, i) => i))
            {
                for (const j of nodeList.map((_, j) => j))
                {
                    if (i == j) continue;

                    const nodeA = nodeList[i];
                    const nodeB = nodeList[j];

                    const antinode_a_b = {
                        row: nodeB.row + nodeB.row - nodeA.row,
                        col: 2*nodeB.col - nodeA.col,
                    }
                    if (antinode_a_b.row >= 0 && antinode_a_b.row < rows && antinode_a_b.col >= 0 && antinode_a_b.col < cols)
                    {
                        antinodeLocations.add(`${antinode_a_b.row},${antinode_a_b.col}`);
                    }

                    const antinode_b_a = {
                        row: 2*nodeA.row - nodeB.row,
                        col: 2*nodeA.col - nodeB.col,
                    }
                    if (antinode_b_a.row >= 0 && antinode_b_a.row < rows && antinode_b_a.col >= 0 && antinode_b_a.col < cols)
                    {
                        antinodeLocations.add(`${antinode_b_a.row},${antinode_b_a.col}`);
                    }    
                }
            }
        }
        
        return antinodeLocations.size;
    }
    
    public async part_b(input: string)
    {
        const {rows, cols, nodeMap} = parse(input);

        const antinodeLocations = new Set<string>();
        for (const nodeType of Array.from(nodeMap.keys()))
        {
            const nodeList = nodeMap.get(nodeType)!;

            //For each pair of nodes of the same type, compute antinodes
            for (const i of nodeList.map((_, i) => i))
            {
                for (const j of nodeList.map((_, j) => j))
                {
                    if (i >= j) continue;

                    const nodeA = nodeList[i];
                    const nodeB = nodeList[j];

                    let deltaRow = nodeB.row - nodeA.row;
                    let deltaCol = nodeB.col - nodeA.col;                    
                    let antinode_a_b = { row: nodeB.row, col: nodeB.col };
                    do
                    {
                        antinodeLocations.add(`${antinode_a_b.row},${antinode_a_b.col}`);
                        antinode_a_b.row += deltaRow;
                        antinode_a_b.col += deltaCol;
                    } while (antinode_a_b.row >= 0 && antinode_a_b.row < rows && antinode_a_b.col >= 0 && antinode_a_b.col < cols)

                    deltaRow = nodeA.row - nodeB.row;
                    deltaCol = nodeA.col - nodeB.col;
                    let antinode_b_a = { row: nodeA.row, col: nodeA.col };
                    do
                    {
                        antinodeLocations.add(`${antinode_b_a.row},${antinode_b_a.col}`);
                        antinode_b_a.row += deltaRow;
                        antinode_b_a.col += deltaCol;
                    } while (antinode_b_a.row >= 0 && antinode_b_a.row < rows && antinode_b_a.col >= 0 && antinode_b_a.col < cols)   
                }
            }
        }
        
        return antinodeLocations.size;
    }
}

type coord =
{
    row: number,
    col: number
}

function parse(input: string)
{
    const lines = input.split(/\r?\n/);
    const rows = lines.length;
    const cols = lines[0].length;

    const nodeMap = lines.flatMap((line, row) => line.split("").map((nodeType, col) => ({nodeType, row, col})))
        .filter(node => node.nodeType !== ".")
        .reduce((map, {nodeType, row, col}) => map.set(nodeType, [...(map.get(nodeType) ?? []), {row, col}]), new Map<string, coord[]>());

    return {rows, cols, nodeMap};
}
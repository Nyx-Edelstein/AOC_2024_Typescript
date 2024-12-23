import {solution} from "../solutions"

export class day04 implements solution
{
    public async part_a(input: string)
    {
        const search = input.split(/\r?\n/).map(line => line.split(""));
        const indexes = search.flatMap((_, row) => search[row].map((_, col) => [row, col]));
        const matches = this.findMatches_A(search, indexes);
        return matches;
    }
    
    public async part_b(input: string)
    {
        const search = input.split(/\r?\n/).map(line => line.split(""));
        const indexes = search.flatMap((_, row) => search[row].map((_, col) => [row, col]));
        const matches = this.findMatches_B(search, indexes);
        return matches;
    }

    findMatches_A(search: string[][], indexes: number[][])
    {
        const offsets =
        [
            [[0,0],[0,-1],[0,-2],[0,-3]],
            [[0,0],[-1,-1],[-2,-2],[-3,-3]],
            [[0,0],[-1,0],[-2,0],[-3,0]],
            [[0,0],[-1,1],[-2,2],[-3,3]],
            [[0,0],[0,1],[0,2],[0,3]],
            [[0,0],[1,1],[2,2],[3,3]],
            [[0,0],[1,0],[2,0],[3,0]],
            [[0,0],[1,-1],[2,-2],[3,-3]],
        ]       

        let matches = 0;
        for (const [r,c] of indexes)
        {
            for (const [[_,__],[r1,c1],[r2,c2],[r3,c3]] of offsets)
            {
                const testStr = `${get(search,r,c)}${get(search,r+r1,c+c1)}${get(search,r+r2,c+c2)}${get(search,r+r3,c+c3)}`;
                if (testStr === "XMAS") matches += 1;
            }
        }
        return matches;
    }

    findMatches_B(search: string[][], indexes: number[][])
    {
        let matches = 0;
        for (const [r,c] of indexes)
        {
            const left = `${get(search,r-1,c-1)}${get(search,r,c)}${get(search,r+1,c+1)}`;
            const right = `${get(search,r+1,c-1)}${get(search,r,c)}${get(search,r-1,c+1)}`;
            if ((left === "MAS" || left === "SAM") && (right === "MAS" || right === "SAM")) matches += 1;
        }
        return matches;
    }
}

const get = (s : string[][], r: number, c: number) => (s[r] ?? [])[c] ?? "";
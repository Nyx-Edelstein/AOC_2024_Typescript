import { solution } from "../solutions"

export class day05 implements solution
{
    public async part_a(input: string)
    {
        const {rules, updates} = parse(input);

        let middleSum = 0;
        updates.forEach(update =>
        {
            if (isUpdateValid(update, rules)) middleSum += update[~~(update.length/2)];
        })
        
        return middleSum;
    }
    
    public async part_b(input: string)
    {
        const {rules, updates} = parse(input);
        const rulesMap = rules.reduce((map, [before, after]) => map.set(before, [...(map.get(before) ?? []), after]), new Map<number, number[]>())

        let middleSum = 0;
        updates.forEach(update =>
        {
            const updateValid = isUpdateValid(update, rules);
            if (updateValid) return;

            update.sort((a, b) =>
            {
                const after_a = rulesMap.get(a);
                const after_b = rulesMap.get(b);

                if (after_a?.includes(b)) return -1;
                else if (after_b?.includes(a)) return 1;
                else return 0;
            });
            middleSum += update[~~(update.length/2)];
        })
        
        return middleSum;
    }
}

function parse(input: string)
{
    const [first, second] = input.split(/\r?\n\r?\n/);
    const rules = first.split(/\r?\n/).map(s => s.split("|").map(r => Number.parseInt(r)));
    const updates = second.split(/\r?\n/).map(update => update.split(",").map(u => Number.parseInt(u)));
    return {rules, updates};
}

function isUpdateValid(update: number[], rules: number[][])
{
    let max = 0;
    const positions = new Map<number, number>();
    update.forEach((page, i) =>
    {
        if (page >= max) max = page + 1;
        positions.set(page, i);
    });

    return rules.every(rule =>
    {
        const before = positions.get(rule[0]);
        const after = positions.get(rule[1]);
        return before === undefined || after === undefined || before < after;
    });
}
import {solution} from "../solutions"

export class day07 implements solution
{
    public async part_a(input: string)
    {
        const equations = parse(input);
        const solvableEquations = equations.filter(equation => isSolvable(equation));
        const solvableSum = solvableEquations.reduce((sum, {testVal, operands}) => sum + testVal, 0)
        return solvableSum;
    }
    
    public async part_b(input: string)
    {
        const equations = parse(input);
        const solvableEquations = equations.filter(equation => isSolvable(equation, true));
        const solvableSum = solvableEquations.reduce((sum, {testVal, operands}) => sum + testVal, 0)
        return solvableSum;
    }
}

type Equation =
{
    testVal: number,
    operands: number[]
}

function parse(input: string): Equation[]
{
    return input.split(/\r?\n/).map(line =>
    {
        const parts = line.split(": ");
        return {
            testVal: Number.parseInt(parts[0]),
            operands: parts[1].split(" ").map(n => Number.parseInt(n))
        }
    });
}

function isSolvable(equation: Equation, allowConcat: boolean = false): boolean
{
    //Base cases
    if (equation.operands.length === 0) return false;
    if (equation.operands.length === 1) return equation.testVal == equation.operands[0];

    //Treat operands like a stack (/queue?)
    //Take top two operands and either add or multiply them, and put the remainder back on the stack
    const a = equation.operands.shift()!;
    const b = equation.operands.shift()!;
    const equationWithSum = {
        testVal: equation.testVal,
        operands: [a+b, ...equation.operands]
    };
    const equationWithProduct = {
        testVal: equation.testVal,
        operands: [a*b, ...equation.operands]
    };
    const equationWithConcat = allowConcat ? {
        testVal: equation.testVal,
        operands: [Number.parseInt(`${a}${b}`), ...equation.operands]
    } : undefined;

    return isSolvable(equationWithSum, allowConcat)
        || isSolvable(equationWithProduct, allowConcat)
        || (equationWithConcat !== undefined && isSolvable(equationWithConcat, allowConcat));
}
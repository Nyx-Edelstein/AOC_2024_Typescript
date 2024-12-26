import * as fs from "fs";
import { solutions } from "./solutions";

enum Part
{
    a = "A",
    b = "B"
}

enum RunType
{
    test,
    solve
}

async function solve(day: string, part: Part, runType: RunType)
{
    const input = get_input(day, runType);
    const solution = solutions[day];

    const runTypeStr = runType == RunType.test ? "(--TEST--)" : "[--SOLVE--]";
    console.log(`\n${runTypeStr} ${day}, part ${part}:\n`);
    console.log("----------------------------------------");

    const start = timer();
    const result = part == Part.a
        ? await solution.part_a(input)
        : await solution.part_b(input);
    const stop = timer();
    console.log(`${result}`);

    console.log("----------------------------------------");
    console.log(`\n${stop-start} ms\n`);
}

function timer()
{
    return new Date().getTime();
}

function get_input(day: string, runType: RunType) : string
{
    const dir = runType == RunType.test ? "./input_test/" : "./input/";
    const file = `${dir}${day}.txt`;
    console.log(`read file: ${file}`);
    return fs.readFileSync(file, "utf-8");
}

solve("day11", Part.b, RunType.solve);
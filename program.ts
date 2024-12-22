import * as fs from "fs";
import { solutions } from "./solutions";

enum Part
{
    A = "A",
    B = "B"
}

enum RunType
{
    Test,
    Solve
}

function solve(day: string, part: Part, runType: RunType)
{
    const input = get_input(day, runType);
    const solution = solutions[day];

    const runTypeStr = runType == RunType.Test ? "(--TEST--)" : "[--SOLVE--]";
    console.log(`\n${runTypeStr} ${day}, part ${part}:\n`);
    console.log("-------------------------");

    const start = timer();
    const result = part == Part.A
        ? solution.part_a(input)
        : solution.part_b(input);
    const stop = timer();
    console.log(`${result}`);

    console.log("-------------------------");
    console.log(`\n${stop-start} ms\n`);
}

function timer()
{
    const timeStart = new Date().getTime();
    const ms = (new Date().getTime() - timeStart);
    return ms;
}

function get_input(day: string, runType: RunType) : string
{
    const dir = runType == RunType.Test ? "./input_test/" : "./input/";
    const file = `${dir}${day}.txt`;
    console.log(`read file: ${file}`);
    return fs.readFileSync(file, "utf-8");
}

solve("day01", Part.A, RunType.Test);
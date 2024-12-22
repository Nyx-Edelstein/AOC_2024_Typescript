"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs");
var solutions_1 = require("./solutions");
var Part;
(function (Part) {
    Part["A"] = "A";
    Part["B"] = "B";
})(Part || (Part = {}));
var RunType;
(function (RunType) {
    RunType[RunType["Test"] = 0] = "Test";
    RunType[RunType["Solve"] = 1] = "Solve";
})(RunType || (RunType = {}));
function solve(day, part, runType) {
    var input = get_input(day, runType);
    var solution = solutions_1.solutions[day];
    var runTypeStr = runType == RunType.Test ? "(--TEST--)" : "[--SOLVE--]";
    console.log("\n".concat(runTypeStr, " ").concat(day, ", part ").concat(part, ":\n"));
    console.log("-------------------------");
    var start = timer();
    var result = part == Part.A
        ? solution.part_a(input)
        : solution.part_b(input);
    var stop = timer();
    console.log("".concat(result));
    console.log("-------------------------");
    console.log("\n".concat(stop - start, " ms\n"));
}
function timer() {
    var timeStart = new Date().getTime();
    var ms = (new Date().getTime() - timeStart);
    return ms;
}
function get_input(day, runType) {
    var dir = runType == RunType.Test ? "./input_test/" : "./input/";
    var file = "".concat(dir).concat(day, ".txt");
    console.log("read file: ".concat(file));
    return fs.readFileSync(file, "utf-8");
}
solve("day01", Part.A, RunType.Test);

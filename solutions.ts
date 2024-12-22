import { day01 } from "./solutions/day01";
import { day02 } from "./solutions/day02";
import { day03 } from "./solutions/day03";
import { day04 } from "./solutions/day04";
import { day05 } from "./solutions/day05";
import { day06 } from "./solutions/day06";
import { day07 } from "./solutions/day07";
import { day08 } from "./solutions/day08";
import { day09 } from "./solutions/day09";
import { day10 } from "./solutions/day10";
import { day11 } from "./solutions/day11";
import { day12 } from "./solutions/day12";
import { day13 } from "./solutions/day13";
import { day14 } from "./solutions/day14";
import { day15 } from "./solutions/day15";
import { day16 } from "./solutions/day16";
import { day17 } from "./solutions/day17";
import { day18 } from "./solutions/day18";
import { day19 } from "./solutions/day19";
import { day20 } from "./solutions/day20";
import { day21 } from "./solutions/day21";
import { day22 } from "./solutions/day22";
import { day23 } from "./solutions/day23";
import { day24 } from "./solutions/day24";
import { day25 } from "./solutions/day25";

export interface solution
{
    part_a(input: string): string;
    part_b(input: string): string;
}

export const solutions: {[day: string]: solution} =
{
    "day01": new day01(),
    "day02": new day02(),
    "day03": new day03(),
    "day04": new day04(),
    "day05": new day05(),
    "day06": new day06(),
    "day07": new day07(),
    "day08": new day08(),
    "day09": new day09(),
    "day10": new day10(),
    "day11": new day11(),
    "day12": new day12(),
    "day13": new day13(),
    "day14": new day14(),
    "day15": new day15(),
    "day16": new day16(),
    "day17": new day17(),
    "day18": new day18(),
    "day19": new day19(),
    "day20": new day20(),
    "day21": new day21(),
    "day22": new day22(),
    "day23": new day23(),
    "day24": new day24(),
    "day25": new day25(),
}
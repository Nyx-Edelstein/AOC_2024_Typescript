import { day01 } from "./solutions/day01";

export interface solution
{
    part_a(input: string): string;
    part_b(input: string): string;
}

export const solutions: {[day: string]: solution} =
{
    "day01": new day01()
}
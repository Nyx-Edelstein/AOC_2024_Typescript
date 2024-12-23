import {solution} from "../solutions"
const readline = require('readline-sync');

export class day02 implements solution
{
    public async part_a(input: string)
    {
        const reports = this.parse(input);
        const safeLevels = reports.reduce((total, report) => total + this.isSafe_a(report), 0);
        return safeLevels;
    }
    
    public async part_b(input: string)
    {
        const reports = this.parse(input);
        const safeLevels = reports.reduce((total, report) => total + this.isSafe_b(report), 0);
        return safeLevels;
    }

    parse(input: string)
    {
        return input.split(/\r?\n/).map(line => line.split(/(\s+)/).filter(s => s.trim().length > 0).map(s => Number.parseInt(s)));
    }

    isSafe_a(report: number[]) : number
    {
        const diffs = report.slice(0, -1).map((_, i) => report[i+1]-report[i]);
        return diffs.every(x => x >= -3 && x < 0) || diffs.every(x => x > 0 && x <= 3) ? 1 : 0;
    }

    isSafe_b(report: number[]) : number
    {
        return this.isSafe_a(report) ? 1
            : report.find((_, i) => this.isSafe_a([...report.slice(0, i), ...report.slice(i+1)])) ? 1
            : 0;
    }
}
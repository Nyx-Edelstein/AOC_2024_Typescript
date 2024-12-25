export class AnySet<T>
{
    private set = new Set<string>();
    private elements: T[] = [];

    constructor(private mapFunc: (item: T) => string)
    { }

    public has(item: T) : boolean
    {
        const mappedVal = this.mapFunc(item);
        return this.set.has(mappedVal);
    }

    public add(item: T): boolean
    {
        const mappedVal = this.mapFunc(item);
        if (this.set.has(mappedVal)) return false;

        this.set.add(mappedVal);
        this.elements.push(item);
        return true;
    }

    public size(): number
    {
        return this.elements.length;
    }

    public getElements(): T[]
    {
        return [...this.elements];
    }
}
import {solution} from "../solutions"

export class day09 implements solution
{
    public async part_a(input: string)
    {
        const disk = parse(input);

        let insertionPointer = 0;
        let readPointer = disk.length-1;
        while (insertionPointer < readPointer)
        {
            if (disk[insertionPointer] == null)
            {
                while (disk[readPointer] == null) readPointer -= 1;

                disk[insertionPointer] = disk[readPointer];
                disk[readPointer] = null;
                readPointer -= 1;
            }

            insertionPointer += 1;
        }

        const checksum = disk.filter(x => x !== null).map((fileId, i) => fileId * i).reduce((total, curr) => total + curr);
        return checksum;
    }
    
    public async part_b(input: string)
    {
        const disk = parse(input);

        const fileInfo = getFileInfo(disk);
        while (fileInfo.length > 0)
        {
            const nextFile = fileInfo.pop()!;

            //Find the first empty partition big enough to fit the file
            let i = 0;
            let size = 0;
            let insertionPointer = 0;
            while (size < nextFile.size && i < disk.length)
            {
                //Skip to next empty partition
                while (disk[i] != null && i < disk.length) i += 1;
                insertionPointer = i;

                //Find size of partition
                size = 0;
                while (disk[i] == null && i < disk.length)
                {
                    size += 1;
                    i += 1;
                }
            }

            //If no partition was found, move on to next file
            if (insertionPointer >= nextFile.location) continue;
            
            //Write the file to the empty space
            for (let n = 0; n < nextFile!.size; n++)
            {
                disk[insertionPointer + n] = disk[nextFile.location + n];
                disk[nextFile.location + n] = null;
            }
        }

        const checksum = disk.map((fileId, i) => (fileId ?? 0) * i).reduce((total, curr) => total + curr);
        return checksum;
    }
}

function parse(input: string) : Array<number | null>
{
    const partitions = input.split("").map(n => Number.parseInt(n))
    const size = partitions.reduce((total, curr) => total + curr);
    const disk : number[] = Array(size).fill(null);

    let fileId = 0;
    let isFile = true;
    let filePointer = 0;
    partitions.forEach(partition =>
    {
        for (let i = 0; i < partition; i++)
        {
            if (isFile) disk[filePointer] = fileId;
            filePointer += 1;
        }
        isFile = !isFile;
        if (isFile) fileId += 1;
    });
    
    return disk;
}

function getFileInfo(disk: Array<number|null>)
{
    const fileInfo : Array<{location: number, size: number}> = [];
    let i = 0;
    let size = 0;
    let fileId = 0;
    while (i < disk.length)
    {
        //Skip to next contiguous partition
        while (disk[i] == null && i < disk.length) i += 1;

        //File starts here
        const location = i;
        while (disk[i] == fileId && i < disk.length)
        {
            i += 1;
            size += 1;
        }

        fileInfo.push({location, size});
        size = 0;
        fileId += 1;
    }

    return fileInfo;
}
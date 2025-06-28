type SubarrayIndices = [number, number];

function updateValuesInRanges(arr: Array<number>,ranges: SubarrayIndices[]): [Array<number>, number]
{
    let maxi = 0;
    for (const [start, end] of ranges) {
        maxi = Math.max(maxi, end-start+1);
        for (let i = start; i <= end; i++) {
            if (arr[i] != 0) {
                arr[i] += 1;
            }
        }
    }
    return [arr,maxi];
}

export default function strategy({holidayArray = [], maxDayOffs = 0, start = 0}: {holidayArray?: number[]; maxDayOffs?: number; start: number}): [Array<number>, number] 
{
    const n = holidayArray.length;
    let left = start;
    let currentSum = 0;
    let maxLength = 0;
    const results: SubarrayIndices[] = [];

    for (let right = start; right < n; right++) {
        currentSum += holidayArray[right];

        while (currentSum > maxDayOffs && left <= right) {
            currentSum -= holidayArray[left];
            left++;
        }

        const windowLength = right - left + 1;
        if (windowLength > maxLength) {
            maxLength = windowLength;
            results.length = 0;
            results.push([left, right]);
        } else if (windowLength === maxLength) {
            results.push([left, right]);
        }
    }

    return updateValuesInRanges([...holidayArray], results); // Copy to avoid mutating input
}

# Notes

0. Array.from(sourceArr) // Object.assign(target, source, ...);

0. [...sourceArr] // { ...sourceObj }

0. Even if you make a copy of an array or object, nested structures, still point to the same thing.
So if you update a nested DS in your copy, it will also be updated in the original.

0. deepClone or for objects, JSON.parse(JSON.stringify(sourceObj));

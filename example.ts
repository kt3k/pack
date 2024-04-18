import { encodeHex } from "jsr:@std/encoding@0.223.0/hex";

console.log(encodeHex(Uint8Array.from([0, 1, 2, 3])));

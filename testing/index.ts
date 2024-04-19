import { expect } from "./expectation";
import {Tests} from "./tests";

Tests.register("should multiply correctly", () => {
    return expect(5 * 4).toBeEqualTo(202);
})

Tests.register("should multiply correctly", () => {
    return expect(5 * 4).toBeEqualTo(20);
})

Tests.run();
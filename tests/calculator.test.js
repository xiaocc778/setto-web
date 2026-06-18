const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const vm = require("node:vm");

const source = fs.readFileSync(require.resolve("../main.js"), "utf8");
const functionSource = source.match(/function calculatePailRange[\s\S]*?\n}/)?.[0];
assert.ok(functionSource, "main.js must define calculatePailRange");
const calculatePailRange = vm.runInNewContext(`(${functionSource})`);
const plainResult = (area, trowel) => ({ ...calculatePailRange(area, trowel) });

test("calculates conservative pail ranges from the specified coverage bands", () => {
    assert.deepEqual(plainResult(100, "3 mm V-Notch"), { min: 6, max: 7, coverage: "16-18" });
    assert.deepEqual(plainResult(100, "4 mm V-Notch"), { min: 8, max: 9, coverage: "12-14" });
    assert.deepEqual(plainResult(100, "5 mm V-Notch"), { min: 9, max: 10, coverage: "10-12" });
    assert.deepEqual(plainResult(100, "6 mm V-Notch"), { min: 10, max: 13, coverage: "8-10" });
});

test("rounds both ends up so the estimate never recommends a partial pail", () => {
    assert.deepEqual(plainResult(18.1, "3 mm V-Notch"), { min: 2, max: 2, coverage: "16-18" });
});

test("returns null for an invalid area", () => {
    assert.equal(calculatePailRange(0, "5 mm V-Notch"), null);
    assert.equal(calculatePailRange(Number.NaN, "5 mm V-Notch"), null);
});

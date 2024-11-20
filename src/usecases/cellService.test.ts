import { expect, test } from 'vitest';

import { implLocalStorageRepository } from '@/infrastructure/localStorageRepository';

import { implCellService } from './cellService';

const localStorageRepository = implLocalStorageRepository();
const cellService = implCellService({ localStorageRepository });

/*
{
    id: string;
    value: number;
    row: number | null;
    col: number | null;
    mergedToId: string | null;
}
*/

const testCell = {
  id: '1',
  value: 2,
  row: null,
  col: null,
  mergedToId: null,
};

const makeCellByValue = (value: number) => ({
  id: String(value),
  value,
  row: null,
  col: null,
  mergedToId: null,
});

const canMoveTestCells = [
  [null, testCell, testCell, null],
  [null, null, null, null],
  [null, null, null, null],
  [null, null, null, null],
];

const cannotMoveTestCells = [
  [
    makeCellByValue(2),
    makeCellByValue(4),
    makeCellByValue(2),
    makeCellByValue(4),
  ],
  [
    makeCellByValue(4),
    makeCellByValue(2),
    makeCellByValue(4),
    makeCellByValue(2),
  ],
  [
    makeCellByValue(2),
    makeCellByValue(4),
    makeCellByValue(2),
    makeCellByValue(4),
  ],
  [
    makeCellByValue(4),
    makeCellByValue(2),
    makeCellByValue(4),
    makeCellByValue(2),
  ],
];

test('움직일 수 있는 타일이 있다면 움직인다.', () => {
  expect(cellService.checkCanMove(canMoveTestCells)).toBe(true);
});

test('움직일 수 있는 타일이 있다면 움직인다.', () => {
  expect(cellService.checkCanMove(cannotMoveTestCells)).toBe(false);
});

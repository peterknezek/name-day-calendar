# name-day-calendar

Module for providing lists of the official names in a calendar by specific country. Name by day with additional options (e.g.by sex). It contains the name's database, the handlers, and the types for TypeScript.

[![Version](https://img.shields.io/npm/v/name-day-calendar.svg)](https://npmjs.org/package/name-day-calendar)
[![Downloads/week](https://img.shields.io/npm/dw/name-day-calendar.svg)](https://npmjs.org/package/name-day-calendar)
[![License](https://img.shields.io/npm/l/name-day-calendar.svg)](https://github.com/peterknezek/name-day-calendar/blob/master/package.json)

## Install

```
npm install name-day-calendar
```

## Supported Countries

If you are missing name days from your country please consider [CONTRIBUTING](https://github.com/peterknezek/name-day-calendar/blob/main/CONTRIBUTING.md).

<!-- !tree -->

```
Countries: 1
├── SK: Slovenská republika (467 names)
├── AT: Österreich (not yet)
├── CZ: Česká republika (not yet)
├── PL: Polska (not yet)
└── HU: Magyarország (not yet)
```

<!-- tree! -->

## Usage

To avoid big bundle size. Data are splited by a country, month, and sex to support the tree shaking.


# API

## `getNameOnDate`

- Return the array of names related to the provided date.

Function's parameters:

```ts
async function getNameOnDate (
  date: `${Month}-${Day}` | Date,
  options?: {
    lang?: 'SK';
    sex?: 'male' | 'female';
  }
)
```
Examples:

```ts
import { getNameOnDate } from 'name-day-calendar';

// get all name days for specific date
const name: string[] = await getNameOnDate(new Date(1988, 6, 29));

// get all name days on specific date and just for Slovakia
const name: string[] = await getNameOnDate('6-30', { lang: 'SK' });

// get all name days on specific date, just for Slovakia and just male specific names
const name: string[] = await getNameOnDate('6-30', { sex: 'male', lang: 'SK' });
```

Response:

```
['Peter', 'Pavol', 'Petra']
```

## `getNamesByMonth`

- Returns the object with dates and names related to the provided month.

Function parameters:

```ts
async function getNameOnDate (
  options: {
    month: number; // 1-12 
    lang?: 'SK';
    sex?: 'male' | 'female';
  }
)
```
Examples:

```ts
import { getNamesByMonth } from 'name-day-calendar';

// get all names for specific month
const names = await getNamesByMonth({month: 6});

// get all names for specific month but just for a Slovakia
const names = await getNamesByMonth({ month: 6, lang: 'SK' });

// get all names for specific month, just for Slovakia and male gender
const names = await getNamesByMonth({ month: 6, sex: 'male', lang: 'SK' });
```

Response:

```
{
  '6-1': [...],
  ...
  '6-30': ['Peter', 'Pavol', 'Petra'],
}
```

## Contribution and License Agreement

You like to contribute please read [CONTRIBUTING.md](https://github.com/peterknezek/name-day-calendar/blob/main/CONTRIBUTING.md).

If you contribute code to this project, you are implicitly allowing your
code to be distributed under the MIT license. You are also implicitly
verifying that all code is your original work or correctly attributed
with the source of its origin and license.

See [LICENSE](https://github.com/peterknezek/name-day-calendar/blob/main/LICENSE) for more information.

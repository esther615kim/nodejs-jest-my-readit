const db = require('../db/connection.js');
const testData = require('../db/data/test-data/index.js');
const { setTopicInfo,topics } = require('../db/seeds/seed-formatting.js');
const { seed } = require('../db/seeds/seed.js');


describe('seed-formatting functions', () => {

    beforeEach(() => {
        seed(testData);
    });

    test('should return an empty obj when an empty array is passed ', () => {
        const emptyArray = [];
        const expectedOutput = [];
        expect(setTopicInfo(emptyArray)).toEqual(expectedOutput);
    });

    test('topics array should have the slug data from the passed array', () => {
        const passedArray = [
            {
                description: 'The man, the Mitch, the legend',
                slug: 'mitch'
            },
        ];
        setTopicInfo(passedArray);
        expect(topics).toEqual(['mitch']);
    });

    test('multiple topics are added', () => {
        const passedArray = [
            {
                description: 'The man, the Mitch, the legend',
                slug: 'mitch'
            },
            {
                description: 'Not dogs',
                slug: 'cats'
            },
            {
                description: 'what books are made of',
                slug: 'paper'
            }
        ];
        setTopicInfo(passedArray);
        expect(topics).toEqual(['mitch', 'cats', 'paper']);
    });

    test('does not mutate the original input', () => {
        const passedArray = [
            {
                description: 'The man, the Mitch, the legend',
                slug: 'mitch'
            },
        ];
        const unmuatedArray = [
            {
                description: 'The man, the Mitch, the legend',
                slug: 'mitch'
            },
        ];
        setTopicInfo(passedArray);
        expect(passedArray).toEqual(unmuatedArray);
    });
})

// afterAll(() => db.end());


// const db = require('../db/connection.js');
// const testData = require('../db/data/test-data/index.js');
// const { seed } = require('../db/seeds/seed.js');

// beforeEach(() => seed(testData));
// afterAll(() => db.end());

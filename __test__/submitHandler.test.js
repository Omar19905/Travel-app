import {citySubmit} from '../src/client/js/submitHandler'

describe('test citySubmit function', () => {
    test('should return true ', () => {
        expect(citySubmit).toBeDefined();
    });

    test('should return function  ', () => {
        expect(typeof citySubmit).toBe("function");
    });
});
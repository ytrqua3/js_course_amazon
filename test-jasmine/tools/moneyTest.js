import { formatCurrency } from "../../scripts/tools/money.js";

describe('test suite: formatCurrency', () => { //creates a test suite
   
    it('converts cents into dollars', () => { //creates a test
        expect(formatCurrency(2095)).toEqual('20.95'); //expect creates an object
    });

    it('works with 0', () => {    
        expect(formatCurrency(0)).toEqual('0.00');
    });
    

    it('round up to nearest cent', () => {    
        expect(formatCurrency(2000.5)).toEqual('20.01');
    });
});


/* global exports */

(function (target) { // target is 'window' (browser) or 'exports' (node.js)


    'use strict';

    const aequals = function (a, b) {
        // compares two arrays for equality
        return Array.isArray(a) &&
            Array.isArray(b) &&
            a.length === b.length &&
            a.every((val, index) => val === b[index]);
    }

    const amin = function (a) {
        // return minimum value of array
        return Math.min(...a)
    }

    const amax = function (a) {
        // return maximum value of array
        return Math.max(...a)
    }

    const amean = function (a) {
        // return mean value of array
        const n = a.length;
        return a.reduce((a, b) => a + b) / n;
    }

    const astd = function (array) {
        // return standard deviation of array
        const n = array.length;
        const mean = amean(array);
        return Math.sqrt(
            array.map(x => Math.pow(x - mean, 2))
                .reduce((a, b) => a + b) / (n - 1));
    }

    const arange = function () {
        // return an array of evenly spaced values
        // usage: arange([start,] stop, [step])
        // values are generated in [start, stop)

        let args = arguments;
        let nargs = args.length;
        var start, stop, step;

        if (nargs === 1) {
            start = 0;
            stop = args[0];
            step = 1;
        } else if (nargs === 2) {
            start = args[0];
            stop = args[1];
            step = 1;
        } else if (nargs === 3) {
            start = args[0];
            stop = args[1];
            step = args[2];
        } else {
            throw new Error('arange: invalid arguments');
        }

        let a = [];
        for (let i = start; i < stop; i += step) a.push(i);
        return a;
    }


    const hist = function (data, bins) {
        // generate histogram data 
        // {counts, underflow, overflow} = hist(data, bins)
        let underflow = 0;
        let overflow = 0;
        let counts = bins.map(() => 0); // array of zeros, same size as bins
        let bmin = bins[0];
        let bwidth = bins[1] - bins[0];
        let bmax = bins[0] + bins.length * bwidth;

        for (let i = 0; i < data.length; i++) {
            if (data[i] < bmin) {
                underflow++;
            } else if (data[i] >= bmax) {
                overflow++;
            } else {
                let idx = Math.floor((data[i] - bmin) / bwidth);
                counts[idx]++;
            }
        }
        return {
            counts,
            underflow,
            overflow
        }
    }

    const linspace = function (x1, x2, n = 20, endpt = true) {
        // return an array of n evenly spaced values
        // usage: linspace(x1, x2, [n=50], [endpt=true])
        // by default the endpt is included, values in [start, stop]
        // call with endpt = false to exclude endpoint
        // examples: 
        //  linspace(0, 5, 5) returns [0, 1.25, 2.5, 3.75, 5.0]
        //  linspace(0, 5, 6) returns [0, 1, 2, 3, 4, 5]
        //  linspace(0, 5, 5, false) returns [0, 1, 2, 3, 4]

        let a = [];
        if (endpt) {
            if (n < 2) throw new Error(`linspace: invalid n; n=${n}`);
            let step = (x2 - x1) / (n - 1);
            for (let i = 0; i <= (n - 1); i++)a.push(x1 + i * step);
        } else {
            if (n < 1) throw new Error(`linspace: invalid n; n=${n}`);
            let step = (x2 - x1) / n;
            for (let i = 0; i < n; i++) a.push(x1 + i * step);
        }
        return a;
    }

    target.aequals = aequals;
    target.amin = amin;
    target.amax = amax;
    target.amean = amean;
    target.astd = astd;
    target.arange = arange;
    target.hist = hist;
    target.linspace = linspace;

})(typeof window !== 'undefined' ? window : exports); // browser or node.js

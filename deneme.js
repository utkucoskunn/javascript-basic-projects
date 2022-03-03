function SudokuQuadrantChecker(strArr) {
    let arr =[];
    let result = [];
    // code goes here
    const quadrant = (r, c) => {
        if (r >= 0 && r <= 2 && c >= 0 && c <=2) {
            // 1. quadrant
            result.push(1);
        }
        else if (r >= 0 && r <= 2 && c >= 3 && c <= 5) {
            // 2.quadrant
            result.push(2);
        }
        else if (r >= 0 && r <= 2 && c >= 6 && c <= 8) {
            // 3.quadrant
            result.push(3);
        }
        else if (r >= 3 && r <= 5 && c >= 0 && c <=2) {
            // 4.quadrant
            result.push(4);
        }
        else if (r >= 3 && r <= 5 && c >= 3 && c <= 5) {
            // 5.quadrant
            result.push(5);
        }
        else if (r >= 3 && r <= 5 && c >= 6 && c <= 8) {
            // 6.quadrant
            result.push(6)
        }
        else if (r >= 6 && r <= 8 && c >= 0 && c <= 2) {
            // 7.quadrant
            result.push(7);
        }
        else if (r >= 6 && r <= 8 && c >= 3 && c <= 5) {
            // 8.quadrant
            result.push(8);
        }
        else if (r >= 6 && r <= 8 && c >= 6 && c <= 8) {
            // 9.quadrant
            result.push(9);
        }
    }

    for (let k = 0; k < strArr.length; k++) {
        let s = strArr[k].slice(1, strArr[k].length-1).split(",");
        arr.push(s);
    }

    for (let i = 0; i < arr.length; i++) {
        for (let j = 0; j < arr.length; j++) {
            // satırları yakalıyor
            for (let l = j+1; l < arr.length; l++) {
                if (arr[i][j] === arr[i][l] && arr[i][j] !== "x") {
                    quadrant(i, j);
                    quadrant(i, l);
                }
            }
            // sütunları yakalıyor
            for (let m = 0; m < arr.length; m++) {
                if (arr[i][j] === arr[m][j] && arr[i][j] !== "x" &&  m !== i) {
                    quadrant(i, j);
                }
            }
        }
    }

    let uniqueQuadrants = [...new Set(result)].join(",");
    return uniqueQuadrants
}

// keep this function call here
console.log(SudokuQuadrantChecker(readline()));
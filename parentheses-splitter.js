module.exports = {
    split: function (str) {
            let openParenthesesList = [];
            let matchList = [];
            let order = 0;
            let level = 1;

            for (let i = 0; i < str.length; i++) {
                if (str[i] === "(") { // check for open parenthenses
                    openParenthesesList.push({position: i, order: order});
                    // if present, add it's position and order to an array.
                    order++;
                    level++;
                } else if (str[i] === ")") {
                    let closed = openParenthesesList.pop();
                    level--;
                    // ^ removes the last object in the 'openParenthesesList' array (the parentheses that
                    // matches the current closing parentheses) and stores it in the 'closed' variable.
                    let obj = {
                        openPosition: closed.position,
                        closePosition: i,
                        order: closed.order,
                        level: level
                    };
                    // ^ makes an object containing the position of the opening and closing parentheses
                    // of this match, as well as the order of the match.
                    obj.content = str.slice(obj.openPosition + 1, obj.closePosition);
                    // ^ adds the content (what the parentheses contain) to the obj.
                    matchList.push(obj);
                    
                };
            };

            matchList.sort(function(a, b) {
                return parseFloat(a.order) - parseFloat(b.order);
            });
            // ^ sorts the objects in the array by order (in ascending order)
            
            return matchList;
        
    }
}
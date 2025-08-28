const uri = 'api/todoitems';
let todos = [];
function getItems() {
    fetch(uri)
        .then(response => response.json())
        .then(data => console.log(data))
        .catch(error => console.error('Unable to get items.', error));

    console.log("flarb");
}

// JavaScript source code
let board = [];

let board_node;

let XIsNext = true;

let winner = false;

window.addEventListener('load', () => {


    console.log(getItems());

    board_node = document.querySelector("#board");

    for (let row = 0; row < 3; row++) {
        board[row] = [];

        for (let col = 0; col < 3; col++) {
            let square_node = document.createElement("div");
            square_node.setAttribute("class", "square");

            board[row].push(null);

            square_node.addEventListener("click", () => {
                if (board[row][col] == null) {
                    if (XIsNext) {
                        square_node.innerText = "X";

                        board[row][col] = "X";
                    } else {
                        square_node.innerText = "O";

                        board[row][col] = "O";

                    }

                    XIsNext = !XIsNext;

                    winner = checkPlayerWon();

                    if (winner) {
                        let item = {
                            isComplete: true,
                            winner: winner
                        }

                        fetch(uri, {
                            method: 'POST',
                            headers: {
                                'Accept': 'application/json',
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify(item)
                        })
                            .then(response => {
                                window.location.href = "results.htm?winner=" + winner;
                            })
                    }
                }
            });

            board_node.appendChild(square_node);
        }
    }
});

function checkPlayerWon() {
    //Check each row
    let win_string = "";

    for (let row = 0; row < 3; row++) {
        win_string = "";

        for (let col = 0; col < 3; col++) {
            win_string = win_string + board[row][col];
        }

        if (win_string == "XXX" || win_string == "OOO") return win_string[0];
    }

    //Check each column
    for (let col = 0; col < 3; col++) {
        win_string = "";

        for (let row = 0; row < 3; row++) {
            win_string = win_string + board[row][col];
        }

        if (win_string == "XXX" || win_string == "OOO") return win_string[0];
    }

    //check diagonals

    win_string = "";

    for (let i = 0; i < 3; i++) {
        win_string = win_string + board[i][i];

        if (win_string == "XXX" || win_string == "OOO") return win_string[0];
    }

    win_string = "";

    for (let i = 0; i < 3; i++) {
        win_string = win_string + board[i][2-i];

        if (win_string == "XXX" || win_string == "OOO") return win_string[0];
    }

    return false;
}
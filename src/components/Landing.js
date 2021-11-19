import React from "react";
import { Link, NavLink, useParams } from "react-router-dom";
import './Landing.css'
export default function Landing(props) {
    const display = useParams().mode;
    //const param = useParams();
    //console.log(param);
    if (display === 'displayRule') {
        return (
            <>
                <div>
                    <p> At the start of the game, 5 ships are randomly placed on each board
                        (one 5X1 ship, one 4X1 ship, two 3X1 ships, and one 2X1 ship).
                        Each ship should fit entirely on the board and they should not overlap any other ship on the board.
                        During the game, you and an AI will take turns (the player always goes first).
                        On your turn, you will select a square on your opponent’s board.  On your opponent’s turn,
                        the AI will randomly select a square on your grid.  If you or your opponent hit a ship,
                        then mark that board with a color and symbol.  If you or your opponent miss,
                        then mark a spot on the board to remind the players where on the board they have attempted.
                        The AI will not try to hit the same place more than once,
                        and the user should not be able to select the same spot more than once.
                        The game is over when one of the player has eliminated all of their oponent's ships.</p>
                </div>
            </>
        );
    }
    return (
        <div id='menu'>

            <Link to={'/game/normal'}><button class='menu' type='button'>Normal Mode</button></Link>
            <Link to={'/game/freeplay'}><button class='menu' type='button'>Free Play Mode</button></Link>
            <Link to={'/displayRule'}><button class='menu' type='button'>Rules</button></Link>
        </div >
    );

}
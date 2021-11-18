import { useDispatch } from 'react-redux';
import { startGame } from '../actions/actions';
export default function StartBtn(props) {
    const dispatch = useDispatch();
    return (
        <button onClick={() => dispatch(startGame())}><h3>Start</h3></button>
    );
}
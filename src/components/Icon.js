import './Icon.css'
export default function Icon(props) {
    if (props.state.includes('missed')) {
        return (
            <div className='missed'>X</div>
        );
    } else if (props.state.includes('hit')) {
        return (
            < div className='hit' >✔</div >
        );
    } else {
        return null;
    }
    /* 
    switch (props.state) {
        case 'missed':
            return (
                <div className='missed'>X</div>
            );
        case 'hit':
            return (
                <div className='hit'>✔</div>
            );
        default:
            return null;
    }
    */
}
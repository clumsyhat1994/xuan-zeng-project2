import './Icon.css'
export default function Icon(props) {
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
}
import {Button} from './styles';

const Letter = ({ value, ...rest }) => {

    return (
        <Button {...rest}>{value}</Button>
    )
}



export default Letter;

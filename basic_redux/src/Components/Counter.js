import { useSelector } from "react-redux";

function Counter(){
    const count = useSelector(state => state);
    return <>
        <h1>Value of Counter is {count}</h1>
    </>
}

export default Counter;
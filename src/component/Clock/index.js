import React, {useState, useEffect} from 'react';
import './Clock.css';

function useClock() {
    let [date, setDate] = useState(new Date());

    useEffect(() => {
        function tick() {
            setDate(new Date());
        }
        let clockId = setInterval(tick, 1000);

        return () => {
            clearInterval(clockId);
        }
    }, []);

    return date;
}

function Clock ({render}){
    let date = useClock();
    let str = date.toLocaleString();
    let cmp = render ? render(date) : undefined;

    return (
        <div>
            <div className="clock">
                {str}
            </div>
            {cmp}
        </div>
    )
}

function withClock(Component) {
    return class WithClock extends React.Component{
        render(){
            return(
                <Clock render={date => (
                    <Component {...this.props} date={date} />
                )} />
            )
        }
    }
}

export {Clock, useClock};

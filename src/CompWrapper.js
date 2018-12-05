import React, { Component } from 'react';
import './App.css';
import Comp from './Comp';

class CompWrapper extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: props.data
        };
    }
    componentWillReceiveProps(nextProps) {
        this.setState({ data: nextProps.data })
    }
    render() {
        const { data } = this.state;
        return <React.Fragment>
            {data.map((itm) => {
                return <Comp key={itm[0]} name={itm[0]} price={itm[1]} />
            })}
        </React.Fragment>
    }
}

export default CompWrapper;

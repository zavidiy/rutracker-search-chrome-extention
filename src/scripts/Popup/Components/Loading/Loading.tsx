import {Component} from 'preact';

export class Loading extends Component {
    render() {
        return <div class="loading">
            <i className="loading__spinner fa-solid fa-spinner"/>
        </div>;
    }
}
const React = require('react');
const ReactDOM = require('react-dom');
const rules = require('atomizer/src/rules');

const Results = props => {};

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.onTextChange = this.onTextChange.bind(this);
    }
    render() {
        return (
            <div className="Px(10px) Py(6px) H(500px)">
                <div className="W(300px)">
                    <input
                        className="W(100%) Bdrs(3px) Bgc(white) Bdc(#dbdbdb) Bd Fz(1rem) Lh(1.5) Px(10px) Py(6px) Bxz(bb) C(#363636)"
                        type="text"
                        placeholder="search for styles"
                        onChange={this.onTextChange}
                    />
                </div>
            </div>
        );
    }

    onTextChange(event) {
        this.setState({
            searchText: event.target.value.trim()
        });
    }
}

ReactDOM.render(<App />, document.querySelector('#main'));

const React = require('react');
const ReactDOM = require('react-dom');
const rules = require('atomizer/src/rules');

class App extends React.Component {
    render() {
        return (
            <div className="field">
                <label className="label">Name</label>
                <div className="control">
                    <input className="input" type="text" placeholder="Text input" />
                </div>
            </div>
        );
    }
}

ReactDOM.render(<App />, document.querySelector('#main'));

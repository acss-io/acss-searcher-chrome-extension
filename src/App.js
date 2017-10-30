import React from 'react';
import Rules from 'atomizer/src/rules';

const StyleEntry = ({ matcher, styleName, argumentKey, argumentValue }) => {
    return (
        <li>
            <span className="Fz(1.1em)">{`${matcher}(${argumentKey}) `}</span>
            <span className="Fz(1.05em) C(#f2438c)">{`${styleName}: ${argumentValue}`}</span>
        </li>
    );
};

const ResultsEntry = ({ data }) => {
    const { name, arguments: { '0': argument = {} } = [], matcher, styles } = data;
    const styleName = Object.keys(styles)[0];
    return (
        <div>
            <h3>{name}</h3>
            <ul>
                {Object.keys(argument).map(key => {
                    return (
                        <StyleEntry
                            key={`style-entry-${key}`}
                            matcher={matcher}
                            styleName={styleName}
                            argumentKey={key}
                            argumentValue={argument[key]}
                        />
                    );
                })}
            </ul>
        </div>
    );
};

const Results = ({ searchText }) => {
    const regex = new RegExp(`${searchText}`, 'i');
    const result = Rules.filter(rule => {
        return rule.name.search(regex) > -1;
    });
    return (
        <div className="Mah(450px) Ov(a)">
            {result.map((entry, index) => {
                return <ResultsEntry data={entry} key={`result-${index}`} />;
            })}
        </div>
    );
};

class App extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {};
        this.onTextChange = this.onTextChange.bind(this);
    }

    render() {
        const { searchText } = this.state;
        return (
            <div className="Px(10px) Py(6px)">
                <div className="W(300px)">
                    <h1 className="Fz(1.5em) Mt(0)">Atomic CSS Reference</h1>
                    <input
                        className="W(100%) Bdrs(3px) Bgc(white) Bdc(#dbdbdb) Bd Fz(1rem) Lh(1.5) Px(10px) Py(6px) Bxz(bb) C(#363636)"
                        type="text"
                        placeholder="search for styles"
                        onChange={this.onTextChange}
                    />
                </div>
                <Results searchText={searchText} />
            </div>
        );
    }

    onTextChange(event) {
        const { target: { value = '' } = {} } = event;
        this.setState({
            searchText: value.trim()
        });
    }
}

export default App;

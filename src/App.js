import React from 'react';
import Rules from 'atomizer/src/rules';
import { autobind, debounce, pureComponent, initialState } from 'react-decoration';
import escapeStringRegexp from 'escape-string-regexp';

let processedRules;
try {
    processedRules = JSON.stringify(Rules);
    processedRules = replaceRTLTokens(processedRules);
    processedRules = JSON.parse(processedRules);
} catch (e) {
    processedRules = Rules;
    console.error('[ACSS searcher] process rules failed');
}

function replaceRTLTokens(str = '') {
    if (typeof str !== 'string') {
        return str;
    }
    return str.replace(/__START__/g, 'left').replace(/__END__/g, 'right');
}

const SEARCH_TEXT_DEBOUNCE_MS = 300;

const StyleEntry = ({ matcher, styleNames = [], argumentKey, argumentValue }) => {
    return (
        <li className="D(f)">
            <span className="Fz(1.1em)">{`${matcher}(${argumentKey}) `}</span>
            <ul className="List(n) Pstart(10px)">
                {styleNames.map((styleName, index) => {
                    return (
                        <li key={`${matcher}-${styleName}-${index}`}>
                            <span className="Fz(1.05em) C(#f2438c)">{`${styleName}: ${argumentValue}`}</span>
                        </li>
                    );
                })}
            </ul>
        </li>
    );
};

const CUSTOM_PARAM = '<custom-param>';
const VALUE = '<value> or ';

const ResultsEntry = ({ data }) => {
    const { allowParamToValue, name, arguments: { '0': argument = {} } = [], matcher, styles } = data;
    const styleNames = Object.keys(styles);
    const matcherValueString = allowParamToValue ? VALUE : '';
    return (
        <div>
            <h3>{name}</h3>
            <ul>
                <li className="D(f)">
                    <span className="Fz(1.1em)">{`${matcher}(${matcherValueString}${CUSTOM_PARAM})`}</span>
                    <ul className="List(n) Pstart(10px)">
                        {styleNames.map((styleName, index) => {
                            return (
                                <li key={`style-name-${index}`}>
                                    <span className="Fz(1.05em) C(#f2438c)">{styleName}: </span>
                                    <span className="C(#07f)">value</span>
                                </li>
                            );
                        })}
                    </ul>
                </li>
                {Object.keys(argument).map(key => {
                    return (
                        <StyleEntry
                            key={`style-entry-${key}`}
                            matcher={matcher}
                            styleNames={styleNames}
                            argumentKey={key}
                            argumentValue={argument[key]}
                        />
                    );
                })}
            </ul>
        </div>
    );
};

const Results = ({ searchText = '' }) => {
    const regex = new RegExp(`${escapeStringRegexp(searchText)}`, 'i');
    const result = processedRules.filter(rule => {
        return rule.name.search(regex) > -1 || rule.matcher.search(regex) > -1;
    });
    return (
        <div className="Mah(500px) Ov(a)">
            {result.map((entry, index) => {
                return <ResultsEntry data={entry} key={`result-${index}`} />;
            })}
        </div>
    );
};

@initialState({})
@pureComponent
class App {
    render() {
        const { searchText } = this.state;
        return (
            <div className="Px(10px) Py(6px)">
                <div className="W(500px)">
                    <h1 className="Fz(1.5em) Mt(0)">Atomic CSS Reference</h1>
                    <input
                        className="W(100%) Bdrs(3px) Bgc(white) Bdc(#dbdbdb) Bd Fz(1rem) Lh(1.5) Px(10px) Py(6px) Bxz(bb) C(#363636)"
                        type="text"
                        placeholder="search for styles"
                        onChange={this.handleChange}
                    />
                </div>
                <Results searchText={searchText} />
            </div>
        );
    }

    @autobind
    handleChange(event) {
        const { target: { value } } = event;
        this.updateSearchText(value);
    }

    @autobind
    @debounce(SEARCH_TEXT_DEBOUNCE_MS)
    updateSearchText(value) {
        this.setState({
            searchText: value.trim(),
        });
    }
}

export default App;

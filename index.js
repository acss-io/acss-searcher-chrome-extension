const React = require('react')
const ReactDOM = require('react-dom')
const Rules = require('atomizer/src/rules')

const StyleEntry = ({ matcher, styleName, argumentKey, argumentValue }) => {
    return (
        <li>{`${matcher}(${argumentKey}) ${styleName}: ${argumentValue}`}</li>
    )
}

const ResultsEntry = ({ data }) => {
    console.log('===data', data)
    const {
        name,
        arguments: { '0': argument = {} } = [],
        matcher,
        styles,
    } = data
    const styleName = Object.keys(styles)[0]
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
                    )
                })}
            </ul>
        </div>
    )
}

const Results = ({ searchText }) => {
    const regex = new RegExp(`${searchText}`, 'i')
    const result = Rules.filter(rule => {
        return rule.name.search(regex) > -1
    })
    return (
        <div className="Mah(450px) Ov(a)">
            {result.map((entry, index) => {
                return <ResultsEntry data={entry} key={`result-${index}`} />
            })}
        </div>
    )
}

class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {}
        this.onTextChange = this.onTextChange.bind(this)
    }
    render() {
        const { searchText } = this.state
        return (
            <div className="Px(10px) Py(6px)">
                <div className="W(300px)">
                    <input
                        className="W(100%) Bdrs(3px) Bgc(white) Bdc(#dbdbdb) Bd Fz(1rem) Lh(1.5) Px(10px) Py(6px) Bxz(bb) C(#363636)"
                        type="text"
                        placeholder="search for styles"
                        onChange={this.onTextChange}
                    />
                </div>
                <Results searchText={searchText} />
            </div>
        )
    }

    onTextChange(event) {
        const { target: { value = '' } = {} } = event
        this.setState({
            searchText: value.trim(),
        })
    }
}

ReactDOM.render(<App />, document.querySelector('#main'))

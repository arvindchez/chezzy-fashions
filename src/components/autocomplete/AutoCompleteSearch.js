import React, { useState } from 'react';

const AutoCompleteSearch = ({ data, loadSuggestions, handleSearch }) => {
    const [text, setText] = useState("");

    const handleQuery = (e) => {
        const value = e.target.value;
        loadSuggestions(value);
        setText(value);
    }

    const suggestionSelected = (value) => {
        loadSuggestions(undefined);
        setText(value);
        handleSearch(value);
    }

    const renderSuggestions = () => {
        if (data && data.length === 0) {
            return null;
        }

        return (
            <ul>
                {data.map((item, index) =>
                    <li key={index} onClick={() => { suggestionSelected(item) }} >{item}</li>)}
            </ul>
        );
    }

    return (
        <div className="autocompletetext">
            <div className="input-group">
                <input
                    className="form-control"
                    type="search" value={text}
                    placeholder="Search products..."
                    onChange={(e) => {
                        handleQuery(e);
                    }}
                />
                <div className="input-group-append">
                    <button className="btn btn-sm" type="button"
                        onClick={() => {
                            suggestionSelected(text)
                        }}>
                        <i className="fa fa-search"></i>
                    </button>
                </div>
            </div>
            {renderSuggestions()}
        </div>
    );
}

export default AutoCompleteSearch
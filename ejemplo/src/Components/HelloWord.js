import React from 'react';

function HelloWorld() {
    // JSX se vé como HTML
    const jsxExpression = <h1>Hello, world!</h1>;

    return (
        <div>
            {jsxExpression}
        </div>
    );
}

export default HelloWorld;
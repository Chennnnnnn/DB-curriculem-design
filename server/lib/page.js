import React from 'react'
import {renderToString,renderToStaticMarkup} from 'react-dom/server'
import Aroot from '../../src/js/components/Aroot'

export default  () =>{
    const content = renderToString(<Aroot />);
    const _html = renderToStaticMarkup(
        <html lang="en">
        <head>
            <meta charset="UTF-8"/>
            <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
            <meta http-equiv="X-UA-Compatible" content="ie=edge"/>
            <link rel={"stylesheet"} type="text/css" href={"./dist/admin.css"} />
            <title>图书馆管理页面</title>
        </head>
        <body>
            <div id="root" dangerouslySetInnerHTML={
                {__html: content}
            } /> 
            <script src={"./dist/admin.js"}></script>        
        </body>
        </html>
    );
    return _html;
}
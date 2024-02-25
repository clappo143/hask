import { useEffect, useState } from "react";
import React from "react";
import Prism from 'prismjs';


const CodeText = React.memo(({ children, className }) => {
    const [status, setStatus] = useState("copy");
    const [lang, setLang] = useState("");
    const [code, setCode] = useState("");
    useEffect(() => {
        Prism.highlightAll();
        
        if (children) {
            // console.log(children)
            setLang(children.split("\n")[0])
            setCode(children.split("\n").slice(1, -1).join("\n"))
        }
    }
    , [children]);

    return (
        <div className={className}>
            <div className="w-full bg-[#2F2F2F]  flex items-center text-[#B4B4B4] justify-between py-[2px]">
                <div className="ml-3 ">{lang}</div>

                <div className="flex items-center justify-center  mr-2 gap-1 hover:cursor-pointer">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="#B4B4B4" className="w-[14px] h-[14px]">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.666 3.888A2.25 2.25 0 0 0 13.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 0 1-.75.75H9a.75.75 0 0 1-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 0 1-2.25 2.25H6.75A2.25 2.25 0 0 1 4.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 0 1 1.927-.184" />
                    </svg>
                    <span className="text-sm"> {status} </span>
                </div>
                
            </div>
            <pre className={"language-"+lang}>
            {/* <pre className={"overflow-auto px-3 py-3 language-"}> */}
                <code className={" token language-"+ lang} >
                    {code}
                </code>
            </pre>
        </div>
    );
});

export default CodeText;
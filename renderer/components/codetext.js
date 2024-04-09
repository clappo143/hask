import { useEffect, useState, useRef } from "react"; // Add useRef here
import Prism from 'prismjs';
import 'prismjs/components/prism-python'; // Import additional languages as needed
import DOMPurify from 'dompurify';
import showdown from 'showdown';


const CodeText = ({ children }) => {
    const [status, setStatus] = useState("copy");
    const [code, setCode] = useState("");
    const [lang, setLang] = useState("none"); // Set default language to 'none'
    const codeElementRef = useRef(null);

    useEffect(() => {
        let rawCode = children;
        let detectedLang = 'none';
    
        // Extract the language from the first line if it's in the format ```language
        const matches = children.match(/^```(\w+)/);
        if (matches) {
            detectedLang = matches[1];
            rawCode = children.replace(/^```(\w+)\s*[\r\n]/, '').replace(/```$/, '').trim();
        }
    
        // Convert any HTML entities back to their respective characters
        const textArea = document.createElement('textarea');
        textArea.innerHTML = rawCode;
        rawCode = textArea.value;
    
        setCode(rawCode);
        setLang(detectedLang);
    
        // Ensure the DOM has updated before highlighting
        setTimeout(() => {
            if (codeElementRef.current) {
                Prism.highlightElement(codeElementRef.current);
            }
        }, 0);
    }, [children]);
    

    const copied = () => {
        navigator.clipboard.writeText(code).then(() => {
            setStatus("copied");
            setTimeout(() => setStatus("copy"), 1000);
        }, (err) => {
            setStatus("error");
            setTimeout(() => setStatus("copy"), 1000);
        });
    }

    return (
        <div className=" mx-auto my-1 w-[97%] rounded-md bg-code text-sm overflow-auto border dark:border-gray-400/30 duration-700">
            <div className={`w-full bg-grayish flex items-center pl-[16px] text-[#B4B4B4] justify-between py-[2px]`}>
                <div className="ml-3 ">{lang.replace('`', '').replace('`', '').replace('`', '')}</div>

                <div onClick={copied} className="flex items-center justify-center  mr-2 gap-1 hover:cursor-pointer">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke={`#B4B4B4`} className="w-[14px] h-[14px]">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.666 3.888A2.25 2.25 0 0 0 13.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 0 1-.75.75H9a.75.75 0 0 1-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 0 1-2.25 2.25H6.75A2.25 2.25 0 0 1 4.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 0 1 1.927-.184" />
                    </svg>
                    <span className="text-sm"> {status} </span>
                </div>

            </div>
            <pre>
                <code
                    ref={codeElementRef}
                    className={`language-${lang}`} // Apply the extracted language class
                    dangerouslySetInnerHTML={{ __html: code }}
                />
            </pre>
        </div>
    );
};

export default CodeText;
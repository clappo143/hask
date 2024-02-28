import { store, retrieve } from "./api/methods";
import { useEffect, useState } from "react";
import Provider from "../components/provider";

export default function Settings() {
    const [log, setLog] = useState("");
    const [provider, setProvider] = useState("perplexity");
    const [token, setToken] = useState("");
    const [models, setModels] = useState(["pplx-7b-online", "pplx-70b-online", "pplx-8x7b-online", "sonar-small-online", "sonar-medium-online", "sonar-medium-chat", "sonar-small-chat"]);
    const [model, setModel] = useState("pplx-7b-online");
    const [systemPrompt, setSystemPrompt] = useState("Be precise and concise.");
    const [temperature, setTemperature] = useState(0.7);
    const [maxTokens, setMaxTokens] = useState(500);

    // Other state initializations remain unchanged
    const [pplxToken, setPplxToken] = useState("");
    const [pplxModel, setPplxModel] = useState("");
    const [pplxModels, setPplxModels] = useState(["pplx-7b-online", "pplx-70b-online", "pplx-8x7b-online", "sonar-small-online", "sonar-medium-online", "sonar-medium-chat", "sonar-small-chat"]);
    const [pplxStatus, setPplxStatus] = useState(true);
    const [pplxSystemPrompt, setPplxSystemPrompt] = useState("Be precise and concise.");
    const [pplxTemperature, setPplxTemperature] = useState(0.5);
    const [pplxMaxTokens, setPplxMaxTokens] = useState(900);

    // const [groqToken, setGroqToken] = useState("");
    // const [groqModel, setGroqModel] = useState("");
    // const [groqModels, setGroqModels] = useState(["mixtral-8x7b-32768", "llama2-70b-4096"]);
    // const [groqStatus, setGroqStatus] = useState(false);
    // const [groqSystemPrompt, setGroqSystemPrompt] = useState("Be precise and concise.");
    // const [groqTemperature, setGroqTemperature] = useState(0.5);
    // const [groqMaxTokens, setGroqMaxTokens] = useState(900);

    // const [openaiToken, setOpenaiToken] = useState("");
    // const [openaiModel, setOpenaiModel] = useState("");
    // const [openaiModels, setOpenaiModels] = useState(["gpt-3.5-turbo", "gpt-4"]);

    // const [cohereToken, setCohereToken] = useState("");
    // const [cohereModel, setCohereModel] = useState("");
    // const [cohereModels, setCohereModels] = useState(["Turing-I", "Turing-I"]);


    useEffect(() => {
        // No need to setProvider here as it's already initialized above with useState
        // If provider is "perplexity", no need for conditional check as it's the only option
        // Load the model from local storage
        const savedModel = localStorage.getItem("pplx-model");
        if (savedModel) {
            setModel(savedModel);
        }
        // Load the system prompt from local storage
        const savedSystemPrompt = localStorage.getItem("pplx-system-prompt");
        if (savedSystemPrompt) {
            setSystemPrompt(savedSystemPrompt);
        }
        // Load the temperature from local storage
        const savedTemperature = localStorage.getItem("pplx-temperature");
        if (savedTemperature) {
            setTemperature(parseFloat(savedTemperature));
        }
        // Load the max tokens from local storage
        const savedMaxTokens = localStorage.getItem("pplx-max-tokens");
        if (savedMaxTokens) {
            setMaxTokens(parseInt(savedMaxTokens, 10));
        }
        // Load the token from local storage
        const savedToken = localStorage.getItem("pplx-token");
        if (savedToken) {
            setToken(savedToken);
        }
        
        console.log("provider", provider, "token", token, "model", model, "models", models, "systemPrompt", systemPrompt, "temperature", temperature, "maxTokens", maxTokens);
      }, []); // Removed provider from dependency array to avoid reloading on provider change
      
      const handleTokenChange = (e) => { 
        setToken(e.target.value);
      }
      
      const handleModelChange = (e) => {
        setModel(e.target.value);
      }
      
      const handleSave = async () => {
        // Save the current state to local storage
        localStorage.setItem("provider", provider);
        localStorage.setItem("pplx-token", token);
        localStorage.setItem("pplx-model", model);
        localStorage.setItem("pplx-system-prompt", systemPrompt);
        localStorage.setItem("pplx-temperature", temperature.toString()); // Ensure string is saved
        localStorage.setItem("pplx-max-tokens", maxTokens.toString()); // Ensure string is saved
        setLog("Configuration Saved!");
        await new Promise(r => setTimeout(r, 3000));
        setLog("");
      }
      
      const handleTabChange = (newProvider) => {
        // temporary blockage of switching providers
        if (newProvider !== "perplexity" && newProvider !== "-groq") {
            // console.log("clicking on other providers is disabled")
            return;
        }
        setProvider(newProvider);
        if (newProvider === "perplexity") {
            setPplxStatus(true);
            setToken(pplxToken);
            setModel(pplxModel);
            setModels(pplxModels);
        }  
        // else if (provider === "groq") {
        //     // console.log("setting groq: token", groqToken, "model", groqModel, "models", groqModels, "provider", provider);
        //     setPplxStatus(false);
        //     setGroqStatus(true);
        //     setToken(groqToken);
        //     setModel(groqModel);
        //     setModels(groqModels);
        // } 
        else {

        }
    }
    const handleSystemPrompt = (e) => { setSystemPrompt(e.target.value); }
    const handleTemperature = (e) => { setTemperature(parseFloat(e.target.value)); }
    const handleMaxTokens = (e) => { setMaxTokens(parseInt(e.target.value, 10)); }

    return (
        <div className="w-screen h-screen bg-[#e0e5f6] flex flex-col">
            <div className=" h-20 flex items-center justify-center gap-3">
                <div className="bg-[#c5ccdb9a] rounded-md px-6 py-2 flex flex-col items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="#000000af" className="w-7 h-7">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12a7.5 7.5 0 0 0 15 0m-15 0a7.5 7.5 0 1 1 15 0m-15 0H3m16.5 0H21m-1.5 0H12m-8.457 3.077 1.41-.513m14.095-5.13 1.41-.513M5.106 17.785l1.15-.964m11.49-9.642 1.149-.964M7.501 19.795l.75-1.3m7.5-12.99.75-1.3m-6.063 16.658.26-1.477m2.605-14.772.26-1.477m0 17.726-.26-1.477M10.698 4.614l-.26-1.477M16.5 19.794l-.75-1.299M7.5 4.205 12 12m6.894 5.785-1.149-.964M6.256 7.178l-1.15-.964m15.352 8.864-1.41-.513M4.954 9.435l-1.41-.514M12.002 12l-3.75 6.495" />
                    </svg>

                    <span className="text-gray-600">Settings</span>
                </div>
            </div>

            <div className="border-t mt-1 border-gray-400 flex-1 flex flex-col items-center">
                <div className="w-full mt-1 gap-1 h-[50px] flex justify-center border-b border-gray-400 ">

                    <Provider active={pplxStatus} _provider={"Perplexity"} handleTabChange={handleTabChange} />
                    <Provider active={false} _provider={"Groq"} handleTabChange={handleTabChange} />
                    <Provider active={false} _provider={"OpenAI"} handleTabChange={handleTabChange} />
                    <Provider active={false} _provider={"Cohere"} handleTabChange={handleTabChange} />

                </div>
                
                <div className="w-full mt-8 gap-1 flex justify-center border">
                    <div className="h-7 w-[20%] flex items-center">
                        <p className="w-full text-right text-gray-500 text-sm font-medium ">API-Key:</p>
                    </div>
                    <div className="h-7 w-[50%] flex items-center bg-gray-400/10 border border-gray-900/20 rounded">
                        <input
                                onChange={handleTokenChange}
                                value={token}
                                placeholder="Paste your API-Key here..."
                                className="outline-none text-sm w-full placeholder:text-gray-500/80 font-medium bg-transparent border-r-1 mx-2 py-[2px]"
                            />  
                    </div>
                </div>
                <div className="w-full mt-1 gap-1 flex justify-center border ">
                    <div className="h-7 w-[20%] flex items-center ">
                        <p className="w-full text-right text-gray-500 text-sm font-medium ">model:</p>
                    </div>
                    <div className="h-7 w-[50%] flex items-center bg-gray-400/10 border border-gray-900/20 rounded">
                        <select onChange={handleModelChange} value={model} className="w-full h-full bg-transparent rounded-md text-black placeholder:text-gray-500/80 focus:outline-none">
                            {
                                models.map((model, index) => {
                                    return <option key={index} className=" ">{model}</option>
                                })
                            }
                        </select>
                    </div>
                </div>
                <div className="w-full mt-1 gap-1 flex justify-center border">
                    <div className="h-7 w-[20%] flex items-center">
                        <p className="w-full text-right text-gray-500 text-sm font-medium ">System prompt:</p>
                    </div>
                    <div className="h-7 w-[50%] flex items-center bg-gray-400/10 border border-gray-900/20 rounded">
                        <input
                                onChange={handleSystemPrompt}
                                value={systemPrompt}
                                placeholder="Be precise and concise."
                                className="outline-none text-sm w-full placeholder:text-gray-500/80 font-medium bg-transparent border-r-1 mx-2 py-[2px]"
                            />  
                    </div>
                </div>
                <div className="w-full mt-1 gap-1 flex justify-center border">
                    <div className="h-7 w-[20%] flex items-center">
                        <p className="w-full text-right text-gray-500 text-sm font-medium ">Temperature:</p>
                    </div>
                    <div className="h-7 w-[50%] flex items-center bg-gray-400/10 border border-gray-900/20 rounded">
                        <input
                                onChange={handleTemperature}
                                value={temperature}
                                type="number"
                                placeholder="Set the temperature..."
                                className="outline-none text-sm w-full placeholder:text-gray-500/80 font-medium bg-transparent border-r-1 mx-2 py-[2px]"
                            />  
                    </div>
                    </div>
                <div className="w-full mt-1 gap-1 flex justify-center border">
                    <div className="h-7 w-[20%] flex items-center">
                        <p className="w-full text-right text-gray-500 text-sm font-medium ">Max token:</p>
                    </div>
                    <div className="h-7 w-[50%] flex items-center bg-gray-400/10 border border-gray-900/20 rounded">
                        <input
                                onChange={handleMaxTokens}
                                value={maxTokens}
                                type="number"
                                placeholder="900"
                                className="outline-none text-sm w-full placeholder:text-gray-500/80 font-medium bg-transparent border-r-1 mx-2 py-[2px]"
                            />  
                    </div>
                </div>
                <div className="w-full mt-5 gap-1 flex justify-center border ">
                    <div onClick={handleSave} className=" border border-[#561d2a65] bg-[#FFB2BE] hover:bg-[#f68193] px-10 h-7 hover:cursor-pointer text-[#561D2A] rounded text-sm flex items-center justify-center duration-200 transform">save</div>
                </div>
                
                {
                    log !== "" &&
                    <div className="w-full mt-5 gap-1 flex justify-center border ">
                        <div onClick={handleSave} className=" hover:underline text-[#561D2A] rounded text-sm flex items-center justify-center duration-200 transform">{log}</div>
                    </div>
                }
                

                <div className="w-full mt-5 gap-1 flex justify-center fixed bottom-5">
                    <div className="h-7 flex flex-col justify-center">
                        <p className="w-full text-gray-500 text-sm font-medium ">More models are coming.</p>
                        {/* <p className="w-full text-gray-500 text-center text-sm ">Waiting for the access to integrate it!</p> */}
                    </div>
                </div>
            </div>
        </div>
    )
}
export async function searchPPLXlegacy(query, token, model) {
    const auth = 'Bearer ' +token
    const options = {
        method: 'POST',
        headers: {
            accept: 'application/json',
            'content-type': 'text/event-stream',
            authorization: auth
        },
        body: JSON.stringify({
            model: model ? model : 'pplx-7b-online',
            messages: [{role: 'system', content: 'Be consistent with your answers.'}, {role: 'user', content: query}],
            stream: true
        })
    }

    try {
        console.log(options);
        const response = await fetch('https://api.perplexity.ai/chat/completions', options);
        const json = await response.json();
        console.log(json);
        let choices
        if(json["choices"]) {
            choices = json["choices"][0]
            return {choices: choices["message"]["content"]};
        }
        return {error: "No choices found"};
    } catch (error) {
        console.error("Error in searchPPLX", error.message);
        return {error: error};
    }
}

export const optionsConstructor = (url, key, model, query) => {
    const auth = 'Bearer ' + key
    return {
        method: "POST",
        url: url,
        headers: {
          accept: 'application/json',
          'content-type': 'application/json',
          authorization: auth
        },
        data: {
          model: model,
          messages: [
            {role: 'system', content: 'Be precise and concise.'},
            {role: 'user', content: query}
          ],
          stream: true
        },
        responseType: 'stream',
      };
}

export const parseLink = (line) => {
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    return line.replace(urlRegex, '<a href="$1" target="_blank" className="text-blue-600">$1</a>');
};
export function store(provdider, models) {
    try {
        const data = JSON.stringify(models);
        localStorage.setItem(provdider, data);
        return true;
    } catch (error) {
        console.error(error);
        return false;
    }
}
export function retrieve(provider) {
    try {
        const data = localStorage.getItem(provider);
        return data ? JSON.parse(data) : null;
    } catch (error) {
        console.error(error);
        return false;
    }
}
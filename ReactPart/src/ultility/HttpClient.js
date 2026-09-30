import axios from "axios";

const BaseURL = process.env.REACT_APP_BASE_URL;

const http = axios.create({
    baseURL: BaseURL,
    responseType:"json"
})

function getHeaders(isSecured) {
    let options = {
        "Content-Type": "application/json",
    }
    if (isSecured) {
        options["Authorization"] = localStorage.getItem("token");
    }
    return options;
}

function GET(url,isSecured=false,params = {}) {
    return http.get(url, {
        headers: getHeaders(isSecured),
        params,
    })
}

function POST(url, data,isSecured=false, params = {}) {
    return http.post(url, data, {
        headers: getHeaders(isSecured),
        params,
    })
}

function PUT(url, data, isSecured=false,params = {}) {
    return http.put(url, data, {
        headers: getHeaders(isSecured),
        params,
    })
}

function DELETE(url,isSecured=false, params = {}) {
    return http.delete(url, {
        headers: getHeaders(isSecured),
        params,
    })
}
function UPLOAD(method,url, data = {}, files = []) {
    return new Promise(function (resolve, reject) {
         //Xmlhttp req here
    const xhr = new XMLHttpRequest();
    const formData = new FormData();

    if (files.length) {
        files.forEach((item, i) => {
        formData.append('images', files[i], files[i].filename);
        })
    }

    for (let key in data) {
        formData.append(key, data[key]);
    }

    xhr.onreadystatechange = () => {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                resolve(xhr.response);
            }
            else {
                reject(xhr.response);
            }
        }
    }
    xhr.open(method, `${BaseURL}${url}?token=${localStorage.getItem('token')}`, true);
    xhr.send(formData);
    })
}

export const HttpClient = {
    GET,
    POST,
    PUT,
    DELETE,
    UPLOAD
}
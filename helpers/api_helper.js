import axios from "axios";

const axiosApi = axios.create({
	baseURL: process.env.NEXT_PUBLIC_API_URL,
	headers: {
		"X-Requested-With": "XMLHttpRequest",
		"Content-Type": "application/json",
		appversion: "1.1",
	},
	responseType: "json",
});

const getToken = () => {
	return "Basic bWFzc2FnZW1ubF9hZG1pbjp6VGQ5IDRlWGkgRDd0aSBVMmVZIFc5b1UgcHpsbA==";
}

export function getWCToken(){
	return "Basic Y2tfNGEzNjMzMThkNmE4NDc5ZTgxMDgzZmQ1NGE4MmRlOTk1Mjg4ZjYwYzpjc18wY2JjM2NjZGM2NzM5YjlmZDU1MjBkNTgyYmY0OWFjZWJjNzQ0ZjE1";
}

export async function get(url, config = {}) {
	if (getToken()) {
		axiosApi.defaults.headers.Authorization = getToken();
	} else if (config && config.token) {
		axiosApi.defaults.headers.Authorization = config.token;
	}
	return await axiosApi
		.get(url, { ...config })
		.then((response) => response.data)
		.catch((error) => error);
}

export async function post(url, data, config = {}, returnFull = false) {
	if (getToken()) {
		axiosApi.defaults.headers.Authorization = getToken();
	} else if (config && config.token) {
		axiosApi.defaults.headers.Authorization = config.token;
	}
	return axiosApi
		.post(url, { ...data }, { ...config })
		.then((response) => (returnFull)? response: response.data)
		.catch((error) => error);
}

export async function multipart_post(url, data) {
	return axios({
		url: process.env.NEXT_PUBLIC_API_URL + url,
		method: "POST",
		data: data,
		headers: {
			"Content-Type": "multipart/form-data",
			Authorization: getToken(),
		},
	})
		.then((response) => response.data)
		.catch((error) => error);
}

export async function put(url, data, config = {}) {
	if (getToken()) {
		axiosApi.defaults.headers.Authorization = getToken();
	} else if (config && config.token) {
		axiosApi.defaults.headers.Authorization = config.token;
	}
	return axiosApi
		.put(url, { ...data }, { ...config })
		.then((response) => response.data)
		.catch((error) => error);
}

export async function del(url, config = {}) {
	if (getToken()) {
		axiosApi.defaults.headers.Authorization = getToken();
	} else if (config && config.token) {
		axiosApi.defaults.headers.Authorization = config.token;
	}
	return await axiosApi
		.delete(url, { ...config })
		.then((response) => response.data)
		.catch((error) => error);
}

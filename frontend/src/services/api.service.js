import axios from "axios";

const commonConfig = {
    headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
    },
};

// You can create a new instance of axios with a custom config.
export default (baseURL) => {
    return axios.create({
        baseURL,
        ...commonConfig,
    });
};


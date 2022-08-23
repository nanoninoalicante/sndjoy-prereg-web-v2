import { $fetch } from "ohmyfetch";

const parse = (str: any) => {
    try {
        return JSON.parse(str);
    } catch (error) {
        return str;
    }
}

const sanitizeTrackingParams = (params: any) => {
    if (!params) return "";
    if (typeof params === 'string') {
      return params;
    }
    return Object.keys(params)
        .map((i) => `${i}-${params[i]}`)
        .join("__");
};


const preRegisterUser = async (
    requestData: { email: any; handle: string; handleType: string },
    runtimeConfig: { public: { primaryApiBaseUrl: any; primaryApiApiKey: any } }
) => {
    console.log("config: ", runtimeConfig.public?.primaryApiBaseUrl);
    if (!requestData.email) {
        throw new Error("missing email");
    }
    if (!requestData.handle) {
        throw new Error("missing handle");
    }
    const body = {
        email: requestData.email,
        handleName: requestData.handle.replace(/^@/i, ""),
        handleType: requestData.handleType
    };
    console.log("request data: ", body);
    const data = await $fetch(
        `${runtimeConfig.public?.primaryApiBaseUrl}/pre/register`,
        {
            method: "POST",
            body,
            parseResponse: JSON.parse,
            headers: {
                "api-hash": runtimeConfig.public?.primaryApiApiKey,
                "api-key": runtimeConfig.public?.primaryApiApiKey,
            },
        }
    ).catch((e) => {
        console.log("error from primary api: ", e.message);
        console.log("error from primary api: ", e.data);
        throw e;
    });
    console.log("response from api: ", data);
    return data;
};
export function usePrimaryApi() {
    return { preRegisterUser, sanitizeTrackingParams, parse };
}

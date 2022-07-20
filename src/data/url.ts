export const URL_FORGOT_PASSWORD = "/forgot-password";
export const URL_SIGNUP = "/signup";
export const URL_LOGIN = "/";
export const URL_HOME = "/";
export const URL_MESSENGER = "/message";
export const URL_PROFILE = "/:id";
export const URL_POSTS = "/:id";
export const URL_VIDEOS = "/:id/channel";
export const URL_SAVED = "/:id/saved";
export const URL_TAGGED = "/:id/tagged";

export const get_url_profile = (id: string) => "/" + id;
export const get_url_posts = (id: string) => "/" + id;
export const get_url_vidoes = (id: string) => "/" + id + "/channel";
export const get_url_saved = (id: string) => "/" + id + "/saved";
export const get_url_tagged = (id: string) => "/" + id + "/tagged";

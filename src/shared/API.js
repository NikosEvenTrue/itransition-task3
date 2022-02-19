import axios from "axios";

const URL = "http://localhost:8080";

class API {
    async getPeople(autorizedData) {
        return (await axios.get(URL + "/",
            {headers: {email: autorizedData.email, pass_word: autorizedData.pass_word}})).data;
    }

    async login(autorizedData, loginData) {
        return (await axios.post(URL + "/login", loginData,
            {headers: {email: autorizedData.email, pass_word: autorizedData.pass_word}})).data;
    }

    async signup(autorizedData, signupData) {
        return (await axios.post(URL + "/signup", signupData,
            {headers: {email: autorizedData.email, pass_word: autorizedData.pass_word}})).data;
    }

    async deletePeople(autorizedData, ids) {
        return (await axios.delete(URL + "/",
            {headers: {email: autorizedData.email, pass_word: autorizedData.pass_word},
                data: ids})).data;
    }

    async setIsBlockedToPeople(autorizedData, isBlocked, ids) {
        return (await axios.patch(URL + "/",
            {isBlocked: isBlocked, ids: ids},
            {headers: {email: autorizedData.email, pass_word: autorizedData.pass_word}}))
            .data;
    }
}

export default new API();
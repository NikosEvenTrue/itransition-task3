export default class SignupData {
    name
    email
    lastActivity
    pass_word

    constructor(name, email, lastActivity, pass_word) {
        this.name = name;
        this.email = email;
        this.lastActivity = lastActivity;
        this.pass_word = pass_word;
    }
}
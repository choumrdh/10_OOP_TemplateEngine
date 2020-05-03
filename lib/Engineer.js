const Empolyee = require("./Employee")
class Engineer extends Empolyee {
    constructor(name, id, email, github){
      super(name, id, email);
        this.github = github;
    }
    getRole(){
        return "Engineer"
    }
    getGithub(){
        return this.github
    }
}






module.exports = Engineer




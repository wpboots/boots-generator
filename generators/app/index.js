var generators = require('yeoman-generator');

module.exports = generators.Base.extend({
    constructor: function () {
        generators.Base.apply(this, arguments);
        this._appname = this.appname.replace(/\w\S*/g, function (s) {
            return s.charAt(0).toUpperCase() + s.substr(1).toLowerCase();
        });
        //this.config.save();
    },
    prompting: function () {
        var done = this.async();
        this.prompt([{
                type    : 'list',
                name    : 'option',
                message : 'Yo! What would you like to do?',
                choices : [
                    {
                        value: 'extension',
                        name: 'Create an extension for boots'
                    }, {
                        value: 'exit',
                        name: 'Nothing'
                    }
                ],
                default : 0
        }], function (answers) {
            if(answers.option != 'exit')
                this.log('All right! Lets do this :)');

            switch(answers.option)
            {
                case 'extension':
                    this.composeWith('boots:extend');
                break;
                default:
                    this.log('Goodbye!');
                break;
            }
            done();
        }.bind(this));
    }
});
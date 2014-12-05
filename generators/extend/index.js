var generators = require('yeoman-generator');

module.exports = generators.Base.extend({
    constructor: function () {
        generators.Base.apply(this, arguments);
        this._appname = this.appname.replace(/\w\S*/g, function (s) {
            return s.charAt(0).toUpperCase() + s.substr(1).toLowerCase();
        });
        this.config.save();
    },
    prompting: function () {
        var done = this.async();
        this.prompt([{
                type    : 'input',
                name    : 'name',
                message : 'Name',
                default : this._appname
        }, {
                type    : 'input',
                name    : 'version',
                message : 'Version',
                default : 'dev-master'
        }, {
                type    : 'input',
                name    : 'description',
                message : 'Description',
                default : this._appname
        }/*, {
                type    : 'confirm',
                name    : 'requires',
                message : 'Require any other extension?',
                default : false
        }*/, {
                type    : 'input',
                name    : 'home',
                message : 'Extension homepage url',
        }, {
                type    : 'input',
                name    : 'vendor',
                message : 'Vendor (GitHub username)',
                store   : true
        }, {
                type    : 'input',
                name    : 'author',
                message : 'Your name (as author)',
                store   : true
        }, {
                type    : 'input',
                name    : 'email',
                message : 'Your email (as author)',
                store   : true
        }, {
                type    : 'input',
                name    : 'authorurl',
                message : 'Your homepage (as author)',
                store   : true
        }, {
                type    : 'confirm',
                name    : 'proceed',
                message : 'All done! Proceed with generator?',
                default : true
        }], function (answers) {
            // Extension name
            this._extNice = answers.name;
            this._extName = this._extNice.toLowerCase();
            this._extNameCamel = this._.camelize(this._extName);
            var re = /([A-Z]+|[0-9]+)/g;
            this._extDir = this._extNameCamel.replace(re, '-$1')
            .toLowerCase();
            this._extPath = 'extend/' + this._extDir + '/';
            this._extClass = this._extNameCamel.charAt(0).toUpperCase()
            + this._extNameCamel.slice(1);
            // Extension version
            this._extVersion = answers.version;
            // Extension description
            this._extDescription = answers.description;
            // Cosmetics
            this._extHome = answers.homepage;
            this._extVendor = answers.vendor;
            this._extAuthor = answers.author;
            this._extAuthorUrl = answers.authorurl;
            this._extEmail = answers.email;

            this._proceed = answers.proceed;

            done();
        }.bind(this));
    },
    writing: function () {
        if(!this._proceed) return;
        var data = {
            nice: this._extNice,
            name: this._extClass,
            version: this._extVersion,
            description: this._extDescription,
            homepage: this._extHome,
            vendor: this._extVendor,
            author: this._extAuthor,
            authorurl: this._extAuthorUrl,
            email: this._extEmail,
            year: new Date().getFullYear()
        };
        this.fs.copyTpl(
            this.templatePath('.gitignore'),
            this.destinationPath(this._extPath + '.gitignore'),
            data
        );
        this.fs.copyTpl(
            this.templatePath('LICENSE.txt'),
            this.destinationPath(this._extPath + 'LICENSE.txt'),
            data
        );
        this.fs.copyTpl(
            this.templatePath('README.md'),
            this.destinationPath(this._extPath + 'README.md'),
            data
        );
        this.fs.copyTpl(
            this.templatePath('composer.json'),
            this.destinationPath(this._extPath + 'composer.json'),
            data
        );
        this.fs.copyTpl(
            this.templatePath('boots.json'),
            this.destinationPath(this._extPath + 'boots.json'),
            data
        );
        this.fs.copyTpl(
            this.templatePath('index.php'),
            this.destinationPath(this._extPath + 'index.php'),
            data
        );
        this.fs.copyTpl(
            this.templatePath('api.php'),
            this.destinationPath(this._extPath + 'api.php'),
            data
        );
    }
});
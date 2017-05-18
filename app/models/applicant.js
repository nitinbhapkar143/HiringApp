var mongoose    = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');
var Schema      = mongoose.Schema;

// Defines the applicant schema
var applicantSchema = new Schema({
    firstname: {type: String, required: true},
    lastname: {type: String, required: true},
    gender: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    mobile: {type: Number, required: true, unique: true},
    status: {type: String, required: true},
    resume: {type: Schema.Types.Mixed, required: true},
    createdAt: {type: Date, default: Date.now},    
});

// Sets the createdAt parameter equal to the current time
applicantSchema.pre('save', function(next){
    now = new Date();
    if (!this.createdAt) {
        this.createdAt = now;
    }
    next();
});

// Apply the uniqueValidator plugin to userSchema. 
applicantSchema.plugin(uniqueValidator);

// Exports the applicantSchema for use elsewhere.
module.exports = mongoose.model('applicant', applicantSchema);
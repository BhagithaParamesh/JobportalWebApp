const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const adminschema = new Schema({
    jobid:String,
    jobtitle:String,
    jobposteddate:String,
    role:String,
    responsibility:String,
    companyname:String,
    experience:String,
    salaryrange:String,
    noofpositions:String,
    location:String,
    skills:String,
    qualifications:String,
    degree:String,
    companyinfo:String,
    employmenttype:String,
    industrytype:String,
    searchkeyword:String,
    jobdescription:String
});

module.exports = mongoose.model('admin', adminschema,'admin'); 
//mogoose.model(modelname,schemaname,clustercollection  name created in atlas)


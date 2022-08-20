// const mongoose = require('mongoose')
// const projectSchema = new mongoose.Schema({

//     projectname: {
//         type: String,
//         unique: true
//     },
//     description: {
//         type: String
//     },
//     assignto: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Users' }]
//     ,
//     datestart: {
//         type: String
//     },
//     deadline: {
//         type: String
//     }
// }, { timestamps: true })

// const Projects = mongoose.model('Projects', projectSchema);
// module.exports = Projects



const mongoose = require("mongoose");

const projects = mongoose.model(
  "projects",
  new mongoose.Schema({
    projectname: String,
    description: String,
    assignTo: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user"
      }
    ]
  })
);

module.exports = projects;

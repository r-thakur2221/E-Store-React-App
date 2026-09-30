const noteModel = require("./noteModel");

function mapNoteData(noteData,reqData){
    if(reqData.title){
        noteData.title=reqData.title
    }
    if(reqData.text){
        noteData.text=reqData.text
    }
    if(reqData.user){
        noteData.user=reqData.user
    }

}

function save(data) {
    const newNote = new noteModel({});

    mapNoteData(newNote,data)
    return newNote.save()
}

function find(condition) {
    return noteModel.find(condition)
                    .sort({ _id: -1 })
                    .exec()
}

function update(id, data) {
        return new Promise(function (resolve, reject) {
        noteModel.findById(id, function (err, note) {
            if (err) {
                return reject(err);
            }
            if (!note) {
                return reject({
                    msg: "Note Not Found",
                    status: 404
                })
            }
            mapNoteData(note,data)
            note.save(function (err, updated) {
                if (err) {
                    return reject(err);
                }
                resolve(updated)
            })
        })
    })
}


function remove(id) {
        return new Promise(function (resolve, reject) {
        noteModel.findById(id, function (err, note) {
            if (err) {
                return reject(err);
            }
            if (!note) {
                return reject({
                    msg: "Note Not Found",
                    status: 404
                })
            }
            note.remove(function (err, removed) {
                if (err) {
                    return reject(err);
                }
                resolve(removed);
            })
        })
    })
}


module.exports = {
    save,
    find,
    update,
    remove
}
const pool = require('../helpers/databaseConnection');
const { json } = require('body-parser');


const get_user_byID = async (req, res, next) =>{
    try{
        console.log(req.params.id)
        const sqlQuery=`SELECT * FROM users WHERE id=${req.params.id};`
        
        const answer = await pool.query(sqlQuery, req.params.userID)
        if(answer.length){
           return res.status(200).json(answer)
        }
        res.status(404).send({message:"user not found"})

    }catch(err){
        res.status(500).send(err.message)
    }
}

const user_post = async (req, res)=>{
    try{
        const {id, username, email, roles} =req.body;
        var sqlQuery='START TRANSACTION;\n';
        if(username && email){
            if(id){
                sqlQuery+=`INSERT INTO users (id, username, email) VALUES(${id}, "${username}", "${email}");\n`;
            }else{
                sqlQuery+=`INSERT INTO users (username, email) VALUES( "${username}", "${email}");\n`;
            }
        }else{
            return res.status(400).send({message:'invalid input'})
        }
        sqlQuery+="COMMIT;"
   
        await pool.query(sqlQuery)
        res.status(200).send({message:'user added successfully'})
    }catch(err){
        res.status(500).send(err.message)
    }
}

const user_put = async (req, res)=>{ 
    const {username, fullname, roles} =req.body;
    id = req.params.userID;
    try{
        // var sqlQuery='START TRANSACTION;\n';
        var sqlQuery=''
        if(username && fullname){
            sqlQuery+=`REPLACE INTO users (id, username, fullname) VALUES(?, ?, ?);\n`          
        }else{
            return res.status(404).send({message:'invalid input'})
        }
        if(roles){
            // sqlQuery+=`DELETE FROM user_roles WHERE user_id=${id};`
            roles.forEach(role => {
                sqlQuery+=`REPLACE INTO user_roles (user_id, role_id) VALUES(${id},${role});\n`
            });
        }
        // sqlQuery+="COMMIT;"

        await pool.query(sqlQuery, [id, username, fullname])
        res.status(200).send({message: `update successfull`})
    }catch(err){
        res.status(500).send(err.message)
    }
}

//If the user exists they will be changed to match the new values. Also the roles are updated.
const user_patch = async (req, res)=>{
    const {newid, roles} =req.body;
    var values4update='';
    try{
        Object.keys(req.body).forEach(key => {
            if(key!='roles')
                values4update += `${key}=\"${req.body[key]}\",`
        });
        values4update = values4update.slice(0, -1); //remove the last unecesary comma
        var sqlQuery= 'UPDATE users SET ' + values4update + ' WHERE id =' + req.params.userID+';'
       
        if(roles){ //instructions said overwrite, so I delete everything and then add new roles
            sqlQuery+=`DELETE FROM user_roles WHERE user_id=${req.params.userID};`
            //and now isnert the new roles
            id = newid ? newid : req.params.userID;
            roles.forEach(role => {
                sqlQuery+=`INSERT INTO user_roles (user_id, role_id) VALUES(${id},${role});\n`
            });
        }
        await pool.query(sqlQuery)
        res.status(200).send({message: `update successfull`})
    }catch(err){
        res.status(500).send(err.message)
    }
}

//we use: ON DELETE CASCADE , so the delete from roles would be unecessary in theory. Am leaving it here tho. no harm
const user_delete = async (req, res)=>{
    try{
        const sqlQuery= `DELETE FROM users WHERE id=?; DELETE FROM user_roles WHERE user_id=`+req.params.userID
        await pool.query(sqlQuery, req.params.userID)
        res.status(200).send({message: `deletion successfull`})
    }catch(err){
        res.status(500).send(err.message)
    }
}

const get_all_users = async (req, res)=>{
    try{
        const sqlQuery= `
        SELECT u.id, u.username, u.fullname, GROUP_CONCAT(r.rolename) AS user_roles
        FROM users u
        INNER JOIN user_roles ur ON u.id = ur.user_id
        INNER JOIN roles r ON r.id = ur.role_id
        GROUP BY u.id, u.username, u.fullname;`
        const answer = await pool.query(sqlQuery)
        res.status(200).json(answer)
    }catch(err){
        res.status(500).send(err.message)
    }
}




module.exports={
    get_user_byID,
    user_post
}
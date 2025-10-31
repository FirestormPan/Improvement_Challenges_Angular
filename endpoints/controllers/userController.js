const pool = require('../helpers/connectMySQL');
const bcrypt = require('bcryptjs');

const get_user_by_Id = async (req, res, next) => {
    try {
        const sqlQuery = 'SELECT * FROM users WHERE id_user = ?';
        const result = await pool.query(sqlQuery, [req.params.id]);

        if (!result || result.length === 0) {
            return res.status(404).send({ message: "user not found" });
        }
        
        return res.status(200).json(result[0]);
    } catch (err) {
        console.error('Error:', err);
        return res.status(500).send('Internal server error');
    }
}

// creates a new user. pfp is not included for now. User can add it later via patch.
const user_post = async (req, res)=>{
    try{
        const {id, username, email, password, roles} = req.body;

       // Input validation
        if (!username || typeof username !== 'string' || username.length > 50) {
            return res.status(400).send({ message: 'Invalid username' });
        }
        if (!email || typeof email !== 'string' || !email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
            return res.status(400).send({ message: 'Invalid email' });
        }
        if(!password || typeof password !== 'string' || password.length < 4){
            return res.status(400).send({ message: 'Invalid password. It must be at least 4 characters long.' });
        }
        if (id && (!Number.isInteger(id) || id < 1)) {
            return res.status(400).send({ message: 'Invalid id' });
        }

        //hash the password before storing it
        const salt = bcrypt.genSaltSync(2);
        const hashedPassword = bcrypt.hashSync(password, salt);

        var sqlQuery = id
        ? 'INSERT INTO users (id_user, username, hashed_password, email) VALUES (?, ?, ?, ?)'
        : 'INSERT INTO users (username, hashed_password, email) VALUES (?, ?, ?)';
        const params = id ? [id, username, hashedPassword, email] : [username, hashedPassword, email];
        
        await pool.query(sqlQuery, params)

        res.status(200).send({message:'user added successfully'})
    }catch(err){
        res.status(500).send(err.message)
    }
}

//If the user exists they will be changed to match the new values. Also the roles are updated.
const user_patch = async (req, res)=>{
    try{
        var values4update = req.body;
        delete values4update.roles;

        var sqlQuery= 'UPDATE users SET ? WHERE id_user = ? ;'
       
        // if(roles){ //instructions said overwrite, so I delete everything and then add new roles
        //     sqlQuery+=`DELETE FROM user_roles WHERE user_id=${req.params.userID};`
        //     //and now isnert the new roles
        //     id = newid ? newid : req.params.userID;
        //     roles.forEach(role => {
        //         sqlQuery+=`INSERT INTO user_roles (user_id, role_id) VALUES(${id},${role});\n`
        //     });
        // }
        await pool.query(sqlQuery, [ values4update, req.params.id]) //leitourgei giati mysql2 can automatically convert objects into key = value pairs safely.
        res.status(200).send({message: `update successfull`})
    }catch(err){
        res.status(500).send(err.message)
    }
}

const user_delete = async (req, res)=>{
    const id = req.params.id;
    try{
        const sqlQuery= `DELETE FROM users WHERE id_user=?;`
        //  DELETE FROM user_roles WHERE user_id=`+req.params.id
        await pool.query(sqlQuery,[id])
        res.status(200).send({message: `deletion successfull`})
    }catch(err){
        res.status(500).send(err.message)
    }
}

// const get_all_users = async (req, res)=>{
//     try{
//         const sqlQuery= `
//         SELECT u.id, u.username, u.fullname, GROUP_CONCAT(r.rolename) AS user_roles
//         FROM users u
//         INNER JOIN user_roles ur ON u.id = ur.user_id
//         INNER JOIN roles r ON r.id = ur.role_id
//         GROUP BY u.id, u.username, u.fullname;`
//         const answer = await pool.query(sqlQuery)
//         res.status(200).json(answer)
//     }catch(err){
//         res.status(500).send(err.message)
//     }
// }

// Authenticate user by username and password. If multiple users have the same username, only the first found is checked.
const authenticate_user = async (req, res) => {
    const { username, password } = req.body;
    try {
        const sqlQuery = 'SELECT * FROM users WHERE username = ?';
        const [rows] = await pool.query(sqlQuery, [username]); // destructure
        if (rows.length === 0) {
            return res.status(404).send({ message: 'User not found' });
        }

        const user = rows[0];

        const isPasswordValid = bcrypt.compareSync(password, user.hashed_password);

        // Return authentication result. later we can expand this to return a token or user info
        return res.status(200).json({ authenticated: isPasswordValid });
    } catch (err) {
        console.error('Error during authentication:', err);
        return res.status(500).send({ message: 'Internal server error' });
    }
};



module.exports={
    get_user_by_Id,
    // user_put,
    user_patch,
    user_post,
    user_delete,
    authenticate_user
}
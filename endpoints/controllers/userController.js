const pool = require('../helpers/connectMySQL');
const bcrypt = require('bcryptjs');
const userService = require('../services/userService');


const getUserById = async (req, res) => {
  try {
    const id = req.params.id;
    // Validate ID
    if (!id || isNaN(id) || id < 1) {
      return res.status(400).json({ message: 'Invalid user ID' });
    }

    const user = await userService.getUserById(id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    return res.status(200).json(user);

  } catch (err) {
    console.error('Error:', err);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

const getUserByName = async (req, res, next) => {
    try {
        const username = req.params.name.trim();
        if (!username) {
            return res.status(400).send({ message: "invalid username" });
        }
        const user = await userService.getUserByName(username);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        return res.status(200).json(user);
    } catch (err) {
        console.error('Error:', err);
        return res.status(500).send('Internal server error');
    }
};

// creates a new user. pfp is not included for now. User can add it later via patch.
const createUser =  async (req, res) => {
  try {
    const { id, username, email, password } = req.body;

    // Basic input validation (controller-level)
    if (!username || typeof username !== 'string' || username.length > 50) {
      return res.status(400).json({ message: 'Invalid username' });
    }
    if (!email || typeof email !== 'string' ||
        !email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      return res.status(400).json({ message: 'Invalid email' });
    }
    if (!password || typeof password !== 'string' || password.length < 4) {
      return res.status(400).json({
        message: 'Invalid password. It must be at least 4 characters long.'
      });
    }
    if (id && (!Number.isInteger(id) || id < 1)) {
      return res.status(400).json({ message: 'Invalid id' });
    }

    // Delegate actual user creation to the service
    await userService.createUser({ id, username, email, password });

    return res.status(201).json({ message: 'User added successfully' });

  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

//If the user exists they will be changed to match the new values. Also the roles are updated.
const user_patch = async (req, res)=>{
  try{
    var values4update = req.body;

    var sqlQuery= 'UPDATE users SET ? WHERE id = ? ;'
    await pool.query(sqlQuery, [ values4update, req.params.id]) //leitourgei giati mysql2 can automatically convert objects into key = value pairs safely.

    res.status(200).send({message: `update successfull`})
  }catch(err){
    res.status(500).send(err.message)
  }
}

const deleteUserByUsername = async (req, res) => {
  try {
    const username = req.params.username?.trim();

    // Validate username
    if (!username || typeof username !== "string") {
      return res.status(400).json({ message: "Invalid username" });
    }

    const deleted = await userService.deleteUserByUsername(username);

    if (!deleted) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json({ message: "Deletion successful" });

  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// Authenticate user by username and password. If multiple users have the same username, only the first found is checked.
const authenticate_user = async (req, res) => {
  const { username, password } = req.body;
  try {
      let user = await verifyUserCredentials(username, password);

      if(!user) throw new Error('user credentials did not match')

      // Return user info. later we can learn about returning a token 
      return res.status(200).json(user);
  } catch (err) {
      console.error('Error during authentication:', err);
      return res.status(401).send({ message: err.message });
  }
};

const changePassword = async (req, res) =>{
  try{
    const { username, password, newPassword } = req.body;
    
    if (!username || !password || !newPassword) {
      return res.status(400).json({ message: "Missing required fields" });
    }
    // check the old password before changing it
    let user = await verifyUserCredentials(username, password)
    if(!user) return res.status(401).send({ message: 'Incorrect current password' });

    const result = await userService.changePassword(username, newPassword);
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "User not found" });
    }
    
    res.status(200).send({message: `update successfull`})

    } catch(err){
        res.status(500).send({ message: 'Internal server error' });
    }
}

//todo check seperately for email and name  
const checkAvailability = async (req, res) => {
  try {
    const { username, email } = req.query;
    // Must request at least one field
    if (!username && !email) {
      return res.status(400).json({ message: "Provide username or email" });
    }

    const result = {};

    // Check username availability
    if (username) {
      const taken = await userService.usernameExists(username);
      result.username = !taken;
    }

    // Check email availability
    if (email) {
      const taken = await userService.emailExists(email);
      result.email = !taken;
    }

    // If either field is not available, return 409
    if (result.username === false || result.email === false) {
      return res.status(409).json({
        available: false,
        details: result,
      });
    }

    return res.status(200).json({
      available: true,
      details: result,
    });

  } catch (err) {
    console.error("Error checking availability:", err);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const uploadPfp = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }
    const filePath = `/uploads/${req.file.filename}`;
    await userService.uploadPfp(req.body.userId, filePath);
    return res.json({
      success: true,
      url: filePath
    });

  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Upload failed" });
  }
};

const getUserContracts = async (req, res) => {
  const {name} = req.body;
  const user = await userService.getUserByName(name);
  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }
  const contracts = await userService.getUserContracts(user.id);
  res.json(contracts);
};

const searchUsersByName = async (req, res) => {
  try {
    const searchTerm = req.params.term?.trim();
    const filtered = await userService.searchUsersByName(searchTerm);
    return res.json(filtered);
  } catch (err) {
    console.error('Error searching users:', err);
    return res.status(500).json({ message: 'Internal server error' });
  }
};




//HELPER FUNCTIONS
//==============================
/**
 * Checks the database for matching password and username
 * @param {*} username 
 * @param {*} password 
 * @returns the user object or null
 */
const verifyUserCredentials = async (username, password) => {
  const user = await userService.getUserByName(username);
  if (!user) return null;
  const isPasswordValid = bcrypt.compareSync(password, user.hashed_password);
  return isPasswordValid ? user : null;
};


module.exports={
    getUserById,
    getUserByName,
    user_patch,
    createUser,
    deleteUserByUsername,
    authenticate_user,
    changePassword,
    getUserContracts,
    checkAvailability,
    uploadPfp,
    searchUsersByName
}
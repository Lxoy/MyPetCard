import db from "../database.js";

export const checkEmail = (email) => {
  const checkEmailSql = "SELECT id FROM users WHERE email = ?";
  return new Promise((resolve, reject) => {
    db.query(checkEmailSql, [email], (error, results) => {
      if (error) reject(error);
      resolve(results);
    });
  });
};

export const checkUsername = (username) => {
  const checkUsernameSql = "SELECT id FROM users WHERE username = ?";
  return new Promise((resolve, reject) => {
    db.query(checkUsernameSql, [username], (error, results) => {
      if (error) reject(error);
      resolve(results);
    });
  });
};

export const getUserById = (id) => {
  const getUserSql = "SELECT * FROM users WHERE id = ?";
  return new Promise((resolve, reject) => {
      db.query(getUserSql, [id], (error, result) => {
          if (error) reject(error);
          resolve(result);
      });
  });
}

export const getUserByEmail = (email) => {
  const getUserSql = "SELECT * FROM users WHERE email = ?";
  return new Promise((resolve, reject) => {
      db.query(getUserSql, [email], (error, result) => {
          if (error) reject(error);
          resolve(result);
      });
  });
}

export const insertNewUser = (username, email, hashedPassword) => {
  const createUserSql = "INSERT INTO users (username, email, password, provider) VALUES (?, ?, ?, 'local')";
  return new Promise((resolve, reject) => {
      db.query(createUserSql, [username, email, hashedPassword], (error, result) => {
          if (error) reject(error);
          resolve(result);
      });
  });
}

export const insertNewUserGoogleLogin = (username, first_name, last_name, email, google_id) => {
  const createUserSql = "INSERT INTO users (username, email, first_name, last_name, password, google_id, provider) VALUES (?, ?, ?, ?, NULL, ?,'google')";
  return new Promise((resolve, reject) => {
      db.query(createUserSql, [username, email, first_name, last_name, google_id], (error, result) => {
          if (error) reject(error);
          resolve(result);
      });
  });
}

export const updateUserInfo = (userId, updatedFields) => {
  const allowedFields = [ 'username', 'email', 'first_name', 'last_name', 'phone_number' ];
  const setParts = [];
  const values = [];

  allowedFields.forEach(field => {
    const value = updatedFields[field];
    if (value !== undefined && value !== null) {
      setParts.push(`${field} = ?`);
      values.push(value);
    }
  });

  if (setParts.length === 0) {
    return Promise.resolve({ message: 'No data for update.' });
  }

  const setClause = setParts.join(', ');
  const updateSql = `UPDATE users SET ${setClause} WHERE id = ?`;
  values.push(userId);

  return new Promise((resolve, reject) => {
    db.query(updateSql, values, (error, result) => {
      if (error) return reject(error);
      resolve(result);
    });
  });
};


export const insertNewPet = (name, species, breed, gender, date_of_birth, ownerId) => {
  const insertSql = "INSERT INTO pets (name, species, breed, gender, date_of_birth, owner_id) VALUES (?, ?, ?, ?, ?, ?)";
  
  return new Promise((resolve, reject) => {
    db.query(insertSql, [name, species, breed, gender, date_of_birth, ownerId], (error, result) => {
      if (error) return reject(error);
      resolve(result);
    });
  });
};

export const getPetsByOwnerId = (ownerId) => {
  const getPetsSql = "SELECT * FROM pets WHERE owner_id = ?";
  
  return new Promise((resolve, reject) => {
    db.query(getPetsSql, [ownerId], (error, results) => {
      if (error) return reject(error);
      resolve(results); // vraća sve ljubimce koji pripadaju vlasniku
    });
  });
};


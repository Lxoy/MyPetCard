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
  const getUserSql = "SELECT id, username, email FROM users WHERE id = ?";
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

export const insertNewUserGoogleLogin = (username, email, google_id) => {
  const createUserSql = "INSERT INTO users (username, email, password, google_id, provider) VALUES (?, ?, NULL, ?,'google')";
  return new Promise((resolve, reject) => {
      db.query(createUserSql, [username, email, google_id], (error, result) => {
          if (error) reject(error);
          resolve(result);
      });
  });
}

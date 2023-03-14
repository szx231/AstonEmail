const fs = require('fs');
var bodyParser = require('body-parser');
let rawdata = fs.readFileSync('db.json');
let mails = JSON.parse(rawdata);
const express = require('express');
const cors = require('cors');
const bcrypt = require('bcrypt');
const cookieParser = require('cookie-parser');
const app = express();
const PORT = process.env.PORT || 5000;
var Cookies = require('cookies');
const session = require('express-session');
const { v4: uuidv4 } = require('uuid');
require('dotenv').config();
const CryptoJS = require('crypto-js');

app.use(cors());
app.use(bodyParser.json({ type: '*/*' }));
app.use(cookieParser());

const { Client } = require('pg');

let dbConnectErr = false;

const client = new Client({
  user: 'admin',
  host: '127.0.0.1',
  database: 'postgres',
  password: 'root',
  port: 5432,
});
client.connect(function (err) {
  if (err) {
    dbConnectErr = true;
  }
});

const checkCookies = async (req, res, next) => {
  const userIsAuth = req.cookies.sessionId;
  try {
    if (userIsAuth) {
      const token = userIsAuth;
      const query = `SELECT * FROM accounts WHERE token = '${token}'`;
      const result = await client.query(query);

      const userID = result.rows[0].user_id;

      const role = await client.query(`SELECT * FROM roles WHERE role_id = '${userID}'`);
      if (role) {
        const { role_name } = role.rows[0];
        const { username, surname, password } = result.rows[0];
      }

      next();
    } else {
      res.status(403).send('Unauthorized');
    }
  } catch (error) {
    console.log(error, 'cookie');
    res.status(500).send('Internal server error');
  }
};

const checkRoles = async (req, res, next) => {
  const token = req.cookies.sessionId;

  const query = `SELECT user_id FROM accounts WHERE token = '${token}'`;

  const result = await client.query(query);
  const userID = result.rows[0].user_id;

  const role = await client.query(`SELECT * FROM roles WHERE role_id = '${userID}'`);

  const { role_name } = role.rows[0];

  if (role_name === 'admin') {
    next();
  }

  if (role_name === 'user') {
    res.status(403).send('Нет прав для доступа к этой странице!');
  }
};

app.get('/api/userIsAuth', checkCookies, async (req, res) => {
  const userIsAuth = req.cookies.sessionId;
  try {
    if (userIsAuth) {
      const token = userIsAuth;
      const query = `SELECT * FROM accounts WHERE token = '${token}'`;
      const result = await client.query(query);

      const userID = result.rows[0].user_id;
      const role = await client.query(`SELECT * FROM roles WHERE role_id = '${userID}'`);

      if (role) {
        console.log(role, 'role');
        const { role_name } = role.rows[0];
        const { username, surname, email } = result.rows[0];

        const user = {
          username,
          surname,
          email,
          role_name,
        };

        res.status(200).send(user);
      }
    } else {
      res.status(403).send('Unauthorized');
    }
  } catch (error) {
    console.log(error);
    res.status(500).send('Internal server error');
  }
});

const sortMails = (mails) => {
  return mails.sort((mail) => {
    return mail.read ? 1 : -1;
  });
};

const filterMailsCategory = (mails, category) => {
  const filtered = mails.filter((el) => {
    const item = !el.folder ? 'Входящие' : el.folder;
    return item === category;
  });
  return filtered;
};

const filterInput = (arr, inputValue) => {
  try {
    const inputLowerCase = inputValue.toLowerCase();
    return arr.filter((el) => {
      if (
        inputLowerCase === el.author.name.slice(0, inputValue.length).toLowerCase() ||
        inputLowerCase === el.author.surname.slice(0, inputValue.length).toLowerCase() ||
        inputLowerCase === el.author.email.slice(0, inputValue.length).toLowerCase() ||
        inputLowerCase === el.text.slice(0, inputValue.length).toLowerCase() ||
        inputLowerCase === el.title.slice(0, inputValue.length).toLowerCase()
      ) {
        return el;
      }
    });
  } catch (error) {
    console.log(error);
  }
};

app.get('/api/logOut', (req, res) => {
  res.clearCookie('sessionId');
  res.status(200).send('logOut');
});

app.get('/api/emails', checkCookies, (req, res) => {
  const { role } = req;

  try {
    const { category, search } = req.query;

    const filterMails = filterMailsCategory(mails, category);
    const sortArr = sortMails(filterMails);
    const filterOnInput = filterInput(sortArr, search);
    res.status(200).send(filterOnInput);
  } catch (error) {
    res.status(500).send('Internal server error');
  }
});

app.get('/api/email', async (req, res) => {
  try {
    const { user } = req.query;

    const decrypt = () => {
      const normalizedString = user.replace(/ /g, '+');

      const bytes = CryptoJS.AES.decrypt(normalizedString, 'ASTON');
      const originalText = bytes.toString(CryptoJS.enc.Utf8);
      return originalText;
    };

    const email = decrypt(user);
    const userInDataBase = mails.find((el) => el.author.email === email);

    setTimeout(() => {
      res.status(200).send(userInDataBase);
      res.end();
    }, 1000);
  } catch (error) {
    res.status(500).send('Internal server error');
  }
});

app.post('/api/authorization/signIn', async (req, res) => {
  try {
    const { email, password: passwordClient } = req.body.user;

    const query = `SELECT * FROM accounts WHERE email = '${email}'`;
    const userExist = await client.query(query);
    if (!userExist.rows[0]) {
      setTimeout(() => res.status(400).send(`Пользовател ${email} не найден!`), 1000);
    }

    if (userExist.rows[0]) {
      const { user_id, username, surname, password, email, token } = userExist.rows[0];
      const validatePassword = bcrypt.compareSync(passwordClient, password);

      if (!validatePassword) {
        setTimeout(() => res.status(400).send('Не верный пароль!'), 1000);
      }

      if (validatePassword) {
        const role = await client.query(`SELECT * FROM roles WHERE role_id = '${user_id}'`);

        res.cookie('sessionId', token, { httpOnly: true, maxAge: 1000 * 60 * 60 * 24 });
        const { role_name } = role.rows[0];
        setTimeout(() => res.status(200).send({ username, surname, email, role_name }), 1000);
      }
    }
  } catch (error) {
    console.log(error);
  }
});

app.post('/api/authorization/signUp', async (req, res) => {
  console.log('signUp');
  try {
    const token = uuidv4();

    const { name, surname, password, email, role } = req.body.user;

    const queryUserExist = `SELECT * FROM accounts WHERE email = '${email}'`;
    const userExist = await client.query(queryUserExist);

    if (userExist.rows[0]) {
      setTimeout(() => res.status(400).send(`Пользователь ${email} уже существет!`), 1000);
    }

    if (!userExist.rows[0]) {
      const hashPassword = bcrypt.hashSync(password, 2);

      const query = `
        INSERT INTO accounts (username, surname, password, email, created_on, token) VALUES ('${name}', '${surname}', '${hashPassword}', '${email}', NOW(), '${token}');
        INSERT INTO roles (role_name) VALUES ('${role}');
        INSERT INTO account_roles (user_id, role_id, grant_date) VALUES ((SELECT user_id FROM  accounts ORDER BY user_id DESC LIMIT 1), (SELECT role_id FROM  roles ORDER BY role_id DESC LIMIT 1), NOW());
    `;

      const addUserDataBase = await client.query(query);

      const user = {
        name,
        surname,
        email,
        role,
      };

      res.cookie('sessionId', token, { httpOnly: true, maxAge: 1000 * 60 * 60 * 24 });

      setTimeout(() => res.status(200).send(user), 1000);
    }
  } catch (error) {
    console.log(error);
    res.status(500).send('Internal server error');
  }
});

app.post('/api/addFavorite', async (req, res) => {
  const { email } = req.body;

  try {
    if (email) {
      const token = req.cookies.sessionId;
      const query = `SELECT * FROM accounts WHERE token = '${token}'`;
      const result = await client.query(query);

      const userID = result.rows[0].user_id;

      const emailIsExist = `SELECT * FROM favorite WHERE email = '${email}'`;

      const checkIfEmailExist = await client.query(emailIsExist);

      if (checkIfEmailExist.rows[0]) {
        await client.query(`DELETE FROM favorite WHERE email = '${email}'`);
        res.status(200).send({ text: 'Удалено из избранных!' });
      } else {
        await client.query(`
        INSERT INTO favorite (user_id, email) VALUES ('${userID}', '${email}');
        `);
        res.status(200).send({ text: 'Добавлено в избранное!' });
      }
    }
  } catch (error) {
    res.status(500).send('Internal server error');
  }
});

app.get('/api/getFavorite', async (req, res) => {
  try {
    const token = req.cookies.sessionId;
    const queryID = `SELECT * FROM accounts WHERE token = '${token}'`;
    const resultID = await client.query(queryID);

    const ID = resultID.rows[0].user_id;

    const query = `SELECT email FROM favorite WHERE user_id = '${ID}'`;
    const result = await client.query(query);

    const normalData = result.rows.reduce((acc, item) => {
      acc.push(item.email);
      return acc;
    }, []);

    const response = mails.filter((el) => normalData.includes(el.author.email));
    res.status(200).send(response);
  } catch (error) {
    console.log(error, 'getFavorite');
  }
});

app.get('/api/featureFlag', async (req, res) => {
  try {
    const flag = true;

    res.status(200).send(flag);
  } catch (error) {
    console.log(error, 'featureFlag');
  }
});

app.delete('/', (req, res) => {
  // Your code for DELETE requests
});

app.get('/api/getUsersInfo', checkRoles, async (req, res) => {
  try {
    const query = `SELECT user_id, username,surname,email,created_on FROM accounts`;
    const result = await client.query(query);

    if (result.rows[0]) {
      const { user_id, username, surname, email, created_on } = result.rows;

      res.status(200).send(result.rows);
    }

    if (!result.rows[0]) {
      res.status(200).send('Пока нет зарегистрированных пользователей!');
    }
  } catch (error) {
    res.status(500).send('Internal server error');
  }
});

app.get('/api/logInformation', async (req, res) => {
  try {
    const token = req.cookies.sessionId;
    console.log(token, 'token');
    const queryID = `SELECT user_id FROM accounts WHERE token = '${token}'`;
    const resultID = await client.query(queryID);

    const ID = resultID.rows[0].user_id;

    const checkExistQuery = `SELECT user_id FROM lastconnect WHERE user_id = '${ID}'`;

    const checkRequest = await client.query(checkExistQuery);

    if (checkRequest.rows[0]) {
      await client.query(`DELETE FROM lastconnect WHERE user_id = '${ID}'`);
      await client.query(`INSERT INTO lastconnect (user_id, last_login) VALUES ('${ID}', NOW())`);
    } else {
      await client.query(`INSERT INTO lastconnect (user_id, last_login) VALUES ('${ID}', NOW())`);
    }

    res.status(200).send('ok');
  } catch (error) {
    res.status(500).send('Internal server error');
  }
});

app.listen(PORT, () => {
  console.log('Server is running on port 5173');
});

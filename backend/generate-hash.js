// const bcrypt = require('bcryptjs');
// const password = 'admin123';
// const saltRounds = 10;
// const hash = bcrypt.hashSync(password, saltRounds);
// console.log(hash);

const bcrypt = require('bcrypt');

const password = process.argv[2] || 'defaultPassword';
bcrypt.hash(password, 10, (err, hash) => {
  if (err) {
    console.error(err);
  } else {
    console.log('Hashed Password:', hash);
  }
});

//bootstrap code
let admin = Accounts.users.findOne({
  username: 'admin'
});

if (!admin) {
  console.log('Creating admin user from defaults.');
  try {
    Accounts.createUser({
      username: 'admin',
      email: 'admin@tuvok.nl',
      password: 'secret',
      profile: {
        //publicly visible fields like firstname goes here
        firstname: 'Lt. Commander',
        lastname: 'Tuvok',
        role: 'admin'
      }
    });

  } catch (e) {
    console.log('Hjalp!!');
    console.log(e);
  }
}
console.log("Environment: " + process.env.NODE_ENV);

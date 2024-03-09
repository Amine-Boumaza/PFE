import bcrypt from "bcrypt";



// Example passwords
const passwords = [
    'password1',
    'password2',
    'password3',
    'password4',
    'password5',
    'password6',
    'password7',
    'password8',
    'password9',
    'password10',
    'password11',
    'password12',
    'password13',
    'password14',
    'password15',
    'password16',
    'password17',
    'password18',
    'password19',
    'password20'
];

// Generate hashed passwords
const hashedPasswords = passwords.map(password => bcrypt.hashSync(password, 12));

// Print hashed passwords
hashedPasswords.forEach((hashedPassword, index) => {
    console.log(`$hashedpassword${index + 1}: ${hashedPassword}`);
});
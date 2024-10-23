let users = {1: {Firstname: 'Mohammad', Lastname: 'Haj', Age: 20, Height: 185, Weight: 88}, 
    2: {Firstname: 'Mehdi', Lastname: 'Hej', Age: 21, Height: 190, Weight: 190}}


console.log(users.Firstname)

console.log('Hej')

users.Firstname = 'Mathias';

console.log(users.Firstname)

console.log(users)

users.Firstname = 'Mohammad';

console.log(`Hej mig navn er ${users.Firstname, users.Lastname} ${users.Lastname} `)
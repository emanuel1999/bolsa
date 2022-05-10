# Server Base - Proyecto ONG


## Envinroment setup

1) Create database
2) Copy .env.example to .env and fill with database credentials.

To install dependencies, run
``` bash
npm install
```

3) Migrations:
``` bash
npx sequelize-cli db:migrate
```

4) Seeders:
``` bash
npx sequelize-cli db:seed:all
```

## Start local server

``` bash
npm start
```

# Users's Seeder
[{
      firstName: 'Usuario Regular1',
      lastName: 'Demo',
      email: 'test1@test.com',
      // Important: Password not encrypted yet! 
      password: '1234',
      roleId: 1,
      image: 'https://www.designevo.com/res/templates/thumb_small/colorful-hand-and-warm-community.png',
      createdAt: new Date,
      updatedAt: new Date
    },{
      firstName: 'Usuario Regular2',
      lastName: 'Demo',
      email: 'test2@test.com',
      // Important: Password not encrypted yet! 
      password: '1234',
      roleId: 1,
      image: 'https://www.designevo.com/res/templates/thumb_small/colorful-hand-and-warm-community.png',
      createdAt: new Date,
      updatedAt: new Date
    },{
      firstName: 'Usuario Regular3',
      lastName: 'Demo',
      email: 'test3@test.com',
      // Important: Password not encrypted yet! 
      password: '1234',
      roleId: 1,
      image: 'https://www.designevo.com/res/templates/thumb_small/colorful-hand-and-warm-community.png',
      createdAt: new Date,
      updatedAt: new Date
    },{
      firstName: 'Usuario Regular4',
      lastName: 'Demo',
      email: 'test4@test.com',
      // Important: Password not encrypted yet! 
      password: '1234',
      roleId: 1,
      image: 'https://www.designevo.com/res/templates/thumb_small/colorful-hand-and-warm-community.png',
      createdAt: new Date,
      updatedAt: new Date
    },{
      firstName: 'Usuario Regular5',
      lastName: 'Demo',
      email: 'test5@test.com',
      // Important: Password not encrypted yet! 
      password: '1234',
      roleId: 1,
      image: 'https://www.designevo.com/res/templates/thumb_small/colorful-hand-and-warm-community.png',
      createdAt: new Date,
      updatedAt: new Date
    },{
      firstName: 'Usuario Regular6',
      lastName: 'Demo',
      email: 'test6@test.com',
      // Important: Password not encrypted yet! 
      password: '1234',
      roleId: 1,
      image: 'https://www.designevo.com/res/templates/thumb_small/colorful-hand-and-warm-community.png',
      createdAt: new Date,
      updatedAt: new Date
    },{
      firstName: 'Usuario Regular7',
      lastName: 'Demo',
      email: 'test7@test.com',
      // Important: Password not encrypted yet! 
      password: '1234',
      roleId: 1,
      image: 'https://www.designevo.com/res/templates/thumb_small/colorful-hand-and-warm-community.png',
      createdAt: new Date,
      updatedAt: new Date
    },{
      firstName: 'Usuario Regular8',
      lastName: 'Demo',
      email: 'test8@test.com',
      // Important: Password not encrypted yet! 
      password: '1234',
      roleId: 1,
      image: 'https://www.designevo.com/res/templates/thumb_small/colorful-hand-and-warm-community.png',
      createdAt: new Date,
      updatedAt: new Date
    },{
      firstName: 'Usuario Regular9',
      lastName: 'Demo',
      email: 'test9@test.com',
      // Important: Password not encrypted yet! 
      password: '1234',
      roleId: 1,
      image: 'https://www.designevo.com/res/templates/thumb_small/colorful-hand-and-warm-community.png',
      createdAt: new Date,
      updatedAt: new Date
    },{
      firstName: 'Usuario Regular10',
      lastName: 'Demo',
      email: 'test10@test.com',
      // Important: Password not encrypted yet! 
      password: '1234',
      roleId: 1,
      image: 'https://www.designevo.com/res/templates/thumb_small/colorful-hand-and-warm-community.png',
      createdAt: new Date,
      updatedAt: new Date
    },{
      firstName: 'Usuario estándar1',
      lastName: 'Demo',
      email: 'estandar1@test.com',
      // Important: Password not encrypted yet! 
      password: '1234',
      roleId: 2,
      image: 'https://www.designevo.com/res/templates/thumb_small/colorful-hand-and-warm-community.png',
      createdAt: new Date,
      updatedAt: new Date
    },{
      firstName: 'Usuario estándar2',
      lastName: 'Demo',
      email: 'estandar2@test.com',
      // Important: Password not encrypted yet! 
      password: '1234',
      roleId: 2,
      image: 'https://www.designevo.com/res/templates/thumb_small/colorful-hand-and-warm-community.png',
      createdAt: new Date,
      updatedAt: new Date
    },{
      firstName: 'Usuario estándar3',
      lastName: 'Demo',
      email: 'estandar3@test.com',
      // Important: Password not encrypted yet! 
      password: '1234',
      roleId: 2,
      image: 'https://www.designevo.com/res/templates/thumb_small/colorful-hand-and-warm-community.png',
      createdAt: new Date,
      updatedAt: new Date
    },{
      firstName: 'Usuario estándar4',
      lastName: 'Demo',
      email: 'estandar4@test.com',
      // Important: Password not encrypted yet! 
      password: '1234',
      roleId: 2,
      image: 'https://www.designevo.com/res/templates/thumb_small/colorful-hand-and-warm-community.png',
      createdAt: new Date,
      updatedAt: new Date
    },{
      firstName: 'Usuario estándar5',
      lastName: 'Demo',
      email: 'estandar5@test.com',
      // Important: Password not encrypted yet! 
      password: '1234',
      roleId: 2,
      image: 'https://www.designevo.com/res/templates/thumb_small/colorful-hand-and-warm-community.png',
      createdAt: new Date,
      updatedAt: new Date
    },{
      firstName: 'Usuario estándar6',
      lastName: 'Demo',
      email: 'estandar6@test.com',
      // Important: Password not encrypted yet! 
      password: '1234',
      roleId: 2,
      image: 'https://www.designevo.com/res/templates/thumb_small/colorful-hand-and-warm-community.png',
      createdAt: new Date,
      updatedAt: new Date
    },{
      firstName: 'Usuario estándar7',
      lastName: 'Demo',
      email: 'estandar7@test.com',
      // Important: Password not encrypted yet! 
      password: '1234',
      roleId: 2,
      image: 'https://www.designevo.com/res/templates/thumb_small/colorful-hand-and-warm-community.png',
      createdAt: new Date,
      updatedAt: new Date
    },{
      firstName: 'Usuario estándar8',
      lastName: 'Demo',
      email: 'estandar8@test.com',
      // Important: Password not encrypted yet! 
      password: '1234',
      roleId: 2,
      image: 'https://www.designevo.com/res/templates/thumb_small/colorful-hand-and-warm-community.png',
      createdAt: new Date,
      updatedAt: new Date
    },{
      firstName: 'Usuario estándar9',
      lastName: 'Demo',
      email: 'estandar9@test.com',
      // Important: Password not encrypted yet! 
      password: '1234',
      roleId: 2,
      image: 'https://www.designevo.com/res/templates/thumb_small/colorful-hand-and-warm-community.png',
      createdAt: new Date,
      updatedAt: new Date
    },{
      firstName: 'Usuario estándar10',
      lastName: 'Demo',
      email: 'estandar10@test.com',
      // Important: Password not encrypted yet! 
      password: '1234',
      roleId: 2,
      image: 'https://www.designevo.com/res/templates/thumb_small/colorful-hand-and-warm-community.png',
      createdAt: new Date,
      updatedAt: new Date
    }]

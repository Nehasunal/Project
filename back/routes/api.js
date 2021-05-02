const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const crypto= require('crypto');
const nodemailer = require("nodemailer");
const multer = require('multer');
//////////

const {Pool,Client}=require('pg')
const connectionString='postgressql://postgres:root@localhost:5432/test'
const client=new Client({
  connectionString:connectionString
})
client.connect()
client.on("connect",()=>{
  console.log("db connection");
})


client.query('SELECT * from users',(err,res)=>{
  console.log(err,res)

})


const sendgridTransport = require('nodemailer-sendgrid-transport');

//checking
router.get('/', (req, res, next) => res.send('API Hello World!'));
/////////////////file upload///////////

const storage = multer.diskStorage({
    destination: (req, file, callBack) => {
        callBack(null, 'uploads')
    },
    filename: (req, file, callBack) => {
        callBack(null, `${file.originalname}`)
    }
  })

const upload = multer({ storage: storage })
  router.post('/file', upload.single('file'), (req, res, next) => {
    const file = req.file;

    console.log(file.filename);
    if (!file) {
      const error = new Error('No File')
      error.httpStatusCode = 400
      return next(error)
    }

      res.send(file);
  })


////login/////////////////////////////////
router.post('/login', (req, res) => {
  let userData = req.body;
  var email  = userData.email;
  var password = userData.password;
  // var password=password.hashPassword();
  console.log(userData);

  client.query(`SELECT * FROM users WHERE email = $1`,[userData.email] ,(err, results) => {
    if (err) {
      console.log(err);
      return res.status(500).send( {'error' :'Sorry username does not exits'} );
    } else {
//

      if (results &&results.rows.length >0) {

        if ( results.rows[0].password == password) {
              let token=jwt.sign(results.rows[0],'secret',{expiresIn:'5h'})
             console.log(results.rows[0].password );

          return res.status(200).send({'name':results.rows[0].name, token:token});
          // return res.status(200).send({'token':token});
        }

         else {
            return res.status(401).send({ 'error':  'Invalid password' });
        }
      } else{
          return res.status(404).send('Sorry username does not exits');
      }
    }
  });
});  //post



//////////////send mail////////////

router.post("/sendmail", (req, res) => {
  console.log("request came");
  let user = req.body;
  console.log(user.email);

 client.query("SELECT id FROM users WHERE email = $1",[user.email],(err, results) => {
   if (results &&results.rows.length >0) {
   var id=results.rows[0].id;

  var resetLink=`http://localhost:4200/resetpassword/`+results.rows[0].id;

let htmlTemp=`
<h1 >Hi</h1><br>
<h4>This is forgot password mail</h4>

<a target="_blank" href="`+resetLink+`"  style="color:#FFFFFF;
font-size:17px;width:200px;font-weight:normal;line-height:42px;
font-family:Arial, Helvetica, sans-serif;text-align:center;
text-decoration:none;background-color:#2ecc71;padding:10px;"
rel="nofollow">Reset password</a>

`
;

// async function sendMail(user, callback) {
  // create reusable transporter object using the
   // default SMTP transport
  let transporter = nodemailer.createTransport(
    sendgridTransport({

    auth:{
      api_key:"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"
    }
  }));
////

  let mailOptions = {
    from: 'fresherhack0@gmail.com',//sender email
    to: user.email,//user email
    subject: "Welcome ",
    html:htmlTemp,

  };
//
  // send mail with defined transport object
   transporter.sendMail(mailOptions,  function(err, info){
    if (err ){
      console.log('error');
    }
    else {
        return res.status(200).send();
    }
});

}//selectid
} );//selectid
// }// sendmail function
});

/////////////RESET PASSWORD///////////

router.put('/update/:id', (req, res) => {
  let userData = req.body;
    console.log(userData);
    var id=req.params.id;

    var password=userData.password;




client.query("UPDATE users SET password=$1 WHERE id=$2",
[password,req.params.id],
 (err, results, fields) => {

    if (err) {
      console.log(err);
      return res.status(500).send( {'error' :'Sorry username does not exits'} );
    } else{

            return res.status(200).send(results);
    }
  })
});

///dashboard View



router.get('/select',verifyToken, (req, res) => {
  let userData = req.body;
    console.log(userData);
    var id=userData.id;
    var name = userData.name;
    var description=userData.description;
    var status=userData.status;

  client.query("SELECT * FROM users ",(err, results) => {

    if (err) {
      console.log("err");
      return res.status(500).send( {'error' :'Invalid'} );
    } else {
      // console.log(results);
      return res.send(results.rows);


    }
  });//client
});
var decodedToken='';
function verifyToken(req,res,next){
  let token = req.query.token;

  jwt.verify(token,'secret', function(err, tokendata){
    if(err){
      return res.status(400).json({message:' Unauthorized request'});
    }
    if(tokendata){
      decodedToken = tokendata;
      console.log("verified");
      next();
    }
  })
}











////////////////
router.get('/selectone/:id', (req, res) => {
  let userData = req.body;

    var id=req.params.id;
    console.log(id);
    var name = userData.name;
    var email=userData.email;
    var description=userData.description;
  var status=userData.status;
    client.query(`SELECT * FROM users WHERE id = $1`,[req.params.id] ,(err, results) => {

  // console.log(rows);
    if (err) {
      console.log(err);
      return res.status(500).send( {'error' :'Sorry username does not exits'} );
    } else{
console.log("result", results.rows);
      return res.send(results.rows);
    }
  })
});
//////////////

router.put('/updateuser/:id', (req, res) => {
  let userData = req.body;
    console.log(userData);
    var id=req.params.id;
    var name = userData.name;
    var email = userData.email;
    var description=userData.description;
    var status=userData.status;
console.log("check");
console.log(userData.email)
client.query(`SELECT * FROM users WHERE id = $1`,[userData.email] ,(err, results) => {

// console.log(rows);
if (err) {
  client.query("UPDATE users SET name=$1, description=$2, email=$3 WHERE id=$4",
  [name,description,email,req.params.id],(err, results) => {

    if (err) {
      console.log("err");
      return res.status(500).send( {'error' :'Invalid'} );
    } else {
      console.log(results);
      return res.status(200).send();


    }
  })
} else{

  return res.status(500).send({'error' :'email aready exist'});
}
})
  });

////////////////////

router.post('/add', (req, res) => {

  let userData = req.body;
    console.log(userData);
    var name = userData.name;
    var email=userData.email;
    var password = userData.password;
    var description=userData.description;
    var status="1";
    client.query(`SELECT * FROM users WHERE id = $1`,[userData.email] ,(err, results) => {

  // console.log(rows);
    if (err) {
      client.query("Insert into users (name,email,description,password,status) Values ($1,$2,$3,$4,$5)",
      [name,email,description,password,status],(err, results) => {

        if (err) {
          console.log("err");
          return res.status(500).send( {'error' :'Invalid'} );
        } else {
          console.log(results);
          return res.send();


        }
      })
    } else{

      return res.status(500).send({'error' :'email aready exist'});
    }
  })//select

});

///////////////////

router.put('/change/:id', (req, res) => {
  let userData = req.body;
    console.log(userData);
    var id=req.params.id;
    var status=userData.status;

console.log(req.params.id)
console.log(userData.status)


client.query("UPDATE users SET status=$1 WHERE id=$2",
[userData.status,req.params.id],
 (err, results, fields) => {
// console.log(results);
    if (err) {
      console.log(err);
      return res.status(500).send( {'error' :'Sorry username does not exits'} );
    } else{

            return res.status(200).send(results);
    }
  })//update


});//change

//////////////////


router.get('/searchData', (req, res) => {
  let userData = req.body;
    console.log(userData);

  search = req.query.search
  stat=req.query.stat;
  console.log("stat",req.query.stat);
if(req.query.stat=='0' || req.query.stat=='1'){

  var searchUser= "SELECT * FROM users WHERE (name LIKE '%' || $1 || '%' OR description LIKE '%' || $1 || '%' OR email LIKE '%' || $1 || '%') AND status=$2 "


       client.query(searchUser,[search,stat],(err, results) => {

      if (err) {
        console.log(err);
        return res.status(500).send( {'error' :'query does not exist'} );
      } else{

              return res.status(200).send(results.rows);
      }
    })//update
}
else{
  var searchUser= "SELECT * FROM users WHERE name LIKE '%' || $1 || '%' OR description LIKE '%' || $1 || '%' OR email LIKE '%' || $1 || '%'"


       client.query(searchUser,[search],(err, results) => {

      if (err) {
        console.log(err);
        return res.status(500).send( {'error' :'query does not exist'} );
      } else{

              return res.status(200).send(results.rows);
      }
    })
}
//
});//change












///pagination
router.get('/paging/:offset/:limit', (req, res) => {
  let offset = req.params.offset;
   let limit = req.params.limit;
  console.log("off",offset);
    console.log("limit",limit);
    var paging=`SELECT * FROM users OFFSET $1 LIMIT $2 `;
     client.query(paging,[offset,limit],(err, results) => {

  // console.log(rows);
    if (err) {
      console.log(err);
      return res.status(500).send( {'error' :'Sorry username does not exits'} );
    } else{
console.log("result", results.rows);
      return res.send(results.rows);
    }
  })
});




module.exports = router;

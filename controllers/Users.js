//import le model user
import {User} from "../database.js";

//import bcrypt pour crypter le mot de passe en base de données
import bcrypt from 'bcrypt';

//nombre de tour de cryptage
const saltRounds = 10;

// retourne l'utilisateur ou tableau vide si le mail a été trouvé dans le document User
export function GetMailInUser(req,res){
    const email_find=req.params.id;
    User.find({email:email_find},(err, user) => {
        if(err) return console.error(err);
      res.json(user);
    });
 }
 //detruit la session 
 export function LogoutUser(req,res){
    req.session.destroy((err) =>{
		res.send(true);
        
	})
 }
 // envoi du formulaire de connexion en POST  et test si les champs ont bien été renseigné.
 //si le mail existe et si le mot de passe correspond à ce qui'il y a en base de donnée.

 export function SubmitLogin(req,res){
    const email_form=req.body.email;
    const password_form=req.body.password;
    if(email_form===""){
        return;
        //res.status(500).send("un des champs n'a pas été renseigné");
       
    }
    if(password_form===""){
        return;
       // res.status(500).send("un des champs n'a pas été renseigné");
    }
    User.findOne({email:email_form},(err, users) => {
        if(err) return console.error(err); 
        if(users===null){
            res.status(401).send({message:"email ou mot de passe incorrect."});
        }
        else{
                bcrypt.compare(password_form,users.password)
                .then(function(result){
                    if(result==true){
                        req.session.user=users.email;
                        req.session.isLogged=true;
                        req.session.Role=users.role;
                        
                        res.status(200).send(req.session);
                        
                    }
                    else{
                        res.status(401).send({message:"email ou mot de passe incorrect."});
                    }
            });
        }
    });

 }
// recuperer la commande et la session en POST et l'ajoute à l'utilsateur
 export function AddCommandSubmit(req,res){

    const command=req.body.command;
    const session=req.body.sessionLocal;

    const command_user=[{
        status:false,
        date_commande:new Date(),
        products:command
    }];

    User.findOneAndUpdate({email:session.user}, {$push: {commande: command_user}}, function (error, success) {
        if (error) {
            console.log(error);
        } else {
            console.log("commande ajouter");
            res.send(true);
        }
    });



 }
// recupere les données du formulaire d'inscription en POST (verification des champs)
// et ajout en base de donnée avec bcrypt pour le mot de passe.
 export function PostRegisterUser(req,res){
    
    let user_bdd=null;
    
    if(req.body.civilite==="" || req.body.nom==="" || req.body.prenom===""
         || req.body.adresse==="" || req.body.code_postal==="" || req.body.commune===""
         || req.body.tel==="" || req.body.password==="" || req.body.password_2===""){
            return;
    }
    if(req.body.password!==req.body.password_2){
        return;
    } 
    User.find({email:req.body.email},(err, user) => {
        if(err) return console.error(err);
        if(user.length>0){
         return;   
        }else{

           bcrypt.hash(req.body.password, saltRounds)
            .then(function(hash){
                user_bdd={
                    civilite:req.body.civilite,
                    nom:req.body.nom,
                    prenom:req.body.prenom,
                    adresse:req.body.adresse,
                    code_postal:req.body.code_postal,
                    commune:req.body.commune,
                    tel:req.body.tel,
                    password:hash,
                    email:req.body.email,
                    role:"User",
                    date_create:new Date(),
                    date_update:new Date()
                }
            let new_user = new User(user_bdd);
            new_user.save(function (err, user) {
            if (err) return console.error(err);
                res.send(true);
            });
            })

        }
    });

 }
// recupere toutes commandes d'un utilisateur
 export function GetAllCommandsByUser(req,res){
    const id=req.params.id;
    User.findOne({email:id},(err, user) => {
        if(err) return console.error(err);
             res.json(user);
    });

 }
// recupere toutes les commandes 
 export function GetAllCommands(req,res){
    User.aggregate([
    {$match:{commande: { $gt: [] }}},
     {
       $unwind: { path: "$commande", preserveNullAndEmptyArrays: true }
     },
     { $sort: { "commande.date_commande": -1 } }

      ],(err, commands) => {
        if(err) return console.error(err);
      res.json(commands);
    });
  }


// import de mongoose
import mongoose from "mongoose";

//connexion à la base de donné mongoDB
mongoose.connect("mongodb://0.0.0.0:27017/projet_cup_of_tea");

// si erreur affiche un log 
mongoose.connection.on("error", () =>{
    console.log("Connexion impossible à la base de données");
})

// Schema du document Thea
let TheaShema = new mongoose.Schema({
    reference: String,
    name: String,
    description: String,
    falling_thea: Boolean,
    category : {
        type: mongoose.Schema.Types.ObjectId,
        ref: "categorie"
    },
    date_create: Date,
    date_update: Date,
    image_normal: String,
    image_big: String,
    stock:Number,
    price:Number,
    choice:[],
    notation : Number,
    isNewThea: Boolean
});

// Schema du document User
let UserShema = new mongoose.Schema({
    email: String,
    password: String,
    role: String,
    civilite: String,
    nom: String,
    prenom: String,
    adresse: String,
    code_postal: String,
    commune: String,
    telephone:String,
    date_create: Date,
    date_update: Date,
    date_connexion : Date,
    commande:[{
        status:Boolean,
        date_commande:Date,
        products:[{
            reference:String,
            price:Number,
            weight:Number,
            quantity:Number
        }]
    }]
   
});

// Schema du document CommandeUser
// Pas eu besoin pour le projet
/*
let CommandeUserShema = new mongoose.Schema({
    thea: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "thea"
    },
    user : {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user"
    }
});*/

// Schema du document Category
let CategoryShema = new mongoose.Schema({
    name: String,
    description:String,
    image: String,
    date_create:Date,
    date_update:Date
});

//export des model 
export let Thea = mongoose.model("thea", TheaShema);

export let User = mongoose.model("user", UserShema);

//export let CommandeUser= mongoose.model("commande_user", CommandeUserShema);

export let Category= mongoose.model("categorie", CategoryShema);




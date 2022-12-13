//import le model thea,user,category
import {Thea,User,Category} from "../database.js";

// recupere tout les tea
export function AllTea(req,res){
    Thea.find({},(err, tea) => {
        if(err) return console.error(err);
      res.json(tea);
    });
 }
 // recupere le Nouveau Tea
 export function NewTea(req,res){
  Thea.find({isNewThea:true},(err, tea) => {
      if(err) return console.error(err);
    res.json(tea);
  });
}
//  recupere Tea coup de coeur
export function FallingTea(req,res){
  Thea.find({falling_thea:true},(err, tea) => {
      if(err) return console.error(err);
    res.json(tea);
  });
}
// récupere le tea le plus commandé
export function BestTeaCommand(req,res){
  User.aggregate([

   {
     $unwind: { path: "$commande", preserveNullAndEmptyArrays: true }
   },
   {
     $unwind: { path: "$commande.products", preserveNullAndEmptyArrays: true }
   },
    {
      $group:{
        _id:"$commande.products.reference",
        count:{$sum:1}
      },
    },
    { $sort : { count : -1 } },
    { $limit : 1 }
    ],(err, best_tea) => {
      if(err) return console.error(err);
   
      Thea.find({reference:best_tea[0]._id},(err, tea) => {
        if(err) return console.error(err);
        res.json(tea);
    });

  });
}
// recupere tout les tea avec la catégorie associé
 export function AllTeaByCategory(req,res){
  Thea.aggregate([
    {
      
        $lookup:
        {
           from: "categories",
           localField: "category",
           foreignField: "_id",
           as: "category"
        }
    }],(err, tea) => {
      if(err) return console.error(err);
    res.json(tea);
  });
}
// recupere un seul tea
 export function GetTea(req,res){
  const id=req.params.id;
  Thea.find({_id:id},(err, tea) => {
      if(err) return console.error(err);
    res.json(tea);
  });
}
// recupere tout les tea d'une categorie
export function GetTeaByCategory(req,res){
  const id=req.params.id;
  Thea.find({category:id},(err, tea) => {
      if(err) return console.error(err);
    res.json(tea);
  });
}
// recupere un tea par reférence
export function GetTeaByReference(req,res){
  const reference=req.params.id;
  Thea.find({reference:reference},(err, tea) => {
      if(err) return console.error(err);
    res.json(tea);
  });
}
// recupere une catégorie
export function GetCategory(req,res){
  const id=req.params.id;
  Category.find({_id:id},(err, tea) => {
      if(err) return console.error(err);
    res.json(tea);
  });
}
// supprimer un Tea
export function RemoveTea(req,res){
  const id=req.params.id;
  Thea.deleteOne({_id:id},(err, tea) => {
      if(err) return console.error(err);
      res.send(true);
  });
}
// recupere toutes catégories
export function AllCategory(req,res){
  Category.find({},(err, tea) => {
      if(err) return console.error(err);
      res.json(tea);
  });
}
// Recupere les données du formulaire en POST, vérifie le formulaire et l'ajoute à la base de donnée

export function AddTeaSubmit(req,res){
  let tea_bdd=null;
  if(req.body.name==="" || req.body.referene==="" || req.body.description===""
       || req.body.price==="" || req.body.category===""){
          return;
  }
  Thea.find({reference:req.body.reference},(err, user) => {
      if(err) return console.error(err);
      if(user.length>0){
       return;   
      }
      else{

            tea_bdd={
                  reference:req.body.reference,
                  name:req.body.name,
                  description:req.body.description,
                  falling_thea:false,
                  category:req.body.category,
                  date_create:new Date(),
                  date_update:new Date(),
                  image_normal: "product3.jpg",
                  image_big: "product3_big.jpg",
                  stock: 10,
                  price:req.body.price,
                  choice: [
                    100,
                    500,
                    1000
                    ],
                    notation: 4,
                    isNewThea: false  
              }
          let new_tea = new Thea(tea_bdd);
          new_tea.save(function (err, user) {
          if (err) return console.error(err);
          
          res.send(true);
          });

      }
  });

}
// Recupere les données du formulaire en POST, vérifie le formulaire et modifie le tea en base de donnée
export function UpdateTeaSubmit(req,res){
  const id=req.params.id;
  let tea_bdd=null;

  if(req.body.name==="" || req.body.referene==="" || req.body.description===""
       || req.body.price==="" || req.body.category===""){
          return;
  }
  Thea.find({reference:req.body.reference},(err, user) => {
      if(err) return console.error(err);
      if(user.length>0){
       return;   
      }
      else{

            tea_bdd={
                  reference:req.body.reference,
                  name:req.body.name,
                  description:req.body.description,
                  falling_thea:false,
                  category:req.body.category,
                  date_create:new Date(),
                  date_update:new Date(),
                  image_normal: "product3.jpg",
                  image_big: "product3_big.jpg",
                  stock: 10,
                  price:req.body.price,
                  choice: [
                    100,
                    500,
                    1000
                    ],
                    notation: 4,
                    isNewThea: false  
              }
              Thea.findOneAndUpdate({_id:id}, tea_bdd,function (error, success) {
                if (error) {
                    console.log(error);
                } else {
                    res.send(true);
                }
            });

      }
  });

}


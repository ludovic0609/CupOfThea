import express from "express";
const router = express.Router();


import {AllTea,GetTea,GetCategory,AllCategory, 
AllTeaByCategory,NewTea,FallingTea,GetTeaByCategory, GetTeaByReferenceAltTea,
BestTeaCommand,GetTeaByReference,AddTeaSubmit,RemoveTea,UpdateTeaSubmit} from "../controllers/Tea.js";

import {GetMailInUser,PostRegisterUser,SubmitLogin,AddCommandSubmit,LogoutUser,
GetAllCommandsByUser,GetAllCommands} from "../controllers/Users.js";
  

router.get('/',AllTea); // recupere tout les tea
router.get('/all',AllTeaByCategory); // recupere tout les tea avec la catégorie associé
router.get('/category',AllCategory); // recupere toutes les catégories
router.get('/category/:id',GetCategory); // récupere une seul catégorie 
router.get('/tea/:id',GetTea); // récupere un seul tea 
router.get('/tea/category/:id',GetTeaByCategory); // récuperer tout les tea par une catégorie
router.get('/tea/reference/:id',GetTeaByReference); // récupere un tea avec la référence


router.get('/newtea',NewTea); // récupere le nouveau tea 
router.get('/falling',FallingTea); // recupere le tea coup de coeur
router.get('/besttea',BestTeaCommand); // récupere le tea qui a été le plus commandé

router.get('/users/email/:id',GetMailInUser); // recupere si le mail existe ou pas en base
router.get("/logout",LogoutUser); // route pour se deconnecter
router.get("/commandes/user/:id",GetAllCommandsByUser); // recupere toutes les commandes par utilisateurs

router.get("/commandes",GetAllCommands); // recupere toutes les commandes (user avec un Role:"Admin" uniquement)

router.post('/tea/reference/tea/:id',GetTeaByReferenceAltTea); // récupere un tea avec la référence sauf le tea en question avec l'id en post
router.post("/tea/add",AddTeaSubmit); // Ajouter un Tea (user avec un Role:"Admin" uniquement)
router.post("/tea/update/:id",UpdateTeaSubmit); // Modifier un Tea (user avec un Role:"Admin" uniquement)
router.delete("/tea/delete/:id",RemoveTea); // Supprimer un Tea (user avec un Role:"Admin" uniquement)

router.post('/command/add',AddCommandSubmit); // Route pour payer la commande du panier.
router.post("/users/register",PostRegisterUser); // s'enregistrer en tant que (Role:"User")
router.post("/login",SubmitLogin); // route pour se connecter





















export default router;
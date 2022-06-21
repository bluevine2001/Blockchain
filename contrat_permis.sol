pragma solidity 0.8.7;

contract permis{
    // on definit l'adresse du propriétaire du contrat
    address owner;
    // on fait un objet permisb qui contient toutes les informations qu'on souhaite connaitre à propos d'un permis de conduire
    struct permisb{
        string neph;
        string nom;
        string prenom;
        uint points;
        string dateObtention;
    }
    // ici on crée un variable qui est l'instance de permisb.
    permisb permis1;
    // le constructeur initialise l'addresse du propriétaire 
    constructor (){
        owner = msg.sender;
    }
    // cette fonction permet d'ajouter un permis avec ces infos dans la blockchain
    function addPermis (string memory _neph, uint _points, string memory _nom, string memory _prenom, string memory _dateObtention) public {
        require(msg.sender == owner);
        permis1 = permisb(_neph, _nom, _prenom, _points, _dateObtention);
    }
    // les fonctions suivantes permettent de recuperer une information sur le permis 
    function getNomPermis () public view returns(string memory){
        return permis1.nom;
    }
    function getPrenomPermis () public view returns(string memory){
        return permis1.prenom;
    }
    function getNephPermis () public view returns(string memory){
        return permis1.neph;
    }
    function getDatePermis () public view returns(string memory){
        return permis1.dateObtention;
    }
    function getPointsPermis () public view returns(uint){
        return permis1.points;
    }
    // les fonctions retraitPoints et ajoutPoints permettent de d'ajouter ou d'enlever des points sur un permis
    function retraitPoints(uint _points) public {
        require(msg.sender == owner);
        require(_points <= 6);
        permis1.points -= _points; 
    }
    function ajoutPoints(uint _points) public {
        require(msg.sender == owner);
        require(_points <= 6);
        permis1.points += _points; 
    }
}
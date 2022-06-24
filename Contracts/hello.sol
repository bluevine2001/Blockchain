pragma solidity 0.8.7;

contract Hello {
    // initialisation de la variable message
    string private message;
    // le constructeur permet d'attribuer la valeur passé en paramètres à la variable message lorsque la class contract à été instancier.
    constructor(string memory _message) public{
        message = _message;
    }
    // fonction qui retourne le message, la fonction peut prendre des parametres
    // public signifie que la fonction est accessible en dehors du contrat
    // view signifie qu'on souhaite uniquement lire les infos de la blockchain et non écrire
    // returns signifie que la fonction retourne une string memory
    function getMessage() public view returns (string memory){
        return message;
    }
    // fonction qui change la valeur du _message du contrat par le message passé en argument
    // fonction accessible en dehors du contrat
    function setMessage(string memory _message) public{
        message = _message;
    }
}
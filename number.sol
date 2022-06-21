contract Number {
    // initialisation de la variable nombre
    uint256 private nombre;
    // le constructeur permet d'attribuer la valeur passé en paramètres à la variable nombre lorsque la class contract à été instancier.
    constructor(uint _nombre) public{
        nombre = _nombre;
    }
    // fonction qui retourne le nombre, la fonction peut prendre des parametres
    // public signifie que la fonction est accessible en dehors du contrat
    // view signifie qu'on souhaite uniquement lire les infos de la blockchain et non écrire
    // returns signifie que la fonction retourne une string memory
    function getNombre() public view returns (uint){
        return nombre;
    }
    // fonction qui change la valeur du _nombre du contrat par le nombre passé en argument
    // fonction accessible en dehors du contrat
    function setNombre(uint _nombre) public{
        nombre = _nombre;
    }
}
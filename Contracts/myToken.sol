pragma solidity 0.8.7;

contract myToken {
    /* This creates an array with all balances */
    mapping (address => uint256) public balanceOf;

    /* Initializes contract with initial supply tokens to the creator of the contract */
    constructor(uint256 initialSupply) public {
        balanceOf[msg.sender] = initialSupply;
    }

    /* Send coins */
    /* ajout external payable en 0.8.7 sinon le code ne fonctionne pas */
    function transfer(address _to, uint256 _value) external payable {
        require(balanceOf[msg.sender] >= _value); // require veut dire la condition est requise, si la condition n'est pas vrai,  la fonction s'arrête et renvoie le gas restant.
        //ici on vérifie si l'expediteur a assez de sous pour envoyer
        require(balanceOf[_to] + _value >= balanceOf[_to]);// on vérifie que l'envoie est >= à 0.
        balanceOf[msg.sender] -= _value; // on enleve la somme envoyé à l'expediteur
        balanceOf[_to] += _value; // on ajoute la somme envoyé au destinataire
    }
}
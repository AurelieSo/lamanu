$(function(){
  // --------- AU CHARGEMENT DE LA PAGE --------- //
  // je cache la div de résultat, elle ne s'affichera qu'une fois le jeu (les 10 parties) sera terminé
  $('#result').hide();
  // Je déclare les variables utiles au projet
  /* var gamerWin = nombre de parties gagnées par le Joueur
  var numberGames = nombre de parties jouée
  var percentWin = Pourcentage de réussite du joueur
  var gamerChoice = choix du joueur
  */
  var gamerWin = 0;
  var numberGames = 0;
  var percentWin = 0;
  var gamerChoice = null;
  /* Je crée un tableau avec les 3 possibilitées. Ce tableau me servira pour le choix de l'ordinateur.
  Dans un tableau, l'index de la premiere colonne est 0. Ce qui veut dire que :
  l'index 0 correspond au choix 'Pierre',
  l'index 1 correspond au choix 'Feuille',
  l'index 2 correspond au choix 'Ciseaux'.
  */
  var arrayChoices = ['Pierre', 'Feuille', 'Ciseaux'];

  // Je rend les blocs contenant les images de la pierre, de la feuille et des ciseaux déplaçable grâce à leur class commune (.choice)
  $('.choice').draggable({
    revert : true,// revert permet de renvoyer automatiquement l'élément à sa place
    snap : '#droppableGamer',// snap permet aux blocs que l'on déplace d'être attirés pas le bloc #droppableGamer
    snapMode: 'inner' // snapMode : 'inner' permet de rendre le bloc #droppableGamer magnétisque
  });

  // --------- A CHAQUE FOIS QUE JE LACHE UNE DES IMAGES --------- //
/* J'ajoute l'évènement mouseup aux 3 blocs contenant les images.
A chaque fois que je lache le clic de ma souris, et en fonction du bloc déplacé,
j'attribue une valeur au choix du joueur que je stock dans ma variable gamerChoice.
Si je lache la div #rockChoice, j'attribue la valeur 0 à gamerChoice
Si je lache la div #paperChoice, j'attribue la valeur 1 à gamerChoice
Si je lache la div #scissorsChoice, j'attribue la valeur 2 à gamerChoice
Ces valeurs ont été choisies en cohérance avec le tableau arrayChoices définis plus haut
*/
  $('#rockChoice').mouseup(function(){
    gamerChoice = 0;
    // Je vérifie grâce au console.log
    console.log('Choix du joueur' + gamerChoice);
  });
  $('#paperChoice').mouseup(function(){
    gamerChoice = 1;
    console.log('Choix du joueur' + gamerChoice);
  });
  $('#scissorsChoice').mouseup(function(){
    gamerChoice = 2;
    console.log('Choix du joueur' + gamerChoice);
  });

// --------- AU MOMENT DU DEPOT  --------- //
  // Le bloc #droppableGamer devient une zone de dépôt
  $( "#droppableGamer" ).droppable({
    accept: '.answer', // seul les éléments qui ont la classe answer pourront être accepté dans cette zone de dépôt
    drop: function(event, ui){ // drop est un évènement.
      /* Dès qu'un dépôt valide est fait, j'incrémente de 1 le compteur de parties
      J'affiche le nombre de parties dans les balise <span> qui ont la class numberGames (lignes 45 et 51 de l'index.html)
      */
      numberGames++;
      $('.numberGames').html(numberGames);

      /* Je stock dans la variable computerChoice le choix de l'ordinateur parmis les possibilitées du tableau arrayChoices.
       Le choix se fait de façon aléatoire
      */
      var computerChoice = Math.floor(Math.random() * arrayChoices.length);
      console.log('Choix de l\'ordinateur' + computerChoice);

      /* J'affiche l'image correspondant au choix de l'ordinateur dans le bloc #droppableComputer
      Si Le choix de l'ordinateur est la pierre, (ce choix correspond à l'index 0 du tableau arrayChoices)
      J'insers dynamiquement dans la div #droppableComputer une balise image avec le chemin de l'image correspondante, grâce à la fonction append()
      */
      if (computerChoice == 0) {
        $('#droppableComputer').append('<img class="img" src="https://www.pierrefeuilleciseaux.fr/wp-content/uploads/sites/5/2013/10/pierre-150x150.png" alt="pierre" />');
      } else if(computerChoice == 1){
        $('#droppableComputer').append('<img class="img" src="https://www.pierrefeuilleciseaux.fr/wp-content/uploads/sites/5/2013/10/feuille-300x300.png" alt="feuille" />');
      } else if(computerChoice == 2){
        $('#droppableComputer').append('<img class="img" src="https://www.pierrefeuilleciseaux.fr/wp-content/uploads/sites/5/2013/10/ciseaux-300x300.png" alt="ciseaux" />');
      }

// --------- AFFICHAGE DE LA COMPARAISON DANS DES ALERT  --------- //
      //Ayant le choix du joueur dans gamerChoice et le choix de l'ordinateur dans computerChoice, je peux maintenant les comparer
      // Si le choix du joueur et le choix de l'ordinateur sont les mêmes
      if(gamerChoice == computerChoice){
        // J'affiche une alert avec le message "Egalité"
        alert('Egalité');
        // Ou bien alors si le choix du joueur est plus faible que celui de l'ordinateur
        // signe || correspond à 'ou'
      } else if( (computerChoice == 3 && gamerChoice == 2) || (computerChoice == 2 && gamerChoice == 1) || (computerChoice == 1 && gamerChoice == 3) ){ //le
        // J'affiche une alert avec le message "Perdu !"
        alert('Perdu !');
      // Sinon (autrement dit pour toutes les autres possibilités)
      }else{
        // J'affiche une alert avec le message "Gagné !"
        alert('Gagné !');
        // J'incrémente le nombre de parties gagnées
        gamerWin++;
      }

      // Je calcule et arrondi (grâce à Math.round()) le pourcentage de réussite du joueur
      percentWin = Math.round((gamerWin * 100) / numberGames);
      // J'affiche dans chacunes des éléments les résultats
      // .html() permet d'ajouter ou de remplacer le contenu texte de l'élément ciblé
      $('#percentWin').html(percentWin + '%');
      $('#gamerWin').html(gamerWin);
      $('#computerWin').html(numberGames-gamerWin);

      // --------- APRES AVOIR FERME L'ALERT AVEC LE RESULTAT DU TOUR --------- //
      /* je vide le contenu de la div #droppableComputer correspondant au choix de l'ordinateur.
      Cela me permettra de pouvoir jouer un tour à nouveau
      */
      $('#droppableComputer').empty();

      // --------- QUAND LE JEU EST FINI c'est à dire que les 10 tours ont été fait --------- //
      if (numberGames == 10) {
        // Je cache la div avec les consignes
        $('#instructions').hide();
        // Je cache la div contenant l'ensemble des éléments du jeu
        $('#game').hide();
        // J'affiche la div de résultat cachée au chargement de la page (cf. ligne 4 du script.js)
        $('#result').show();

        // Si le pourcentage de réussite est supérieur ou égal à 0 et est strictement inférieur à 50%
        if (percentWin >= 0 && percentWin < 50) {
          // J'affiche le message "Quel dommage..." dans la div #messageResult
          $('#messageResult').html('<strong>QUEL DOMMAGE...</strong> </br>Avec ' + gamerWin + ' parties gagnées sur ' + numberGames + ', vous avez perdu...');
        // Ou bien alors si le pourcentage de réussite est égal à 50%
        } else if (percentWin == 50) {
          // J'affiche le message "Presque ! ..." dans la div #messageResult
          $('#messageResult').html('<strong>PRESQUE !</strong> </br>Avec ' + gamerWin + ' parties gagnées sur ' + numberGames + ', vous êtes égalité !');
        // Ou bien alors si le pourcentage de réussite est supérieur ou égal à 51 et inférieur ou égal à 100
        }else if (percentWin >= 51 && percentWin <= 100) {
          // J'affiche le message "Bravo ! ..." dans la div #messageResult
          $('#messageResult').html('<strong>BRAVO !</strong> </br>Avec ' + gamerWin + ' parties gagnées sur ' + numberGames + ', vous avez gagné !!!');
        }

      } // fermeture du if(numberGames == 10)
    } // fermeture de l'évènement drop
  }); // fermeture de la fonction droppable
}); // fermeture du $(function()

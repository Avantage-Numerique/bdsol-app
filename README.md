# Application public et tableau de bord de la BDSOL

## Mise à jours

### Dépendances
- 2022-08-31 : mise à jour de Nextjs vers 12.2 et de react vers 18.2 

#### Nextjs 12.2
Ajoute des [middlewares](https://nextjs.org/docs/advanced-features/middleware), pour la fonctionnalité d'ajouter des fonctionnalités avant le getServerSideProps et de mieux controllé le flow et le lien avec l'API. ([voir les changeemnts de nextjs 12.2](https://www.youtube.com/watch?v=j7rPSS9Ovsw))

### Dev
**Ajout du fichier .babelrc** ( [Source](https://github.com/vercel/next.js/discussions/30468#discussioncomment-1550409) )<br>
principalement pour le docker avec le container alpine. De cette façon le next compile.


## Sources et inspirations

### Exemple :
- [Microsite de l'ontologie d'artsdata](https://culturecreates.github.io/artsdata-data-model/)
- [Wikiprojet d'arsdata](https://www.wikidata.org/wiki/Wikidata:WikiProject_Performing_arts/Data_structure)
- [Metamusic](https://metamusic.ca/toolkit#20017-track-title), Visuelement beau et structure de l'information


### The folder structure of the project is greatly inspired by this article
https://medium.com/@pablo.delvalle.cr/an-opinionated-basic-next-js-files-and-directories-structure-88fefa2aa759

---
## Collaboration et support


### Soulevé des bogues
Bien suivre les directives dans les issues de github.

## Chartes décisionnelles avant de demander de l'aide

### TLTR
1. Une question, un bogue, une nouvelle notion ou une inquiétude survient ~ déclencheur
2. Documenter le problème dans vos notes
3. Vérifie dans la documentation interne ou de l'outil ciblé par la situation  ~ max 15 minutes
4. Recherche sur le web (Stack overflow, github, github gist, autre) ~ max 20 minutes
5. Essaye au moins de régler le problème avec des hypothèses ~ maximum 20 minutes
6. Demander à un collègue et collaborer pour trouver une solution ~ maximum 20 minutes
7. Contacter un expert ou une rencontre pour trouver une solution en équipe.

### Microdétails

### Déclencheurs
1. Je rencontre un bogue
2. J'ai de la difficulté à reproduire un bogue
3. Je commence une tâche, sans maîtriser ou connaître les toutes les notions nécessaires pour y arriver.
4. J'ai de la difficulté à élaborer un algorithme et/ou à établir la logique et la suite des choses à faire.

#### Documenter le problème
1. Le plus possible
    1. Étapes pour reproduire,
    2. Scope (url, fichiers, projet)
    3. Observations
    4. Thread stack overflow, issues github, pull request, article de blogue, etc.

### Suite des événements et possibilités
1. J'isole mon contexte et mon environnement afin d'être en mesure de bien décrire et d'énoncer le problème.
    1. À quel endroit je rencontre le problème
    2. Quelles sont les étapes à reproduire avant de rencontrer le problème
        1. Soyez précis : URL, context (navigateur, application, etc.)
3. Quels éléments décrivent le mieux le problème à cet endroit.
    4. Qu'est-ce qu'on devrait observer pour que le problème soit résolu.
2. Est-ce que je suis en mesure d'imaginer une source pour le problème ?
    1. Sinon, demande de l'aide avec ce que tu as au point #1.
3. Quels autres test ou hypothèse je pourrais faire pour identifier le problème ?
    1. Est-ce qu'il y a une suite d'action qui permet d'accomplir la tâche sans que le problème survienne ?
    2. Dans mon environnement local, à quelles classes, librairie ou autre je pourrais associer le problème ?
4. Identifier, si cette hypothèse n'est pas testable ou semble trop abstraite
5. Trouver les mots clés et rechercher sur le web : / stack overflow / Github / Github Gist / Autres.
6. Tester au moins une solution trouvée grâce à votre recherche sur le web
7. Noter et ajouter les résultats de votre recherche à votre énonciation du problème.
8. Modifier l'énoncé de votre problème selon votre recherche et vos observations.
9. Partager votre problème à un pair grâce à votre énoncé et les résultats de votre recherche

#### Source
1. https://www.forbes.com/sites/elanagross/2016/07/19/how-asking-for-help-the-right-way-advances-your-career/ **Be specific and strategic.**
2. Est-ce qu'on les présente en BPMN chart : https://www.lucidchart.com/pages/business-process-mapping
3. Chartes de base : https://karajlovett.com/asking-for-help-at-work-when-you-need-it/
    1. **Clearly define the problems.** When you ask for help at work, first state why you need help and any other factors that are preventing you from doing your job effectively. Having those identified and agreed upon at the beginning will help you to have a fruitful discussion with your team or manager.
    2.  **Develop possible solutions.** This extra step shows that you’re not trying to get out of work or are being lazy. It also makes it more likely that one of your solutions will be chosen by your team and manager. With that said, make sure you know which solution you prefer most.
    3.  **Avoid the blame game.** During your explanation of the problem, be sure not to blame others implicitly or explicitly. Instead, focus on the situation and the problems the situation is causing for you. How is this affecting your wellbeing? How is it impeding you from doing other parts of your job? How has it caused you rework and added time to your workday?
    4.  **Be Professional**
    5.  **Be Polite**
    6.  **Schedule a Conversation**
4. Dans le podcast : Freelance to founder : https://millo.co/podcasts/freelancetofounder?episode=productivity-secrets


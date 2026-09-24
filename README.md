# Portfolio de Mohamed Najib

Portfolio personnel statique construit en HTML, CSS et JavaScript.

## Aperçu

Le site présente :

- une page d'accueil avec carte profil
- une section bilan personnel
- la formation, les compétences, l'expérience et les projets
- les certifications et les loisirs
- un formulaire de contact relié à FormSubmit

## Structure du projet

- `index.html` : structure principale du site
- `stylesheets/style_best.css` : feuille de style principale actuellement utilisée
- `stylesheets/style_dark_dark.css` : ancien thème de base encore chargé avant la surcouche
- `javascript/custom.js` : interactions UI, préloader, menu mobile, formulaire de contact
- `images/` : visuels, logo, photo de profil
- `fichiers/` : CV, archives et documents téléchargeables

## Lancer le projet en local

Le site est statique. Pour tester l’envoi du formulaire FormSubmit, ouvrez-le depuis un serveur local ou son URL publiée : l’envoi direct ne fonctionne pas depuis une adresse `file://`. Le bouton « Ouvrir ma messagerie » reste disponible pour préparer un email.

### Option 1 : Python

```bash
python -m http.server 8000
```

Puis ouvrez :

```text
http://localhost:8000
```

### Option 2 : PHP

```bash
php -S localhost:8000
```

Puis ouvrez :

```text
http://localhost:8000
```

## Modifier le contenu

### Textes et sections

Modifiez directement `index.html`.

Les zones principales à mettre à jour sont :

- le hero
- le bilan personnel
- la formation
- les compétences
- l'expérience
- les projets
- les certifications
- les loisirs
- le bloc contact

### CV et documents

Les liens de téléchargement pointent vers les fichiers du dossier `fichiers/`.

Si vous remplacez un CV :

1. ajoutez le nouveau fichier dans `fichiers/`
2. mettez à jour le lien correspondant dans `index.html`

### Style

La majorité des personnalisations récentes se trouvent dans :

```text
stylesheets/style_best.css
```

## Formulaire de contact

Le site utilise **FormSubmit** pour l’envoi direct. Le bouton **Ouvrir ma messagerie** prépare aussi un email avec l’objet, le message, le nom et l’adresse saisis. Il utilise l’application de messagerie configurée sur l’appareil ; le visiteur doit y confirmer l’envoi.

Le formulaire envoie les messages vers :

```text
https://formsubmit.co/ajax/najibmohamednm01@gmail.com
```

### Important

Lors de la première soumission, FormSubmit enverra un email de confirmation au propriétaire de l'adresse cible. Il faut confirmer cette activation une seule fois pour que le formulaire fonctionne ensuite normalement.

### Activer la nouvelle adresse et vérifier l’envoi

1. Dans VS Code, utilisez **Open with Live Server**, ou lancez `python -m http.server 8000` puis ouvrez `http://localhost:8000`.
2. Remplissez le formulaire et envoyez un message de test.
3. Ouvrez la boîte **najibmohamednm01@gmail.com**, recherchez l’email de **FormSubmit** dans la réception et les spams, puis cliquez sur son lien d’activation.
4. Faites un nouvel envoi depuis la même adresse du site et vérifiez sa réception.

Un changement d’adresse destinataire exige une nouvelle activation. La confirmation du service dans le navigateur ne prouve pas la livraison dans la boîte de réception. En cas d’échec, le texte saisi reste disponible et le statut affiche le détail renvoyé par le service quand il est fourni.

Si le formulaire reste en erreur, utilisez **Ouvrir ma messagerie** ou le lien email, puis indiquez l’URL du site et le texte affiché dans le statut pour poursuivre le diagnostic.

### Changer l'adresse de réception

Dans `index.html`, remplacez l'URL du formulaire :

```html
<form action="https://formsubmit.co/ajax/votre-email@example.com" method="post">
```

Pensez aussi à mettre à jour :

- les liens `mailto:`
- le texte d'aide du bloc contact
- les cartes de contact cliquables
- le lien du bouton `contact-email-fallback`
- l’activation FormSubmit pour la nouvelle adresse

### Référence officielle

- FormSubmit documentation : https://formsubmit.co/documentation
- FormSubmit AJAX documentation : https://formsubmit.co/ajax-documentation
- FormSubmit FAQ (activation et tests locaux) : https://formsubmit.co/help

## Accessibilité

Le projet inclut maintenant :

- un lien d'évitement `Aller au contenu`
- un vrai bouton de menu mobile
- un vrai bouton de retour en haut
- des styles `focus-visible`
- des labels explicites dans le formulaire
- une zone de statut accessible pour le retour du formulaire

## Déploiement

Le site peut être déployé sur n'importe quel hébergement statique :

- GitHub Pages
- Netlify
- Vercel
- hébergement mutualisé classique

### Déploiement GitHub Pages

1. poussez le dépôt sur GitHub
2. ouvrez `Settings > Pages`
3. choisissez la branche à publier
4. publiez la racine du projet

## Conseils de maintenance

- gardez `style_best.css` comme source principale des ajustements visuels
- évitez de réintroduire plusieurs systèmes de contact en parallèle
- supprimez les assets de test locaux avant les commits
- gardez `index.html` comme source unique du contenu éditorial

## Nettoyage Git

Un `.gitignore` racine a été ajouté pour éviter de versionner :

- les profils navigateur locaux
- les fichiers temporaires
- les artefacts LaTeX générés
- les fichiers de config locaux inutiles au site

## Prochaine étape conseillée

Faire un dernier passage de contenu pour :

- harmoniser totalement la langue de l'interface
- nommer clairement les deux boutons CV
- optimiser les images les plus lourdes

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

Le site est statique. Vous pouvez l'ouvrir directement dans le navigateur, mais pour tester plus proprement les ancres, les assets et le formulaire AJAX, il est préférable d'utiliser un petit serveur local.

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

Le site utilise maintenant **FormSubmit** comme système de contact unique.

Le formulaire envoie les messages vers :

```text
https://formsubmit.co/ajax/najibsimons01@gmail.com
```

### Important

Lors de la première soumission, FormSubmit enverra un email de confirmation au propriétaire de l'adresse cible. Il faut confirmer cette activation une seule fois pour que le formulaire fonctionne ensuite normalement.

### Changer l'adresse de réception

Dans `index.html`, remplacez l'URL du formulaire :

```html
<form action="https://formsubmit.co/ajax/votre-email@example.com" method="post">
```

Pensez aussi à mettre à jour :

- les liens `mailto:`
- le texte d'aide du bloc contact
- les cartes de contact cliquables

### Référence officielle

- FormSubmit documentation : https://formsubmit.co/documentation
- FormSubmit AJAX documentation : https://formsubmit.co/ajax-documentation

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

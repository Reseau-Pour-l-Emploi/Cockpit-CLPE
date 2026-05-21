# 🏛️ Observatoire des Comités Locaux Pour l'Emploi

> **Aucune installation requise.** Un seul fichier `index.html` + les CSV dans `data/`.

---

## 🚀 Déploiement sur GitHub Pages (3 étapes)

1. **Créez un dépôt GitHub** (ex. `clpe-dashboard`)
2. **Poussez tous les fichiers** tels quels :
   ```
   index.html
   data/
     barometre.csv
     frequentation_rpe.csv
     fiches_actions.csv
   ```
3. **Activez GitHub Pages** :  
   `Settings → Pages → Source : Deploy from branch → main → / (root)`

Votre site sera disponible à :  
`https://VOTRE-ORG.github.io/clpe-dashboard/`

---

## 🔐 Accès

**Mot de passe :** `Gouv_CLPE`  
*(modifiable dans `index.html` : constante `PASSWORD`)*

---

## 📁 Mise à jour des données

Éditez simplement les fichiers CSV et poussez sur GitHub — le site se met à jour automatiquement.

### `data/barometre.csv`
Une ligne par (trimestre × CLPE × thème × question)

| Colonne | Description |
|---------|-------------|
| `trimestre` | Ex : `2024-T4` |
| `clpe_id` | Ex : `clpe-idf-01` |
| `theme_id` | `gov`, `ing`, `par` ou `num` |
| `theme_nom` | Libellé de la thématique |
| `question_id` | Ex : `gov_q1` |
| `question_texte` | Intitulé de la question |
| `score` | Score question (1–5) |
| `score_theme` | Moyenne du thème (calculée) |
| `score_global` | Score de maturité global |
| `repondants` | Nombre de répondants |

### `data/frequentation_rpe.csv`
Une ligne par (trimestre × CLPE)

| Colonne | Description |
|---------|-------------|
| `trimestre` | Ex : `2024-T4` |
| `clpe_id` | Ex : `clpe-idf-01` |
| `connexions` | Nombre de connexions |
| `utilisateurs` | Utilisateurs uniques |
| `sessions` | Sessions totales |
| `taux_retour` | Taux de retour (%) |

### `data/fiches_actions.csv`
Une ligne par (trimestre × CLPE)

| Colonne | Description |
|---------|-------------|
| `trimestre` | Ex : `2024-T4` |
| `clpe_id` | Ex : `clpe-idf-01` |
| `creees` | Fiches créées ce trimestre |
| `en_cours` | Stock de fiches en cours |
| `pct_actualisees` | Part actualisée < 3 mois (%) |
| `feuille_de_route` | 1 = présente, 0 = absente |
| `feuille_de_route_1an` | 1 = < 1 an, 0 = plus ancienne |
| `creees_faisabilite` | Score faisabilité — fiches créées (1–5) |
| `creees_impact` | Score impact — fiches créées (1–5) |
| `creees_completude` | Score complétude — fiches créées (1–5) |
| `creees_innovation` | Score innovation — fiches créées (1–5) |
| `en_cours_faisabilite` | Score faisabilité — fiches en cours (1–5) |
| `en_cours_impact` | Score impact — fiches en cours (1–5) |
| `en_cours_completude` | Score complétude — fiches en cours (1–5) |
| `en_cours_innovation` | Score innovation — fiches en cours (1–5) |

---

## ➕ Ajouter un nouveau CLPE

1. Dans `index.html`, ajoutez une entrée dans le tableau `CLPES` :
   ```js
   {id:"clpe-xxx-01", regionId:"xxx", nom:"CLPE Nom", departement:"Dept (00)", pos:[x,y]},
   ```
2. Ajoutez les lignes correspondantes dans les 3 fichiers CSV.

---

## 🛠️ Technologies (tout via CDN, zéro build)

- React 18 + ReactDOM
- Recharts 2.12
- PapaParse 5.4 (lecture CSV)
- Babel Standalone (JSX dans le navigateur)
- Google Fonts : DM Sans + Spectral

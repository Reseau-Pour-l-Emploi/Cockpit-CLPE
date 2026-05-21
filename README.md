# 🏛️ Observatoire des Comités Locaux Pour l'Emploi (CLPE)

Tableau de bord interactif pour suivre l'installation et la vitalité des Comités Locaux Pour l'Emploi.

---

## 🚀 Déploiement sur GitHub Pages

### Prérequis
- Node.js 18+
- npm ou yarn

### Installation

```bash
git clone https://github.com/VOTRE-ORG/clpe-dashboard.git
cd clpe-dashboard 
npm install
npm run dev         # développement local
npm run build       # production → dossier dist/
```

### Structure du projet

```
clpe-dashboard/
├── App.jsx                     # Application React principale
├── index.html                  # Point d'entrée HTML
├── package.json
├── vite.config.js
├── data/
│   ├── regions_clpe.json       # Référentiel régions & CLPE
│   ├── barometre.csv           # Résultats baromètre trimestriel
│   ├── frequentation_rpe.csv   # Statistiques RPE
│   └── fiches_actions.csv      # Fiches actions & qualité
└── README.md
```

---

## 🔐 Accès

**Mot de passe :** `Gouv_CLPE`

Pour modifier le mot de passe, éditez la constante `PASSWORD` dans `App.jsx`.

---

## 📁 Format des fichiers CSV

### `data/barometre.csv`

| Colonne | Type | Description |
|---------|------|-------------|
| `trimestre` | string | Ex : `2024-T4` |
| `clpe_id` | string | Identifiant du CLPE |
| `theme_id` | string | `gov`, `ing`, `par`, `num` |
| `theme_nom` | string | Libellé de la thématique |
| `question_id` | string | Identifiant de la question |
| `question_texte` | string | Texte de la question |
| `score` | float (1–5) | Score de la question |
| `score_theme` | float (1–5) | Moyenne du thème |
| `score_global` | float (1–5) | Score de maturité global |
| `repondants` | int | Nombre de répondants |

### `data/frequentation_rpe.csv`

| Colonne | Type | Description |
|---------|------|-------------|
| `trimestre` | string | Ex : `2024-T4` |
| `clpe_id` | string | Identifiant du CLPE |
| `connexions` | int | Nombre de connexions |
| `utilisateurs` | int | Utilisateurs uniques |
| `sessions` | int | Sessions totales |
| `taux_retour` | float | Taux de retour (%) |

### `data/fiches_actions.csv`

| Colonne | Type | Description |
|---------|------|-------------|
| `trimestre` | string | Ex : `2024-T4` |
| `clpe_id` | string | Identifiant du CLPE |
| `creees` | int | Fiches créées ce trimestre |
| `en_cours` | int | Stock de fiches en cours |
| `pct_actualisees` | float | Part actualisée dans les 3 mois (%) |
| `feuille_de_route` | 0/1 | Présence d'une feuille de route |
| `feuille_de_route_1an` | 0/1 | Feuille de route de moins d'1 an |
| `creees_faisabilite` | float (1–5) | Score faisabilité — fiches créées |
| `creees_impact` | float (1–5) | Score impact — fiches créées |
| `creees_completude` | float (1–5) | Score complétude — fiches créées |
| `creees_innovation` | float (1–5) | Score innovation — fiches créées |
| `en_cours_faisabilite` | float (1–5) | Score faisabilité — fiches en cours |
| `en_cours_impact` | float (1–5) | Score impact — fiches en cours |
| `en_cours_completude` | float (1–5) | Score complétude — fiches en cours |
| `en_cours_innovation` | float (1–5) | Score innovation — fiches en cours |

---

## 🔄 Mise à jour des données

Pour ajouter un nouveau trimestre :
1. Remplissez les 3 fichiers CSV avec les nouvelles lignes
2. Commitez et poussez sur GitHub
3. Le tableau de bord se met à jour automatiquement

Pour ajouter un nouveau CLPE :
1. Ajoutez une entrée dans `data/regions_clpe.json`
2. Ajoutez les lignes correspondantes dans les 3 CSV
3. Dans `App.jsx`, ajoutez le CLPE dans le tableau `CLPES` (avec sa position `pos` sur la carte SVG)

---

## 🗺️ Carte interactive

La carte de France utilise des chemins SVG approximatifs dans une vue `0 0 490 490`.
Pour une précision géographique supérieure, remplacez les `REGION_MAP` par un rendu D3.js + GeoJSON :

```bash
# Télécharger le GeoJSON des régions françaises
curl -o data/regions.geojson \
  https://raw.githubusercontent.com/gregoiredavid/france-geojson/master/regions.geojson
```

---

## 📊 Échelle de maturité

| Score | Niveau | Couleur |
|-------|--------|---------|
| ≥ 3.75 | Avancé | 🟢 Vert |
| 2.75 – 3.74 | Intermédiaire | 🟡 Jaune |
| 1.90 – 2.74 | En développement | 🟠 Orange |
| < 1.90 | Initial | 🔴 Rouge |

---

## 🛠️ Technologies

- **React 18** + Vite
- **Recharts** — visualisations
- **Google Fonts** — DM Sans + Spectral
- **SVG inline** — carte de France
- **CSV** — sources de données légères

---

*Ministère du Travail · Direction générale de l'emploi · v1.0*

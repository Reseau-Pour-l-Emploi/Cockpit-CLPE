# Cockpit de pilotage des CLPE

Site statique (GitHub Pages) de pilotage du Réseau pour l'emploi, à la maille des Comités locaux pour l'emploi (CLPE). Aucun build : tout est lu et calculé côté navigateur (une seule page HTML/CSS/JS, design France Travail).

Le cockpit rassemble 4 briques, partageant la même carte, les mêmes filtres territoriaux (région/département/CLPE) et la même sélection :

1. **Niveau de maturité** - démarche de progression et d'impact des CLPE (questionnaire Qualtrics).
2. **Fréquentation TDB RPE** - consultations mensuelles et sessions hebdomadaires du tableau de bord.
3. **Fiches action** - nombre de fiches, bénéficiaires impactés, qualité sur 4 critères, saisies par mois.
4. **Performance relative** - écarts et évolutions du TAE/TPE par rapport aux 10 territoires les plus proches socio-économiquement.

## Mettre à jour les réponses au questionnaire de maturité (fichier global unique)

Contrairement à un fonctionnement par export trimestriel séparé, **toutes les réponses (tous trimestres confondus) sont importées depuis un seul fichier**, `data/answers_global.xlsx`. Le trimestre de chaque réponse est déduit automatiquement de sa date d'enregistrement (colonne Qualtrics `RecordedDate`, ou `EndDate` à défaut) - pas d'un nom de fichier ni d'une déclaration séparée.

**Pour ajouter un nouveau trimestre :**

1. Dans Qualtrics, exporter **l'intégralité de l'historique des réponses** (tous trimestres, pas seulement le dernier) au format Excel, sans modifier le format des colonnes.
2. Remplacer `data/answers_global.xlsx` par ce nouvel export (même nom de fichier).
3. Commit + push.

Le nouveau trimestre apparaît automatiquement dans le sélecteur "Trimestre" (le plus récent est sélectionné par défaut) ; les trimestres précédents restent consultables via ce même sélecteur, sans rien déclarer nulle part. Aucune autre modification n'est nécessaire.

**Important :** les colonnes `RecordedDate` et/ou `EndDate` doivent être présentes et renseignées dans l'export (c'est le cas par défaut sur un export Qualtrics standard). Une réponse sans date exploitable n'est rattachée à aucun trimestre et n'apparaît donc dans aucune vue filtrée par trimestre.

Le sélecteur "Trimestre" ne s'applique qu'à la brique **Niveau de maturité** (c'est la seule alimentée par ce fichier). La brique Fiches action dispose de son propre sélecteur de trimestre, indépendant, basé sur `data/fiches_action.csv`.

## Structure

```
index.html                          application complète (HTML/CSS/JS, design France Travail)

data/answers_global.xlsx            réponses Qualtrics, tous trimestres confondus (voir ci-dessus)
data/referentiel_clpe.csv           référentiel complet région ; département ; CLPE (tous les CLPE existants)
data/clpe.geojson                   contours des CLPE
data/departement.geojson            contours des départements
data/region.geojson                 contours des régions

data/tdb_rpe_consultations.csv      fréquentation TDB RPE, cumul mensuel par CLPE
data/tdb_rpe_sessions_semaine.csv   fréquentation TDB RPE, sessions hebdomadaires par CLPE
data/population_clpe.csv            population par CLPE (pour le ratio "pour 1 000 habitants")

data/fiches_action.csv              fiches action par trimestre : nombre, bénéficiaires, 4 critères qualité
data/fiches_action_mensuel.csv      nombre de fiches action saisies, par mois (pour la courbe annuelle superposée)

data/clpe_tae_tpe.csv               performance relative : TAE/TPE, moyenne et écart aux 10 territoires les plus proches, évolution sur un an

assets/                             logos (France Travail, République française, pictogramme RPE)
fonts/                              police Marianne (woff2)
```

Dépendances CDN : SheetJS (lecture xlsx), Leaflet (carte), Turf.js (union de polygones pour la carte).

## Mettre à jour les autres briques (données fictives à remplacer par le flux réel)

Les 3 briques hors maturité utilisent aujourd'hui des données fictives, à remplacer par les flux réels dès qu'ils sont disponibles - en respectant le même format de colonnes (en-têtes identiques, séparateur `;`) :

| Brique | Fichier(s) | Granularité |
|---|---|---|
| Fréquentation TDB RPE | `tdb_rpe_consultations.csv`, `tdb_rpe_sessions_semaine.csv` | mois / semaine |
| Fiches action | `fiches_action.csv`, `fiches_action_mensuel.csv` | trimestre / mois |
| Performance relative | `clpe_tae_tpe.csv` | trimestre (photo à un instant donné) |

Ces fichiers sont indépendants du fichier Qualtrics : mettre à jour l'un ne nécessite pas de toucher aux autres.

## Fonctionnement de la carte et des filtres

- Une seule carte pour tout le cockpit : elle se reconfigure (indicateurs, niveau géographique disponible, comportement au clic) selon l'onglet actif.
- Filtres (région/département/CLPE) et carte pilotent le même état de sélection : cliquer un territoire sur la carte équivaut à le choisir dans les filtres, et inversement.
- 3 niveaux géographiques (région, département, CLPE) selon la brique ; un indicateur au choix colore la carte. Les couleurs sont réparties par quantiles (6 classes) recalculés sur les valeurs affichées ; le gris signale l'absence de donnée.
- Brique **Performance relative** : navigation particulière. Région/département ne servent qu'à zoomer/filtrer (aucune donnée affichée à ces mailles) ; sélectionner un CLPE recentre la carte sur la France entière avec ses 10 territoires les plus proches socio-économiquement en surbrillance.
- Le bouton Réinitialiser efface le territoire sélectionné (filtres et carte) et repasse la carte en vue CLPE, France entière.

## Rattachement carte (CLPE)

Les noms de CLPE (réponses Qualtrics, jeux de données des autres briques) sont rapprochés automatiquement des libellés du geojson CLPE (normalisation, expansion des codes département, recouvrement de mots, repli sur préfixe pour les identifiants type `CLPE67001`). Un CLPE non rattaché est listé sous la carte : ajouter alors une entrée dans `CONFIG.aliases` en tête du script de `index.html`. Les niveaux région et département sont rattachés directement (nom de région, code INSEE de département), sans ambiguïté.

## Détail des questions et modalités (brique Maturité)

La section "Détail des questions" respecte le périmètre filtré/sélectionné et propose deux ordres d'affichage (par partie / par thématique). Cliquer sur le numéro d'une question (Qn) ouvre une fenêtre récapitulant ses modalités de réponse et le score associé à chacune, reconstituées à partir des réponses effectivement reçues.

## Préconisations

Générées automatiquement par territoire sélectionné, à partir de seuils **relatifs au profil du territoire** (percentiles de ses propres 20 questions) plutôt que de seuils absolus : point fort (score > 50 % et dans le quart supérieur), axe de progression (score < 50 % et dans le quart inférieur), partage de points de vue (homogénéité des réponses < 40 %).

## Rapport PDF

Le bouton "Télécharger le rapport (PDF)", à droite du bandeau d'onglets, génère un rapport paysage d'une page par brique pour le territoire sélectionné (impression navigateur, `Ctrl/Cmd+P` puis "Enregistrer en PDF"). Chaque page reprend les visualisations affichées sous la carte ; la page Maturité liste les 20 questions sur 2 colonnes, chacune taguée point fort / axe de progression / partage de points de vue.

## Barème (CONFIG en tête de script)

- Q1 à Q10 : Fondamentaux, 8 points par question (80 max)
- Q11 à Q20 : Pratiques, 4 points par question (40 max)
- Q21 : auto-évaluation sur 4 niveaux, hors score
- 4 thématiques transversales, maxima recalculés automatiquement depuis les libellés des questions

## Test en local

```
python -m http.server
```
puis ouvrir http://localhost:8000 (l'ouverture directe du fichier bloque le chargement des données).

## Déploiement GitHub Pages

Settings > Pages > Deploy from branch > `main` / racine.

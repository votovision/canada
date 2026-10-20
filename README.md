# canada

Modèle de projection des élections fédérales canadiennes (Votovision).

## Organisation

| Dossier | Contenu |
|---|---|
| `src/` | Moteur commun : tendance nationale par processus gaussien en log-ratios isométriques, compositions, résumés de simulation. |
| `lib/` | Modèle fédéral : swing par transfert entre partis, cibles régionales tirées des ventilations de sondages, simulation des sièges. |
| `tools/` | Validation (trois transitions : 2015-2019, 2019-2021, 2021-2025) et projection courante (`project_now.mjs`). |
| `ingest/` | Entrées du modèle tirées du dépôt de données `votovision/data`. |
| `data/` | Entrées et sorties du modèle (JSON). |

## Utilisation

Le dépôt de données `votovision/data` est cloné à côté (`../data`).

```
npm install
npm run donnees      # ../data/csv -> data/*.json
npm run projection   # projection courante -> data/ca_projection.json, data/ca_dashboard.json
```

Les ventilations régionales des sondages fédéraux (Atlantique, Québec, Ontario, Manitoba-Saskatchewan, Alberta, Colombie-Britannique) sont transcrites des rapports des sondeurs dans le dépôt de données (`../data/sources/rapports/ca/`, un fichier par sondage, avec sa source) ; `npm run donnees` les exporte dans `data/ca_regional_polls.json`. La projection courante en tire ses cibles régionales, et les outils de validation, le biais régional des sondages aux élections passées.

## Licence

GNU GPL v3 (`LICENSE`).

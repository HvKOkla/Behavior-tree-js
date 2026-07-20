<img width="1920" height="826" alt="Capture d’écran (199)" src="https://github.com/user-attachments/assets/604148cb-236e-43cd-bc41-3742a2478f22" />
<img width="1920" height="828" alt="Capture d’écran (198)" src="https://github.com/user-attachments/assets/d68c58fa-7568-47b7-bf89-39f9920fa184" />
<img width="1920" height="837" alt="Capture d’écran (197)" src="https://github.com/user-attachments/assets/238392c9-8e33-44d6-a95e-6377f999f550" />
# 🧠 BehaviorTree.js

Moteur d'**Arbre de Comportement** (Behavior Tree) léger en JavaScript/TypeScript, exécutable via des fichiers **JSON** avec visualisation dynamique en temps réel.

---

## 🎨 Animation Démo & Structure

```mermaid
graph TD
    ROOT("🧠 Root Selector")
    SEQ1("➡️ Sequence : Tenter d'ouvrir la porte")
    COND1("❓ Condition : Vérifier Clé")
    ACT1("🎬 Action : Déverrouiller et Ouvrir")
    
    INV("🔄 Inverter : Porte Bloquée")
    SEQ2("➡️ Sequence : Action Secours")
    COND2("❓ Condition : Est-ce défonçable ?")
    ACT2("🎬 Action : Frapper à la porte")

    ROOT --> SEQ1
    ROOT --> INV
    SEQ1 --> COND1
    SEQ1 --> ACT1
    INV --> SEQ2
    SEQ2 --> COND2
    SEQ2 --> ACT2




# 1. Cloner le projet
git clone [https://github.com/votre-compte/BehaviorTree.git](https://github.com/votre-compte/BehaviorTree.git)
cd BehaviorTree

# 2. Lancer le serveur local
node server.mjs
Ouvre http://localhost:3000 dans ton navigateur pour voir la démo animée.

Exemple:
import { BehaviorTree, NodeRegistry, Blackboard } from './BehaviorTree.js';

const registry = new NodeRegistry();
registry.registerAction('hasKey', async (ctx) => ctx.get('hasKey') ? 'SUCCESS' : 'FAIL');
registry.registerAction('openDoor', async () => 'SUCCESS');

const response = await fetch('./test.json');
const treeJSON = await response.json();

const tree = BehaviorTree.fromJSON(treeJSON, registry);
const blackboard = new Blackboard();
blackboard.set('hasKey', true);

await tree.update(blackboard);
```


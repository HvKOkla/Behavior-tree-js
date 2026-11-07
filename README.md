
# BehaviorTree.js

A lightweight **Behavior Tree** engine for JavaScript/TypeScript, driven by JSON, with **real-time visualization**.

Define complex AI behaviors in a simple JSON file — no recompilation needed.


## Features

- Modular nodes: `Selector`, `Sequence`, `Action`, `Condition`, `Inverter`
- JSON-driven tree configuration
- `Blackboard` for shared context
- `NodeRegistry` to map JSON actions to JS callbacks
- Real-time visualization (`IDLE` → `RUNNING` → `SUCCESS`/`FAIL`)
- CodeQL & DevSkim security workflows

---

## 🚀 Quick Start

```bash
git clone https://github.com/HvKOkla/Behavior-tree-js.git
cd Behavior-tree-js
npm install
node server.mjs   # open http://localhost:3000
```

Run the CLI test:

```bash
npm test
```

---

## 🧠 Example

**`test.json`**

```json
{
  "name": "Root",
  "type": "Selector",
  "children": [
    {
      "type": "Sequence",
      "children": [
        { "type": "Condition", "actionName": "hasKey" },
        { "type": "Action", "actionName": "openDoor" }
      ]
    },
    { "type": "Action", "actionName": "knockDoor" }
  ]
}
```

**`main.js`**

```javascript
import { BehaviorTree, NodeRegistry, Blackboard } from './BehaviorTree.js';

const registry = new NodeRegistry();
registry.registerAction('hasKey', (ctx) => ctx.get('hasKey') ? 'SUCCESS' : 'FAIL');
registry.registerAction('openDoor', () => 'SUCCESS');
registry.registerAction('knockDoor', () => 'SUCCESS');

const tree = BehaviorTree.fromJSON(await (await fetch('./test.json')).json(), registry);
const blackboard = new Blackboard();
blackboard.set('hasKey', true);

console.log(await tree.update(blackboard)); // "SUCCESS"
```

---

## 📦 API

| Class | Description |
|-------|-------------|
| `Blackboard` | Shared key-value store |
| `Selector` | Runs children until `SUCCESS` or `RUNNING` |
| `Sequence` | Runs children until `FAIL` or `RUNNING` |
| `Action` | Executes a registered callback |
| `Condition` | Returns `SUCCESS` or `FAIL` |
| `Inverter` | Inverts child result |
| `NodeRegistry` | Maps names to callbacks |
| `BehaviorTree` | Root node + `update(context)` |

**Status values:** `SUCCESS`, `FAIL`, `RUNNING`

---

## 🔒 Security

Scanned with **CodeQL** and **DevSkim** via GitHub Actions. See [`SECURITY.md`](./SECURITY.md).


## License

MIT — see [`LICENSE`](./LICENSE).

---

Built with ❤️ by [HvKOkla](https://github.com/HvKOkla).
```


C'est **deux fois plus court** que la version précédente, mais garde l'essentiel : features, quick start, exemple, API, sécurité, roadmap, licence. Tu veux encore plus court ?

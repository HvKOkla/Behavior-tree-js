import { BehaviorTree, NodeRegistry, Blackboard } from './BehaviorTree.js';

const registry = new NodeRegistry();

registry.registerAction('hasKey', (ctx) => {
    const hasKey = ctx.get('hasKey');
    console.log(`[Condition] Check key... ${hasKey ? 'YES' : 'NO'}`);
    return hasKey ? 'SUCCESS' : 'FAIL';
});

registry.registerAction('openDoor', () => {
    console.log('[Action] The door is open!');
    return 'SUCCESS';
});

registry.registerAction('canBreakDoor', (ctx) => {
    const isStrong = ctx.get('isStrong');
    console.log(`[Condition] Can the door be broken?... ${isStrong ? 'YES' : 'NO'}`);
    return isStrong ? 'SUCCESS' : 'FAIL';
});

registry.registerAction('knockDoor', () => {
    console.log('[Action] Knock knock knock on the door!');
    return 'SUCCESS';
});

async function runTest() {
    try {
        const response = await fetch('./test.json');
        const treeJSON = await response.json();
        const tree = BehaviorTree.fromJSON(treeJSON, registry);
        const blackboard = new Blackboard();
        blackboard.set('hasKey', true);
        blackboard.set('isStrong', false);
        console.log("--- TEST START ---");
        const result = await tree.update(blackboard);
        console.log(`--- TEST END (Result: ${result}) ---`);
    } catch (error) {
        console.error("Error while loading or executing:", error);
    }
}

runTest();
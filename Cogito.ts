export type NodeStatus = 'SUCCESS' | 'FAIL' | 'RUNNING';

export interface BehaviorNode<T> {
    name: string;
    run(object: T): NodeStatus;
}

export class Selector<T> implements BehaviorNode<T> {
    public name: string;
    private children: BehaviorNode<T>[];

    constructor(name: string, children: BehaviorNode<T>[] = []) {
        this.name = name;
        this.children = children;
    }

    public run(object: T): NodeStatus {
        for (let i = 0; i < this.children.length; i++) {
            const status = this.children[i].run(object);
            if (status === 'SUCCESS' || status === 'RUNNING') {
                return status;
            }
        }
        return 'FAIL';
    }
}

export class Sequence<T> implements BehaviorNode<T> {
    public name: string;
    private children: BehaviorNode<T>[];

    constructor(name: string, children: BehaviorNode<T>[] = []) {
        this.name = name;
        this.children = children;
    }

    public run(object: T): NodeStatus {
        for (let i = 0; i < this.children.length; i++) {
            const status = this.children[i].run(object);
            if (status === 'FAIL' || status === 'RUNNING') {
                return status;
            }
        }
        return 'SUCCESS';
    }
}

export class Action<T> implements BehaviorNode<T> {
    public name: string;
    private callback: (object: T) => NodeStatus;

    constructor(name: string, callback: (object: T) => NodeStatus) {
        this.name = name;
        this.callback = callback;
    }

    public run(object: T): NodeStatus {
        return this.callback(object);
    }
}

export class BehaviorTree<T> {
    private root: BehaviorNode<T> | null;

    constructor(rootNode: BehaviorNode<T> | null = null) {
        this.root = rootNode;
    }

    public update(object: T): NodeStatus | undefined {
        if (this.root) {
            return this.root.run(object);
        }
    }
}

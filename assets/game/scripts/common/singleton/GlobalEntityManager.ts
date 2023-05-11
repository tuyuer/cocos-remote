const { ccclass, property } = cc._decorator;
/**
 * 全局实体管理器。
 */
@ccclass
export class GlobalEntityManager extends cc.Component {
    /** */
    private static _instance: GlobalEntityManager | null = null;

    protected static _getInstance<T extends typeof GlobalEntityManager>(componentClass: T): InstanceType<T> {
        if (!componentClass._instance || componentClass._instance.constructor !== componentClass) {
            if (componentClass === GlobalEntityManager) {
                const entity = new cc.Node("Global Entity");
                entity.parent = cc.director.getScene() as any;
                entity.addComponent(componentClass);
                cc.game.addPersistRootNode(entity);
            }
            else {
                componentClass._getInstance(GlobalEntityManager).node.addComponent(componentClass);
            }
        }

        return componentClass._instance! as InstanceType<T>;
    }

    protected onLoad() {
        const componentClass = this.constructor as typeof GlobalEntityManager;

        if (!componentClass._instance || componentClass._instance.constructor !== componentClass) {
            componentClass._instance = this;

            if (!cc.game.isPersistRootNode(this.node)) {
                cc.game.addPersistRootNode(this.node);
            }
        }
        else {
            console.warn("The singleton has been created.");
            Promise.resolve().then(() => {
                if (this.node.isValid) {
                    this.node.destroy();
                }
            });
        }
    }

    protected onDestroy() {
        const componentClass = this.constructor as typeof GlobalEntityManager;

        if (componentClass._instance === this) {
            componentClass._instance = null;
        }
    }
}

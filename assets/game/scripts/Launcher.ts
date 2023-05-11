import { TestFeatureClass } from "../../extension/testFeature/TestFeatureClass";
import { ExtensionLoader } from "./common/extLoader/ExtensionLoader";

const {ccclass, property} = cc._decorator;

@ccclass
export default class Launcher extends cc.Component {

    @property(cc.Label)
    label: cc.Label = null;

    @property
    text: string = 'hello';

    start () {
        // 小游戏分包处理
        // cc.assetManager.loadBundle("testFeature", (err, bundle) => {
        //     const clazz = ExtensionLoader.createClass("TestFeatureClass", this) as TestFeatureClass;
        //     clazz.dosomething();
        // });


        //IOS远程包处理
        console.log("Launcher start");
        cc.assetManager.loadBundle("http://localhost:8080/testFeature", (err, bundle) => {
            if(err){
                console.log(err);
            }
            else{
                console.log("bundle loaded");
                const clazz = ExtensionLoader.createClass("TestFeatureClass", this) as TestFeatureClass;
                clazz.dosomething();
            }
        });
    }
}

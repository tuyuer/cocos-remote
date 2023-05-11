import { ExtensionStorage } from "../../game/scripts/common/extLoader/ExtensionLoader";

export class TestFeatureClass {

    constructor(option?: any){
        console.log("hello TestFeatureClass", option);
    }

    public dosomething(): void {
        console.log("TestFeatureClass dosomething");
    }
}

ExtensionStorage["TestFeatureClass"] = TestFeatureClass;

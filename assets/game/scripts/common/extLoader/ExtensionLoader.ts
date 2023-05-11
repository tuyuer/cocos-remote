export let ExtensionStorage: any = {};

export class ExtensionClass {
    /**
     * 代理构建方法
     * @param className 动态类名称
     * @param option 动态类创建参数
     */
    constructor(className: string, option?:any) {
        //一个简单的异常判断，如果存储类中不存在此类 则抛出异常提醒
        if (ExtensionStorage[className] === undefined || ExtensionStorage[className] === null) {
            throw new Error(`未找到 className：${className} 对应实现`);
        }
        //从存放对象上找出对应class 创建即可
        return new ExtensionStorage[className](option); 
    }
}



//extension 加载器
export class ExtensionLoader {
    public static createClass(type: string, option?:any) {
        return new ExtensionClass(type, option);
    }
}
// 组合示例 2：使用解构、剩余参数、展开语法与默认参数处理配置对象
// 场景：从传入的选项中提取关键属性，并将剩余的不确定配置项透传合并到最终结果中
const buildComponentConfig = ({
    theme = 'light',
    size = 'medium',
    plugins = [],
    ...customOptions
} = {}) => {

    // 强制基础配置
    const baseConfig = {
        framework: 'vue3',
        version: '1.0.0'
    };

    // 组合最终配置，利用展开语法合并对象，并拼接字符串
    return {
        ...baseConfig,
        theme,
        size,
        activePlugins: plugins.length ? [...plugins, 'core-plugin'] : ['core-plugin'],
        // 将解构出的剩余自定义选项一并合并进来
        ...customOptions,
        className: `ui-component ui-${theme} ui-${size}`
    };
};

console.log(buildComponentConfig({ theme: 'dark', customFlag: true, debug: false }));
/* 
输出:
{
  framework: 'vue3',
  version: '1.0.0',
  theme: 'dark',
  size: 'medium',
  activePlugins: [ 'core-plugin' ],
  customFlag: true,
  debug: false,
  className: 'ui-component ui-dark ui-medium'
}
*/

import getComponentRootDom from "./getComponentRootDom";
import Icon from "@/components/Icon";
import styles from "./showMessage.module.less";

/**
 * 弹出消息
 * @param {object} options
 */
export default function (options = {}) {
    const content = options.content || "";
    const type = options.type || "info";
    const duration = options.duration || 2000;
    const container = options.container || document.body;
    // 创建消息元素
    const div = document.createElement("div");
    const iconDom = getComponentRootDom(Icon, {
        type,
    });
    div.innerHTML = `<span class="${styles.icon}">${iconDom.outerHTML}</span><div>${content}</div>`;
    // 设置样式
    const typeClassName = styles[`message-${type}`]; //类型样式名
    div.className = `${styles.message} ${typeClassName}`;
    // 将div加入到容器中

    // 容器的position是否改动过
    if (options.container) {
        if (getComputedStyle(container).position === "static") {
            container.style.position = "relative";
        }
    }

    container.appendChild(div);
    // 浏览器强行渲染
    div.clientHeight; // 导致reflow

    // 回归到正常位置
    div.style.opacity = 1;
    div.style.transform = `translate(-50%, -50%)`;

    // 等一段时间，消失
    setTimeout(() => {
        div.style.opacity = 0;
        div.style.transform = `translate(-50%, -50%) translateY(-25px)`;
        div.addEventListener(
            "transitionend",
            function () {
                div.remove();
                // 运行回调函数
                options.callback && options.callback();
            },
            {once: true}
        );
    }, duration);
}

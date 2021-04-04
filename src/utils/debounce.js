/**
 * 防抖函数，防止很短的一定时间内多次点击多次触发同事件
 * @param fn        需要被防抖的函数
 * @param duration  设定在多久的时间内
 * @returns {function(...[*]): void}
 */
export default function (fn, duration = 100) {
    let timer = null;
    return (...args) => {
        clearTimeout(timer);
        timer = setTimeout(() => {
            fn(...args);
        }, duration);
    };
}

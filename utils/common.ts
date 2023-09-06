export function imgToBase64(url: string, outputFormat: string) {
  return new Promise<string>((resolve) => {
    let canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();
    img.crossOrigin = 'Anonymous'; //解决Canvas.toDataURL 图片跨域问题
    img.onload = () => {
      const width = img.width;
      const height = img.height;

      // 压缩比例 -- 可以自己修改参数。500px宽度以下原尺寸，大于500px比例处理
      const bili = Math.round(width / 500) || 1;
      const rate = 1 / bili;
      canvas.width = width * rate;
      canvas.height = height * rate;
      if (ctx) {
        ctx.drawImage(img, 0, 0, width, height, 0, 0, width * rate, height * rate);
        const dataURL = canvas.toDataURL(outputFormat || 'image/jpeg');
        // 去除标头 -- 传递给后台时一般去除头部
        // let reg = new RegExp('^data:image/[^;]+;base64,');
        // dataURL = dataURL.replace(reg, '');
        // @ts-ignore
        canvas = null;
        resolve(dataURL);
      }
    };
    img.src = url;
  });
}

export function copyText(value: string) {
  // 创建元素用于复制
  const aux = document.createElement('input');
  // 设置元素内容
  aux.setAttribute('value', value);
  // 将元素插入页面进行调用
  document.body.appendChild(aux);
  // 复制内容
  aux.select();
  // 将内容复制到剪贴板
  document.execCommand('copy');
  // 删除创建元素
  document.body.removeChild(aux);
}

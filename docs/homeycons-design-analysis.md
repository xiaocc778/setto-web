# Homeycons 网页设计与前端实现拆解

参考站点：https://homeycons.com/

分析日期：2026-05-24  
用途：作为后续网站前端设计的参考文档，重点提炼 Homeycons 首页的视觉系统、交互逻辑、动效、技术栈、排版布局和图片元素。

## 1. 站点定位与整体气质

Homeycons 是建筑密封胶、PU 泡沫胶、胶粘剂类 B2B 外贸站。整体风格是典型工业品品牌官网：强品牌红、大面积白底、产品矩阵、工厂实力、证书背书、新闻内容和询盘表单。

设计关键词：

- 工业品可信感：产品图、工厂照片、证书、数据指标反复出现。
- 高饱和品牌红：用于顶部栏、Hero、按钮、优势区、页脚，形成强记忆点。
- B2B 转化导向：首页多处出现 `Contact Us`、`Get a Quote`、`View Products`、表单和悬浮联系方式。
- 轻营销动效：用轮播、淡入、滑入、悬浮按钮和 sticky 导航增强动态感，但不复杂。

## 2. 技术栈识别

从源码和资源路径判断，站点基于 WordPress 生态搭建：

| 类别 | 识别结果 | 依据 |
| --- | --- | --- |
| CMS | WordPress | `/wp-content/`、`/wp-includes/`、REST API、RSS、oEmbed |
| 主题 | Hello Elementor `3.3.0` | `hello-elementor/theme.min.css`、`hello-frontend.min.js` |
| 页面构建器 | Elementor `3.24.2` + Elementor Pro `3.14.0` | `elementor/assets/js/frontend.min.js`、`elementor-pro/assets/js/frontend.min.js` |
| 电商/产品目录 | WooCommerce `9.6.4` | WooCommerce block CSS、order attribution、产品分类链接 |
| SEO | Rank Math Pro | 页面头部 Rank Math SEO 注释、结构化数据 |
| 菜单 | JetMenu `2.4.0` | Mega menu、hover 子菜单、Vue 2.6.11 依赖 |
| 动效/组件 | Elementskit Lite、JetElements、Premium Addons | 计数/圆形动画、组件初始化、Elementor 小组件 |
| 轮播 | Elementor Swiper | `swiperClass: "swiper"`、轮播可访问性文案 |
| 图片懒加载 | Elementor lazy background + WordPress 图片策略 | `IntersectionObserver` 给 `.e-lazyloaded` 加类 |
| 表单 | Elementor Pro Form | 首页与弹窗表单字段、AJAX 配置 |
| 图标 | Font Awesome + Elementor 图标库 | 顶部社交、下拉箭头、表单/联系方式图标 |
| 字体 | Google Fonts | Open Sans、Playfair Display、Inter、Poppins |

后续自研前端不建议照搬 WordPress 插件体系。建议用静态/组件化实现：

- HTML/CSS/JS 或现有项目结构继续维护。
- 轮播可用 Swiper，也可手写轻量 slider。
- 入场动效用 IntersectionObserver + CSS transition。
- 图片懒加载用 `loading="lazy"` + 关键背景图预加载。
- 表单逻辑独立封装，保留必填校验、提交状态、错误提示。

## 3. 页面信息架构

首页从上到下结构非常清晰：

1. 顶部联系条：邮箱、电话、社交媒体。
2. 主导航：Logo、一级菜单、产品/解决方案下拉菜单、语言切换、搜索、Contact Us 按钮。
3. Hero 轮播：红色品牌主视觉，产品罐体 + 工人形象 + 标语。
4. Hot Products：12 个产品卡片矩阵。
5. 深色 CTA 横幅：工厂/管线背景图 + 文案 + 双按钮。
6. 数据指标：国家、分销中心、供应商、工厂面积。
7. HOMEY Advantages：红底优势区，4 个白色数据卡片。
8. About/Who We Are：工厂图片 + 公司介绍 + 产品能力清单。
9. Certificate：证书轮播。
10. News & Blog：4 个资讯卡片。
11. Get In Touch：联系方式 + 表单。
12. Footer：品牌说明、快捷链接、分类、联系方式、二维码、版权。
13. 右侧悬浮按钮：快速联系/WhatsApp/返回顶部一类动作。

## 4. 布局与栅格

桌面端布局特征：

- 页面最大内容宽度约为 `1200px`，多数模块居中。
- 主要内容采用 4 栏栅格：产品卡片、博客卡片、证书展示都倾向 4 等分。
- Hero 为全宽横幅，内容本身是整张设计图或接近整张图的组合视觉。
- CTA、优势、页脚使用全宽色块，增强页面节奏。
- About 区使用左右两栏：左侧图像，右侧标题、正文、列表。
- 表单区使用两栏：左联系方式，右表单卡片。

移动端建议：

- 顶部联系条可以隐藏或压缩为单行。
- 导航改汉堡菜单。
- 产品卡片从 4 列变 2 列，再到 1 列。
- About、Get In Touch 改为上下堆叠。
- Hero 文案字号和图片裁切需要单独优化，避免直接缩放整张横幅导致字太小。

## 5. 视觉系统

### 5.1 色彩

核心色彩：

- 品牌红：`#e30613` / 接近纯红，用于主按钮、页脚、优势区、Hero。
- 深红：用于 Hero 渐变、页脚底部、边框强调。
- 白色：大面积背景和卡片背景。
- 深蓝黑：标题/正文强调，接近 `#0b1830`。
- 浅灰：页面背景和卡片边框，约 `#f7f7f7`、`#e5e5e5`。

色彩使用规律：

- 红色承担品牌识别和行动召唤。
- 白底承载产品矩阵，降低工业品图片的视觉压力。
- 深色图片遮罩用于 CTA 区，使白色文字可读。
- 卡片阴影非常克制，更多依赖边框和留白。

### 5.2 字体与排版

源码加载字体包括 Open Sans、Poppins、Inter、Playfair Display。视觉上主要是粗重圆润的无衬线标题，接近 Poppins/Inter 的风格。

排版规律：

- 主标题：黑色或白色，粗体，居中，字号约 `32px-40px`。
- 小标签：红色、全大写、字距略大，如 `WHO WE ARE`、`COLLABORATE FROM NOW ON`。
- 正文：灰色，小字号，行高较紧，偏 B2B 说明文。
- 产品卡片标题：小字号、居中、两行内完成。
- CTA 按钮：全大写、小字号、粗体、固定宽度。

建议后续实现：

```css
:root {
  --brand-red: #e30613;
  --brand-dark: #0b1830;
  --text-muted: #6f7480;
  --surface: #ffffff;
  --soft-bg: #f7f7f7;
  --line: #e5e5e5;
}
```

## 6. 图片与素材策略

参考站图片类型非常明确：

| 模块 | 图片类型 | 设计作用 |
| --- | --- | --- |
| Hero | 产品包装 + 红色工业速度线 + 工人形象 | 传达品牌、品类和专业感 |
| 产品矩阵 | 透明底产品图 | 强化 SKU 丰富度 |
| CTA | 工厂/管线/车间暗色背景 | 制造工业场景和信任感 |
| About | 工厂生产线照片 | 证明生产能力 |
| Certificate | 证书扫描/照片 | 出口、认证、品质背书 |
| Blog | 行业图片、展会照片、施工场景 | 维持内容更新感 |
| Footer | Logo、二维码 | 联系转化 |

后续设计可借鉴的素材原则：

- 产品图尽量用白底或透明底，尺寸统一，保证矩阵整齐。
- 工厂图不宜过度艺术化，要能看清真实生产设备。
- 背景图用于 CTA 时加深色遮罩，文字用白色。
- 证书图保持真实边框和纸张质感，不要重新绘制成扁平插画。
- 新闻图要混合产品、团队、应用场景，避免全是产品罐体。

## 7. 交互逻辑

### 7.1 导航

- 顶部主导航为 sticky top，滚动时保持在顶部。
- Products 与 Solutions 有 hover 下拉/mega menu。
- 语言切换提供多语言入口：英文、阿语、法语、西语、越南语。
- 搜索图标点击后应打开搜索框或搜索弹层。
- Contact Us 是主 CTA，固定在导航右侧，红底白字。

实现建议：

- 桌面端：`mouseenter/focus-within` 打开下拉菜单，`mouseleave` 延迟关闭约 `300-500ms`。
- 移动端：汉堡菜单 + 分组折叠，避免超长二级菜单直接铺满。
- 保持键盘可访问：下拉菜单支持 `focus-within`。

### 7.2 Hero 轮播

- 左右箭头切换。
- 视觉上是整屏宽红色横幅，底部有进度/分隔样式。
- 轮播内容用于品牌口号、产品和人物形象。

实现建议：

- 自动播放间隔 `5000-7000ms`。
- 切换动效用 `transform: translateX` 或淡入。
- 鼠标悬浮暂停自动播放。
- 移动端建议使用单图静态或轻量滑动，优先保证文案可读。

### 7.3 产品卡片

- 产品卡片为可点击链接，进入产品详情。
- 卡片悬浮应有轻微上浮、边框变红或阴影增强。
- 产品图在卡片内垂直居中，标题置底居中。

实现建议：

```css
.product-card {
  border: 1px solid var(--line);
  background: #fff;
  transition: transform .25s ease, box-shadow .25s ease, border-color .25s ease;
}
.product-card:hover {
  transform: translateY(-4px);
  border-color: var(--brand-red);
  box-shadow: 0 14px 30px rgba(0,0,0,.08);
}
```

### 7.4 CTA 横幅

- 背景图片加暗色遮罩。
- 中心文案，下面两个按钮：一个深蓝按钮、一个红色按钮。
- 这是页面中段的转化节点。

实现建议：

- 背景使用 `background-size: cover`。
- 遮罩用伪元素，透明度约 `0.55-0.7`。
- 按钮 hover 反色或提升亮度。

### 7.5 数据指标与优势卡片

- 数据区为横向 4 列，数字红色加粗。
- Advantage 区为红底，内含 4 个白卡。
- 这些数字可做滚动进入视口后的 count-up 动画。

实现建议：

- IntersectionObserver 触发一次。
- 数字动画控制在 `800-1200ms`，不要无限重复。
- 对 `100,000㎡` 这类带单位的数据，数字和单位分开渲染。

### 7.6 About 视频/图片

截图中工厂图中央有播放按钮，源码也包含 YouTube 视频结构化数据。

实现建议：

- 工厂图上叠加圆形播放按钮。
- 点击打开视频弹窗或跳转视频页。
- 弹窗需要 ESC/遮罩关闭。

### 7.7 证书轮播

- 横向展示 4 张证书。
- 左右两侧有箭头，底部有分页点。
- 点击证书可打开 lightbox 放大查看。

实现建议：

- 桌面端每屏 4 张，平板 2 张，移动端 1 张。
- 使用 lightbox 时支持缩放、关闭、左右切换。

### 7.8 新闻卡片

- 4 栏卡片，图上文下。
- 标题红色，摘要灰色，`Read More` 红色链接。
- hover 可轻微上浮或图片放大。

### 7.9 表单

字段：

- Name，必填。
- Email，必填。
- Country。
- Company。
- Whatsapp/Phone，必填。
- Message，必填。
- Submit：`Send Message`。

交互建议：

- 即时校验必填和 email 格式。
- 提交按钮提供 loading 状态。
- 成功后显示简短成功提示。
- 手机端字段改为单列。

### 7.10 悬浮快捷联系

右侧中下位置有圆形红色悬浮按钮，常用于 WhatsApp、电话、在线联系、返回顶部。

实现建议：

- 固定定位：`right: 18px; bottom: 96px;`。
- 多个按钮垂直排列，间距 `10px`。
- hover 显示 tooltip。
- 移动端避免遮挡表单提交按钮，可下移或合并为一个浮动菜单。

## 8. 动效系统

源码识别到的动效配置：

- Elementor 入场动画：`fadeInUp`、`slideInDown`，常带 `200ms` delay。
- Jet parallax 配置：滚动视差，速度约 `50%`，主要在桌面和平板启用。
- Sticky header：导航 sticky top。
- Lazy background：IntersectionObserver 进入视口后加载背景。
- Swiper carousel：Hero、证书或其他滑块。
- Menu hover：JetMenu hover 打开子菜单，mouseleave delay `500ms`。

建议复刻为统一动效规范：

```css
[data-reveal] {
  opacity: 0;
  transform: translateY(24px);
  transition: opacity .6s ease, transform .6s ease;
}
[data-reveal].is-visible {
  opacity: 1;
  transform: translateY(0);
}
```

动效节奏：

- 页面首屏：Hero 静态优先，避免首屏过度加载。
- 内容模块：向上淡入 `0.6s`。
- 卡片 hover：`0.2-0.3s`。
- 轮播切换：`0.5-0.8s`。
- 菜单开合：`0.18-0.25s`。

## 9. 可复用组件清单

后续前端设计建议抽象这些组件：

- `TopBar`：邮箱、电话、社媒。
- `HeaderNav`：Logo、菜单、语言、搜索、CTA。
- `MegaMenu`：产品/解决方案二级分类。
- `HeroSlider`：品牌横幅轮播。
- `SectionHeading`：红色小标签 + 黑色主标题 + 可选副标题。
- `ProductGrid` / `ProductCard`：产品矩阵。
- `ImageCtaBand`：暗色图片背景 CTA。
- `StatStrip`：横向数据指标。
- `AdvantagePanel`：红底优势区。
- `AboutFactory`：工厂图 + 文案 + 清单。
- `CertificateCarousel`：证书轮播 + lightbox。
- `BlogGrid` / `BlogCard`：新闻卡片。
- `ContactSection`：联系方式 + 表单。
- `SiteFooter`：多列页脚。
- `FloatingContact`：右侧悬浮联系按钮。

## 10. 实现优先级

P0 必须实现：

- Sticky 导航和移动端菜单。
- Hero 主视觉。
- 产品矩阵。
- CTA 横幅。
- About 工厂实力。
- Contact 表单。
- Footer。

P1 建议实现：

- 产品/解决方案 mega menu。
- Hero 和证书轮播。
- 滚动进入淡入动效。
- 卡片 hover。
- 右侧悬浮联系按钮。

P2 可后续增强：

- 数字 count-up。
- 图片 lightbox。
- 视频弹窗。
- 搜索弹层。
- 多语言切换入口。

## 11. 后续设计借鉴方向

如果为 SETTO 或类似胶粘剂/建材品牌重做前端，可以借鉴 Homeycons 的结构，但视觉上建议做得更现代：

- 保留强品牌色和工业可信资产，但减少 WordPress 插件式的零散感。
- 产品卡片使用更统一的尺寸、留白和图片比例。
- Hero 不要只放整张横幅图，建议拆成真实 HTML 文案 + 产品/场景图片，移动端更可控。
- CTA 和优势区保持强转化，但按钮和字号更精致。
- 动效保持轻量，以“滚动显现、hover 反馈、轮播”为主，不做复杂装饰动画。
- 真实工厂、施工、产品图优先于抽象插画。

## 12. 参考截图

当前工作区已有参考截图，可用于后续比对：

- `tmp/homeycons-fullpage.png`
- `tmp/homeycons-long.png`
- `tmp/homeycons-full.png`


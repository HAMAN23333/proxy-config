# proxy-config

适用于 **Mihomo / Quantumult X / Shadowrocket** 的代理配置仓库，包含：

- 分流规则
- DNS 配置
- TUN 相关设置
- 地区策略组
- 常见服务分类策略

本仓库主要用于整理个人长期使用的代理配置，并尽量保持结构清晰、便于二次修改。

---

## 支持的客户端

- Mihomo
- Quantumult X
- Shadowrocket（实验性）

---

## 文件说明

Mihomo 主配置，包含：

- Rule 模式
- fake-ip DNS 方案
- 屏蔽应用内 HTTPDNS
- QUIC 屏蔽
- 地区策略组（HK / TW / JP / SG / US / Other）
- 服务分类策略组（AI / Google / Microsoft / Apple / Game / Cryptocurrency / Telegram / CDN）

Quantumult X 配置，包含：

- DNS / DoH
- 地区节点分组
- Apple / Google / Microsoft / Telegram / Game 等策略
- 远程规则集
- 部分重写与任务配置

---

## 设计思路
本仓库的配置重点是：
- 尽量减少无效复杂度
- 优先保证规则结构清晰
- 根据服务类别与地区拆分策略组
- 让常见国外服务、游戏、AI、DNS 行为更容易单独控制

---

## Mihomo 配置特点

1. DNS 使用 fake-ip  
适合大多数现代代理场景，便于规则匹配和流量接管。

2. 拒绝部分 HTTPDNS  
通过 `nameserver-policy` 对 `category-httpdns-cn` 返回拒绝结果，用于减少部分应用绕过代理规则的情况。

3. 屏蔽 QUIC  
通过拦截 UDP 443，避免部分流量绕过预期的 HTTPS/TLS 行为。

4. 按服务拆分策略组  
仓库默认提供以下常用服务分组：

- AI
- Google
- Microsoft
- Apple
- Telegram
- Game
- Cryptocurrency

5. 按地区自动归类  
默认按以下地区归类节点：

- 香港
- 台湾
- 日本
- 新加坡
- 美国
- 其他地区

---

## Quantumult X 配置特点

- 内置基础 DNS 配置
- 支持常用服务分类策略
- 结合远程规则集简化维护
- 保留一定扩展空间，方便继续添加 rewrite / task / parser

---

## 规则集建议

规则很多时，优先考虑使用更高效的规则类型，例如 `domain`
不建议在规则量很大时大量使用 `classical` 类型规则集，否则可能增加资源占用。

## OpenWrt 相关说明

如果在 OpenWrt / 旁路由环境中使用，建议优先检查这些设置：

- 关闭 IPv6 相关选项（按需）
- 关闭 DNS 重定向
- 关闭重绑定保护（按实际网络环境决定）

尤其是在非 OpenClash 的场景下，这些设置会直接影响代理接管与解析结果。

> 个人不推荐使用旁路由，原因可参考这篇文章 [关于“旁路由”的一些吐槽](https://github.com/Aethersailor/Custom_OpenClash_Rules/wiki/关于“旁路由”的一些吐槽)

---

## 参考

- [Loon Wiki](https://nsloon.app/docs/intro)
- [Surfboard Wiki](https://getsurfboard.com/zh-Hans/)
- [Stash Wiki](https://stash.wiki/)
- [MetaCubeX Wiki](https://wiki.metacubex.one/)

---

## 免责声明

本仓库仅用于配置研究、学习和个人网络环境管理，请根据当地法律法规及服务条款合理使用。

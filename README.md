# Clash-config

已包含 mixin 和 parsers 配置，可以直接使用

## [mixin](https://docs.cfw.lbyczf.com/contents/mixin.html)

已经配置好了 dns 和 tun 参数，分别实现减少dns污染和全局代理，不要用 redir-host 了，未来版本不会支持了

[原文](https://github.com/Dreamacro/clash/releases/tag/premium):
> since redir-host brings a lot of misunderstandings and problems (some of which are even hard to find). I decided to remove it. It is only used in the fake-ip-filter for a few domain name mappings. I know that it can be bypassed and "recovered" in fake-ip mode. If fake-ip-filter finds that it has been abused, I will delete the domain mapping mode completely.

关于为什么不在 dns 中添加 fallback 详见 https://github.com/Dreamacro/clash/issues/642#issuecomment-816448986

关于 fake-ip 导致一些即时通信无法正常使用的解决方式为 fake-ip-filter 里添加白名单 https://github.com/Dreamacro/clash/issues/1644#issuecomment-927270223

## [parsers](https://docs.cfw.lbyczf.com/contents/parser.html)

预处理机场的配置文件，因为机场的配置太垃圾无法忍受所以按照别人的模板写了配置 https://github.com/Fndroid/clash_for_windows_pkg/issues/2193#issue-987352146

实现了以下分流规则：
- Apple系
- Microsoft系
- Google系
- 巴哈姆特
- 常用境外游戏平台
- 下载(包含了种子和游戏下载的规则，谨慎使用 BitTorrent 防止侵权问题导致代理服务器被 ban)
- Telegram
- 境内网站

为避免一大坨规则扔进去导致性能浪费，用了 [rule-provider](https://lancellc.gitbook.io/clash/clash-config-file/rule-provider)，跟据 [Stash](https://stash.wiki/faq/effective-stash#%E4%BD%BF%E7%94%A8%E8%A7%84%E5%88%99%E9%9B%86%E5%90%88) 手册得知，只要正确配置，即使超过几十万条规则依然不会产生大的开销，还方便维护

```yaml
rule-providers:
  proxy-domain:
    behavior: domain # 使用 domain 类规则集，可以使匹配更高效
    url: https://cdn.jsdelivr.net/gh/Loyalsoldier/clash-rules@release/proxy.txt
    interval: 86400
 
  cn-cidr:
    behavior: ipcidr # 使用 ipcidr 类规则集，可以使匹配更高效
    url: https://cdn.jsdelivr.net/gh/Loyalsoldier/clash-rules@release/cncidr.txt
    interval: 86400
 
rules:
  - RULE-SET,proxy-domain,Proxy
  - RULE-SET,cn-cidr,DIRECT
```

> domain 和 ipcidr 两种类型的规则集合专门针对大量数据进行了优化，在规则条目较多时建议优先选择。
>
> 不建议使用内含大量规则的 classical 规则集合，会显著提高 Stash 内存占用。

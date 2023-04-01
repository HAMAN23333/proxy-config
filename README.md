# Clash-config

已包含mixin和parsers配置，可以直接使用

## [mixin](https://docs.cfw.lbyczf.com/contents/mixin.html)

已经配置好了dns和tun参数，分别实现减少dns污染和全局代理，不要用redir-host了，未来版本不会支持了

## [parsers](https://docs.cfw.lbyczf.com/contents/parser.html)

预处理机场的配置文件，因为机场的配置太垃圾无法忍受所以按照[别人的模板写了配置

避免一大坨规则扔进去导致性能浪费，用了[rule-provider](https://stash.wiki/rules/rule-set)，和[Stash](https://stash.wiki/faq/effective-stash#%E4%BD%BF%E7%94%A8%E8%A7%84%E5%88%99%E9%9B%86%E5%90%88)作者沟通得知，只要正确配置，即使超过几万条规则依然不会产生太大的开销

实现了以下分流规则：
- Apple系
- Microsoft系
- Google系
- 巴哈姆特
- 常用境外游戏平台
- 下载(包含了种子和游戏下载的规则，谨慎使用BitTorrent防止侵权问题导致代理服务器被ban)
- Telegram
- 境内网站

# WIKI

- https://docs.cfw.lbyczf.com/contents/mixin.html
- https://lancellc.gitbook.io/clash/
- https://dreamacro.github.io/clash/zh_CN/
- https://stash.wiki/
- https://wiki.metacubex.one/

# Clash Premium

已包含 mixin 和 parsers 配置，可以直接使用

## mixin

已经配置好了 dns 和 tun 参数，分别实现减少dns污染和全局代理，Clash Premium 不要用 redir-host 了，未来版本不会支持了

> since redir-host brings a lot of misunderstandings and problems (some of which are even hard to find). I decided to remove it. It is only used in the fake-ip-filter for a few domain name mappings. I know that it can be bypassed and "recovered" in fake-ip mode. If fake-ip-filter finds that it has been abused, I will delete the domain mapping mode completely.

关于为什么不在 dns 中添加 fallback 详见 https://github.com/Dreamacro/clash/issues/642#issuecomment-816448986

关于 fake-ip 导致一些即时通信无法正常使用的解决方法 https://github.com/Dreamacro/clash/issues/1644#issuecomment-927270223

WSA 间歇性断连的解决方法 https://github.com/zzzgydi/clash-verge/issues/846#issuecomment-1784000198

## parsers

预处理机场的配置文件，因为机场的配置太垃圾无法忍受所以按照别人的模板写了配置 https://github.com/Fndroid/clash_for_windows_pkg/issues/2193#issue-987352146

实现了以下分流规则：
- 广告、劫持、隐私拦截
- Apple系
- Microsoft系
- Google系
- 巴哈姆特
- 常用境外游戏平台
- 下载(包含了种子的规则，谨慎使用 BitTorrent 防止侵权问题导致代理服务器被 ban)
- Telegram
- 境内网站

### [可嵌套规则组](https://dreamacro.github.io/clash/zh_CN/premium/script-shortcuts.html)

Clash Premium 2023.5.19（记不清了） 版本以上的内核支持了灵活的规则写法以实现逻辑判断等，有两种写法:

```yaml
rules:
  - if: network == 'tcp'
    name: TCP
    # engine: expr # the default engine is `expr`, `starlark` is also valid
    rules:
      - if: dst_port == 443
        name: HTTPS
        rules:
          - MATCH,DIRECT
      - DOMAIN-SUFFIX,baidu.com,DIRECT
  - DOMAIN-KEYWORD,google,DIRECT
  - DOMAIN-KEYWORD,www.bing.com,DIRECT
  - MATCH,REJECT
```

```yaml
mode: Rule

script:
  engine: expr # or starlark (10x to 20x slower)
  shortcuts:
    quic: network == 'udp' and dst_port == 443
    curl: resolve_process_name() == 'curl'
    # curl: resolve_process_path() == '/usr/bin/curl'

rules:
  - SCRIPT,quic,REJECT
```

可参考 https://lancellc.gitbook.io/clash/clash-config-file/script/script-shortcut

### 高效规则集合

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

# Quanmtumult X 和 Shadowrocket (实验性)

https://cdn.jsdelivr.net/gh/HAMAN23333/Proxy-Config@main/Config/QuantumultX/config.conf
https://cdn.jsdelivr.net/gh/HAMAN23333/Proxy-Config@main/Config/Shadowrocket/RuleSet.conf

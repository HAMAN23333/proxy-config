# Clash

已包含 mixin 和 parsers 配置，可以直接使用

WIKI教程如下:

- https://docs.cfw.lbyczf.com/contents/mixin.html
- https://lancellc.gitbook.io/clash/
- https://dreamacro.github.io/clash/zh_CN/
- https://stash.wiki/

## mixin

已经配置好了 dns 和 tun 参数，分别实现减少dns污染和全局代理，不要用 redir-host 了，未来版本不会支持了

> since redir-host brings a lot of misunderstandings and problems (some of which are even hard to find). I decided to remove it. It is only used in the fake-ip-filter for a few domain name mappings. I know that it can be bypassed and "recovered" in fake-ip mode. If fake-ip-filter finds that it has been abused, I will delete the domain mapping mode completely.

关于为什么不在 dns 中添加 fallback 详见 https://github.com/Dreamacro/clash/issues/642#issuecomment-816448986

关于 fake-ip 导致一些即时通信无法正常使用的解决方式为 fake-ip-filter 里添加白名单 https://github.com/Dreamacro/clash/issues/1644#issuecomment-927270223

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

为避免一大坨规则扔进去导致性能浪费，用了 Rule-Provider，即使超过几十万条规则依然不会产生大的开销。

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

### 禁用 QUIC 协议

HTTP3 / QUIC 协议基于 UDP，在目前的网络环境下较为低效，建议通过 [Script Shortcuts](https://github.com/HAMAN23333/Clash-config/edit/main/README.md#script-shortcuts-%E8%84%9A%E6%9C%AC%E6%8D%B7%E5%BE%84) 禁用。

```yaml
script:
  shortcuts:
    # 4483 与 9305 为 BiliBili 的 QUIC CDN
    quic: network == 'udp' and (dst_port == 443 or dst_port == 4483 or dst_port == 9305)
 
rules:
  - SCRIPT,quic,REJECT
```

# Quanmtumult X 和 Shadowrocket (实验性)

直接导入配置即可

# 其他

国内相关规则已自带 GEOIP 相关参数，可以不用调用 GEOIP 了

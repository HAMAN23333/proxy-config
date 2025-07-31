# WIKI

- https://stash.wiki/
- https://wiki.metacubex.one/

## 关于 redir-host

> since redir-host brings a lot of misunderstandings and problems (some of which are even hard to find). I decided to remove it. It is only used in the fake-ip-filter for a few domain name mappings. I know that it can be bypassed and "recovered" in fake-ip mode. If fake-ip-filter finds that it has been abused, I will delete the domain mapping mode completely.

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
https://cdn.jsdelivr.net/gh/HAMAN23333/Proxy-Config@main/Config/Shadowrocket.conf

# OPENWRT 设置细节

建议关闭所有与ipv6相关的选项，尤其是旁路由
关闭DNS重定向（尤其不是使用openclash的情况下），重绑定保护
